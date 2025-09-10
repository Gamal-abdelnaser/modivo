import { useCreateDashboardProductMutation, useDeleteDashboardProductsMutation, useDeleteMediaFileMutation, useGetDashboardProductsQuery, useUpdateDashboardProductsMutation, useUploadProductMediaMutation } from "@/app/services/products"
import { Alert, Box, Button, Field, FileUpload, Image, Input, NumberInput, Stack, Table, Text, Textarea, useDisclosure, useSelect } from "@chakra-ui/react"
import DashboardTableSkeleton from "./DashboardTableSkeleton";
import { CiRead } from "react-icons/ci"
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import AlertDaialog from "../Shared/AlertDialog";
import { useEffect, useRef, useState } from "react";
import AlertDialog from "../Shared/AlertDialog";
import CookieService from "@/services/CookieService";
import CustomModal from "@/Shared/Modal";
import { HiUpload } from "react-icons/hi"
import { useSelector } from "react-redux";
import { selectNetwork } from "@/app/features/network";
const DashboardProductTable = () => {
  // Create product modal controls
  const [createProduct, { isLoading: isCreating, isSuccess: isCreateSuccess }] = useCreateDashboardProductMutation();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: 0,
    stock: 0,
    rating: 0,
    discount: 0,
    description: [],
  });

  const [newThumbnail, setNewThumbnail] = useState(null);
  const [newImages, setNewImages] = useState([]);

  // handlers
  const onChangeNewHandler = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeNewPriceHandler = (e) => {
    const value = e.target.value;
    setNewProduct((prev) => ({ ...prev, price: Number(value) || 0 }));
  };

  const onChangeNewStockHandler = (e) => {
    const value = e.target.value;
    setNewProduct((prev) => ({ ...prev, stock: Number(value) || 0 }));
  };
  const onChangeNewDiscountHandler = (e) => {
    const value = e.target.value;
    setNewProduct((prev) => ({ ...prev, discount: Number(value) || 0 }));
  }

  const onChangeNewDescriptionHandler = (e) => {
    const text = e.target.value.split("\n").map((line) => ({ text: line }));
    setNewProduct((prev) => ({ ...prev, description: text }));
  };

  const onChangeNewThumbnailHandler = (e) => {
    setNewThumbnail(e.target.files[0]);
  };

  const onChangeNewImagesHandler = (e) => {
    setNewImages([...e.target.files]);
  };
  const onChangeNewRatingHandler = (e) => {
    const value = e.target.value;
    setNewProduct((prev) => ({ ...prev, rating: Number(value) || 0 }));
  }


  const onCreateHandler = async (e) => {
    e.preventDefault();

    try {
      await createProduct({
        data: newProduct,
        files: {
          thumbnail: newThumbnail,
          Images: newImages,
        },
      }).unwrap();

      console.log("✅ Product created successfully");

      // reset states
      setNewProduct({
        title: "",
        price: 0,
        stock: 0,
        rating: 0,
        discount: 0,
        description: [],
      });
      setNewThumbnail(null);
      setNewImages([]);

    } catch (err) {
      console.error("❌ Create failed:", err);
    }
    setIsCreateOpen(false)
  };

  // Get and update products
  const {isOnline} = useSelector(selectNetwork)
  const [open, setOpen] = useState(false)
  const {
    isLoading,
    data,
    error,
    refetch,
  } = useGetDashboardProductsQuery({ page: 1 });
  const [isOpen, setIsOpen] = useState(false);
  const [destroyProduct, {isLoading: isDestroying , isSuccess} ] = useDeleteDashboardProductsMutation()
  const [updateProduct, { isLoading: isUpdating, isSuccess: isUpdateSuccess }] = useUpdateDashboardProductsMutation()
  const [selectedProductDocumentId, setSelectedProductDocumentId] = useState(null);
  const [selectedProductDocumentId2, setSelectedProductDocumentId2] = useState(null);
  const [selectedProductId2, setSelectedProductId2] = useState(null);
  const [selectedProductToEdit, setSelectedProductToEdit] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [uploadProductMedia,{isLoading: isUploading}] = useUploadProductMediaMutation();
  const [deleteMediaFile] = useDeleteMediaFileMutation();
  useEffect(() => {
    // console.log("Fetched products:", data?.data);
  }, [data]);

  
  const resdAta = data?.data
  
  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setSelectedProductToEdit((prev) => ({ ...prev, [name]: value }))
  }
  const onChangePriceHandler = (e) => {
    const value = e.target.value;       // string
    setSelectedProductToEdit((prev) => ({
      ...prev,
      'price': Number(value) || 0,        // convert to number safely
    }));
  };
  const onChangeStockHandler = (e) => {
    const value = e.target.value;       // string
    setSelectedProductToEdit((prev) => ({
      ...prev,
      'stock': Number(value) || 0,        // convert to number safely
    }));
  };
  const onChangeDiscountHandler = (e) => {
    const value = e.target.value;
    setSelectedProductToEdit((prev) => ({
      ...prev,
      'discount': Number(value) || 0,
    }));
  };
  const onChangeDescriptionHandler = (e) => {
    const text = e.target.value.split("\n").map((line) => ({ text: line }));
    setSelectedProductToEdit((prev) => ({ ...prev, description: text }));
  };

  const onChangeThumbnailHandler = (e) => {
    console.log("Thumbnail changed:", e.target.files[0]);
    setThumbnail( e.target.files[0]);
  };
  const onSubmitHandler = async (e) => {
    // e.preventDefault();

    const documentIds = selectedProductDocumentId2; // documentId للـ update
    const id = selectedProductId2;                  // entry id للـ upload
    const updates = {
      title: selectedProductToEdit?.title || '',
      price: selectedProductToEdit?.price || 0,
      stock: selectedProductToEdit?.stock || 0,
      discount: selectedProductToEdit?.discount || 0,
    };

    try {
      let newFileId = null;

      // (1) لو المستخدم اختار صورة جديدة
      if (thumbnail) {
        const oldFileId = selectedProductToEdit?.thumbnail?.id;

        try {
          const uploaded = await uploadProductMedia({
            file: thumbnail,
            refId: id, // مهم: هنا ID العادي
            field: 'thumbnail',
            ref: 'api::product.product',
            fileInfo: {
              name: updates.title || 'thumbnail',
              alternativeText: updates.title || 'Product thumbnail',
              caption: updates.title || 'Product thumbnail',
            },
          }).unwrap();

          // خد id الصورة الجديدة
          newFileId = uploaded[0]?.id;
          console.log("✅ New file uploaded:", newFileId);

        } catch (err) {
          console.error('❌ Media upload failed:', err);
          throw err;
        }
        let fileId = oldFileId
        // (2) اختياري: امسح القديمة
        if (fileId) {
          try {
            await deleteMediaFile(fileId).unwrap();
          } catch (err) {
            console.warn('⚠️ Failed to delete old image file:', err);
          }
        }
      }

      // (3) Update باقي الداتا + thumbnail الجديد
      await updateProduct({
        documentId: documentIds,
        body: {
          data: {
            ...updates,
            // ...(newFileId ? { thumbnail: newFileId } : {}), // لو فيه صورة جديدة اربطها
            ...(newFileId ? { thumbnail: [newFileId] } : {})          },
        },
      }).unwrap();

      console.log(selectedProductToEdit)
    } catch (err) {
      console.error('❌ Update failed:', err);
    }

    setIsOpen(false);
    refetch();
  };


  if (isLoading || !isOnline) return <DashboardTableSkeleton />
  if (error) {
    // console.error("Error fetching products:", error);
    return <Text>Error loading products</Text>
  }

  return (
    <>
      <Button
        w={'80%'}
        mt={4}
        colorPalette="green"
        onClick={() => setIsCreateOpen(true)}
        alignItems={'center'}
        my={3}
      >
        + Create Product
      </Button>
      <Box mx={'auto'} overflowX="auto" minW={'400px'} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} >
        
        <Table.Root size="sm" bg={'none'} maxW={'95%'}  mx={'auto'}>
          <Table.Header bg={'none'} >
            <Table.Row border={'1px solid #fff'} >
              <Table.ColumnHeader p={2} px={4} border={'1px solid #fff'} textAlign={'start'} >ID</Table.ColumnHeader>
              <Table.ColumnHeader p={2} px={4} border={'1px solid #fff'} textAlign={'center'} >Title</Table.ColumnHeader>
              <Table.ColumnHeader p={2} px={4} border={'1px solid #fff'} textAlign={'center'} >Thumbnail</Table.ColumnHeader>
              <Table.ColumnHeader p={2} px={4} border={'1px solid #fff'} textAlign={'center'} >Price</Table.ColumnHeader>
              <Table.ColumnHeader p={2} px={4} border={'1px solid #fff'} textAlign={'center'} >Stock</Table.ColumnHeader>
              <Table.ColumnHeader p={2} px={4} border={'1px solid #fff'} textAlign={'center'} >Action</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body border={'1px solid #fff'}>
            {resdAta?.map((Product, index) => (
              <Table.Row  bg={'none'} key={index} border={'1px solid #fff'}>
                <Table.Cell p={3} px={4} border={'1px solid #fff'} textAlign={'start'}>{Product?.id}</Table.Cell>
                <Table.Cell p={3} px={4} border={'1px solid #fff'} textAlign={'center'}>{Product?.title}</Table.Cell>
                <Table.Cell p={3} px={4} border={'1px solid #fff'} textAlign={'center'}>
                  <Image
                    src={Product?.thumbnail?.url}
                    alt={Product?.thumbnail?.alternativeText || "Product Image"}
                    borderRadius="50%"
                    boxSize="50px"
                    mx="auto"
                    objectFit="cover"
                  />
                </Table.Cell>
                <Table.Cell p={2} border={'1px solid #fff'} textAlign={'center'}>{Product?.price}</Table.Cell>
                <Table.Cell p={2} textAlign="center" border={'1px solid #fff'}>{Product.stock}</Table.Cell>
                <Table.Cell p={2} textAlign="center" border={'1px solid #fff'} >
                  <Button size={'sm'} colorPalette={'purple'} m={1}><CiRead /></Button>
                  <Button size={'sm'} colorPalette={'blue'} m={1} 
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedProductToEdit(Product);
                      setSelectedProductId2(Product.id);
                      setSelectedProductDocumentId2(Product.documentId);
                    }}><MdOutlineModeEdit /></Button>
                  <Button size={'sm'} colorPalette='red'
                    m={1}
                    onClick={() => {
                      setSelectedProductDocumentId(Product.documentId);
                      setOpen(true);
                    }}
                  >
                    <RiDeleteBin5Line />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>



        <AlertDialog
          open={open}
          close={(open) => setOpen(!open)}
          title="Confirm Deletion"
          description="Are you sure you want to delete this product?"
          cancelText="Cancel"
          okText="Destroy"
          isLoading={isDestroying}
          
          onOkHandler={async () => {
            if (selectedProductDocumentId) {
              try {
                const res = await destroyProduct(selectedProductDocumentId).unwrap(); // ✅ Use selectedProductDocumentId
                refetch();
                setOpen(false);
              } catch (err) {
                console.error('Failed to delete:', err);
              }
            }
          }} />
      </Box>
      {/* {console.log(selectedProductToEdit?.description.map((i) => i.text))
      } */}
      <CustomModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Product Details"
        okTxt="Update"
        // cancelTxt="Cancel"
        onOkClick={onSubmitHandler}
        isLoading={isUpdating || isUploading}
      >
        {/* <p>Are you sure you want to delete this product?</p> */}
        <Stack gap="4" >
          <Field.Root>
            <Field.Label>Title</Field.Label>
            <Input p={2} placeholder="Product Title" 
              name="title"
              value={selectedProductToEdit?.title} 
              onChange={onChangeHandler} />
          </Field.Root>
          <Field.Root>
            <Field.Label>Description</Field.Label>
            <Textarea h={'fit-content'} p={2} placeholder="Product Description" 
              name="description"
              value={selectedProductToEdit?.description.map((i) => i.text).join("\n")} 
              onChange={onChangeDescriptionHandler} />
          </Field.Root>
          <Field.Root>
            <Field.Label>Price</Field.Label>
            <NumberInput.Root size={'sm'} w={'full'}
              name="price"
              onChange={(e) => {
                onChangePriceHandler(e);
              }}
              value={selectedProductToEdit?.price} step={1}
              // formatOptions={{
              //   style: "currency",
              //   currency: "EGP",
              //   currencyDisplay: "code",
              //   currencySign: "accounting",
              // }}
            >
              <NumberInput.Input p={2} />
            </NumberInput.Root>
          </Field.Root>
          <Field.Root>
            <Field.Label>Count in Stock</Field.Label>
            <NumberInput.Root size={'sm'} w={'full'}
              name="stock"
              onChange={(e) => {
                onChangeStockHandler(e);
              }}
              value={selectedProductToEdit?.stock} step={1} 
            >
              
              <NumberInput.Input p={2} />
            </NumberInput.Root>
          </Field.Root>
          <Field.Root>
            <Field.Label>discount</Field.Label>
            <NumberInput.Root size={'sm'} w={'full'}
              name="discount"
              onChange={(e) => {
                onChangeDiscountHandler(e);
              }}
              value={selectedProductToEdit?.discount} step={1} 
            >
              
              <NumberInput.Input p={2} />
            </NumberInput.Root>
          </Field.Root>
          <Field.Root>
            <Field.Label>Thumbnail</Field.Label>
            <FileUpload.Root  w={'full'} name="thumbnail" 
              onChange={onChangeThumbnailHandler}
              value={selectedProductToEdit?.thumbnail}
            >
              <FileUpload.HiddenInput />
              <FileUpload.Trigger asChild w={'full'}>
                <Button variant="outline" size="sm" p={4} >
                  <HiUpload /> Upload file
                </Button>
              </FileUpload.Trigger>
              <FileUpload.List />
            </FileUpload.Root>
          </Field.Root>
        </Stack>
      </CustomModal>


      {/* Create New Product */}
      <CustomModal
        isOpen={isCreateOpen}
        setIsOpen={setIsCreateOpen}
        title="Create New Product"
        okTxt="Create"
        onOkClick={onCreateHandler}
        isLoading={isCreating}
      >
        <Stack gap="4">
          <Field.Root>
            <Field.Label>Title</Field.Label>
            <Input
              p={2}
              placeholder="Product Title"
              name="title"
              value={newProduct.title}
              onChange={onChangeNewHandler}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Description</Field.Label>
            <Textarea
              h="fit-content"
              p={2}
              placeholder="Product Description"
              name="description"
              value={newProduct.description.map((i) => i.text).join("\n")}
              onChange={onChangeNewDescriptionHandler}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Price</Field.Label>
            <NumberInput.Root size="sm" w="full"
              name="price"
              onChange={onChangeNewPriceHandler}
              value={newProduct.price}
              step={1}
            >
              <NumberInput.Input p={2} />
            </NumberInput.Root>
          </Field.Root>
          <Field.Root>
            <Field.Label>Count in Stock</Field.Label>
            <NumberInput.Root size="sm" w="full"
              name="stock"
              onChange={onChangeNewStockHandler}
              value={newProduct.stock}
              step={1}
            >
              <NumberInput.Input p={2} />
            </NumberInput.Root>
          </Field.Root>
          <Field.Root>
            <Field.Label>Rating</Field.Label>
            <NumberInput.Root size="sm" w="full"
              name="rating"
              onChange={onChangeNewRatingHandler}
              value={newProduct.rating}
              step={1}
            >
              <NumberInput.Input p={2} />
            </NumberInput.Root>
          </Field.Root>
          <Field.Root>
            <Field.Label>discount</Field.Label>
            <NumberInput.Root size="sm" w="full"
              name="discount"
              onChange={onChangeNewDiscountHandler}
              value={newProduct.discount}
              step={1}
            >
              <NumberInput.Input p={2} />
            </NumberInput.Root>
          </Field.Root>
          <Field.Root>
            <Field.Label>Thumbnail</Field.Label>
            <FileUpload.Root w="full" name="thumbnail"
              onChange={onChangeNewThumbnailHandler}
            >
              <FileUpload.HiddenInput />
              <FileUpload.Trigger asChild w="full">
                <Button variant="outline" size="sm" p={4}>
                  <HiUpload /> Upload file
                </Button>
              </FileUpload.Trigger>
              <FileUpload.List />
            </FileUpload.Root>
          </Field.Root>
          <Field.Root>
            <Field.Label>Images</Field.Label>
            <FileUpload.Root w="full" name="images" maxFiles={5}
              onChange={onChangeNewImagesHandler}
            >
              <FileUpload.HiddenInput />
              <FileUpload.Trigger asChild w="full">
                <Button variant="outline" size="sm" p={4}>
                  <HiUpload /> Upload file
                </Button>
              </FileUpload.Trigger>
              <FileUpload.List />
            </FileUpload.Root>
          </Field.Root>
        </Stack>
      </CustomModal>

    </>
  )
}


export default DashboardProductTable;



