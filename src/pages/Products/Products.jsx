
import React from "react";
import { Grid, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import Skelaton from "@/components/ProductCardSkelaton";
import { Dooted } from "@/components/styledBoxes";


const Products = (page) => {

  const getProductList = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/products?populate=thumbnail&populate=categories&sort=createdAt:DESC`
    );
    return data; // Ensure API structure is correct
  };

  const { isLoading, data  } = useQuery({
    queryKey: ["products"],
    queryFn: getProductList
  });

  // if (isLoading) return <h3>Loading...</h3>;
  if (isLoading) return <div>
    <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6} margin={30}>
      {Array.from({ length: 20 }, (_, idx) => (
         <Skelaton key={idx}  />
        
        )
      )}
      
    </Grid>
  </div>;

  return (
    <>
      <Stack w={'full'}  alignContent={'center'} maxW={'1300px'}  position={'relative'}p={4} mt={10} >
        <Dooted />
      {/* <Stack maxW={'1300px'} mx={'auto'} px={4} py={6}> */}
        {/* <Grid  templateColumns="repeat(auto-fill, minmax(300px, 1fr))" justifyItems={'center'}  mx={'auto'} maxW={'1300px'}  gap={6} margin={30} > */}
          <div className=" box-container items-center   justify-items-center grid   w-full xl:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] grid-cols-[repeat(auto-fit,minmax(250px,1fr))]  gap-[20px] px-[50px] py-0 justify-center">    

          {data?.data?.map((product) => ( 
            <ProductCard key={product.id} product={product} />
          ))}
          </div>
        {/* </Grid> */}
      {/* </Stack> */}
     </Stack>
 </>
  );
};

export default Products;
// 