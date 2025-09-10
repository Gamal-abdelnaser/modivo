import CookieService from '@/services/CookieService';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApiSlice = createApi({
  reducerPath: 'api',
  tagTypes:['Products'],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    prepareHeaders: (headers) => {
      const token = CookieService.get('jwt');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    // ** GET
    getDashboardProducts: build.query({
      query: (arg) => {
        const { page } = arg;
        return { 
          url: `/api/products?populate=thumbnail&populate=Images&populate=description&populate=categories&pagination[page]=${page}&pagination[pageSize]=7&filters[publishedAt][$notNull]=true`, 
        };
      },
      providesTags: (result) =>
        result?.data
          ? [
            ...result.data.map(({ id }) => ({ type: 'Products', id })),
            { type: 'Products', id: 'LIST' },
          ]
          : [{ type: 'Products', id: 'LIST' }],
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
    }),
    

    createDashboardProduct: build.mutation({
      async queryFn({ data, files }, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          // 1) اعمل المنتج الأول (من غير صور)
          const createRes = await fetchWithBQ({
            url: "/api/products",
            method: "POST",
            body: JSON.stringify({ data }),
            headers: {
              Authorization: `Bearer ${CookieService.get("jwt")}`,
              "Content-Type": "application/json",
            },
          });

          if (createRes.error) return { error: createRes.error };

          const newProduct = createRes.data?.data;
          const newId = newProduct?.id;         // entry id
          const newDocumentId = newProduct?.documentId; // documentId

          // 2) لو فيه صور نرفعها
          if (files?.thumbnail) {
            const formData = new FormData();
            formData.append("files", files.thumbnail);
            formData.append("ref", "api::product.product");
            formData.append("refId", String(newId));
            formData.append("field", "thumbnail");

            await fetchWithBQ({
              url: "/api/upload",
              method: "POST",
              body: formData,
              headers: {
                Authorization: `Bearer ${CookieService.get("jwt")}`,
              },
            });
          }

          if (files?.Images && files.Images.length > 0) {
            for (let img of files.Images) {
              const formData = new FormData();
              formData.append("files", img);
              formData.append("ref", "api::product.product");
              formData.append("refId", String(newId));
              formData.append("field", "Images");

              await fetchWithBQ({
                url: "/api/upload",
                method: "POST",
                body: formData,
                headers: {
                  Authorization: `Bearer ${CookieService.get("jwt")}`,
                },
              });
            }
          }

          // 3) رجع المنتج النهائي
          return { data: { ...newProduct } };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Products"],
    }),


    // ================== CREATE PRODUCT ==================
    
    
    // createDashboardProduct: build.mutation({
    //   query: async ({ data, thumbnail, images }) => {
    //     try {
    //       // (1) create product first (without media)
    //       const createRes = await fetch(`/api/products`, {
    //         method: "POST",
    //         headers: {
    //           Authorization: `Bearer ${CookieService.get("jwt")}`,
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ data }),
    //       });

    //       const created = await createRes.json();
    //       if (!created?.data) throw new Error("❌ Failed to create product");

    //       const newProductId = created.data.id;           // entry id
    //       const newDocumentId = created.data.documentId; // document id (for update)
    //       console.log("✅ Product created:", created);

    //       let thumbnailId = null;
    //       let imagesIds = [];

    //       // (2) upload thumbnail
    //       if (thumbnail) {
    //         const formData = new FormData();
    //         formData.append("files", thumbnail);
    //         formData.append("ref", "api::product.product");
    //         formData.append("refId", String(newProductId));
    //         formData.append("field", "thumbnail");

    //         const thumbRes = await fetch(`/api/upload`, {
    //           method: "POST",
    //           headers: {
    //             Authorization: `Bearer ${CookieService.get("jwt")}`,
    //           },
    //           body: formData,
    //         });

    //         const thumbData = await thumbRes.json();
    //         thumbnailId = thumbData?.[0]?.id;
    //         console.log("✅ Thumbnail uploaded:", thumbnailId);
    //       }

    //       // (3) upload images (multi)
    //       if (images && images.length > 0) {
    //         const formData = new FormData();
    //         images.forEach((file) => formData.append("files", file));
    //         formData.append("ref", "api::product.product");
    //         formData.append("refId", String(newProductId));
    //         formData.append("field", "images");

    //         const imgRes = await fetch(`/api/upload`, {
    //           method: "POST",
    //           headers: {
    //             Authorization: `Bearer ${CookieService.get("jwt")}`,
    //           },
    //           body: formData,
    //         });

    //         const imgData = await imgRes.json();
    //         imagesIds = imgData.map((file) => file.id);
    //         console.log("✅ Images uploaded:", imagesIds);
    //       }

    //       // (4) link media with product (update)
    //       if (thumbnailId || imagesIds.length > 0) {
    //         await fetch(`/api/products/${newDocumentId}`, {
    //           method: "PUT",
    //           headers: {
    //             Authorization: `Bearer ${CookieService.get("jwt")}`,
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify({
    //             data: {
    //               ...(thumbnailId ? { thumbnail: [thumbnailId] } : {}),
    //               ...(imagesIds.length > 0 ? { images: imagesIds } : {}),
    //             },
    //           }),
    //         });

    //         console.log("✅ Media linked to product");
    //       }

    //       return created;
    //     } catch (err) {
    //       console.error("❌ Create product failed:", err);
    //       throw err;
    //     }
    //   },
    // }),


    uploadProductMedia: build.mutation({
      // file: File, refId: number|string, field: 'thumbnail' مثلاً, ref: 'api::product.product'
      // fileInfo (اختياري): { name, alternativeText, caption }
      query: ({ file, refId, field, ref = 'api::product.product', fileInfo }) => {
        const formData = new FormData();
        formData.append('files', file);
        formData.append('ref', ref);
        formData.append('refId', String(refId));
        formData.append('field', field);

        if (fileInfo) {
          // ينفع كمان تستخدم formData.append('fileInfo[alternativeText]', '...') وهكذا
          formData.append('fileInfo', JSON.stringify(fileInfo));
        }

        return {
          url: `/api/upload`,
          method: 'POST',
          body: formData, // مهم: ما تضيفش Content-Type يدوي
        };
      },
      invalidatesTags: (result, error, { refId }) => [
        { type: 'Products', id: refId },
        { type: 'Products', id: 'LIST' },
      ],
    }),

    deleteMediaFile: build.mutation({
      query: (fileId) => ({
        url: `/api/upload/files/${fileId}`,
        method: 'DELETE',
      }),
    }),


    //**  UPDATE
    updateDashboardProducts: build.mutation({
      query: ({ documentId, body }) => {
        console.log("Updating product documentId:", documentId);

        const isFormData = body instanceof FormData;
        return {
          url: `/api/products/${documentId}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${CookieService.get("jwt")}`,
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
          },
          body: isFormData ? body : JSON.stringify(body),
        };
      },

      async onQueryStarted({ documentId, body }, { dispatch, queryFulfilled }) {
        // If body is FormData, extract JSON part for optimistic update
        let optimisticData = null;
        if (body instanceof FormData) {
          try {
            optimisticData = JSON.parse(body.get("data"));
          } catch (e) {
            console.warn("Could not parse optimistic data from FormData");
          }
        } else {
          optimisticData = body;
        }

        const patchResult = dispatch(
          productsApiSlice.util.updateQueryData(
            "getDashboardProducts",
            { page: 1 }, // ✅ must pass same args as your query!
            (draft) => {
              const product = draft.data?.find((p) => p.documentId === documentId);
              if (product && optimisticData) {
                Object.assign(product, optimisticData);
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },

      invalidatesTags: (result, error, { documentId }) => [
        { type: "Products", id: documentId },
        { type: "Products", id: "LIST" },
      ],
    }),


    //**  DELETE
   
    deleteDashboardProducts: build.mutation({
      query(id) {
        console.log("Deleting product ID:", id); // <--- add this
        return {
          url: `/api/products/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${CookieService.get('jwt')}`
          }
        }
      },
      invalidatesTags: (result, error, id) => [
        { type: 'Products', id },
        { type: 'Products', id: 'LIST' }
      ],
    })
  }),
})

export const { 
  useCreateDashboardProductMutation,
  useGetDashboardProductsQuery,
  useDeleteDashboardProductsMutation,
  useUpdateDashboardProductsMutation,
  useUploadProductMediaMutation,     
  useDeleteMediaFileMutation, 
} = productsApiSlice;
