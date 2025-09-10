import CookieService from '@/services/CookieService';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ordersApiSlice = createApi({
  reducerPath: 'OrdersApi',
  tagTypes: ['Orders'],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
  endpoints: (build) => ({
    // &pagination[page]=${page}
    getDashboardOrders: build.query({
      query: (arg) => {
        const { page } = arg;
        return {
          url: `/api/orders?pagination[page]=${page}&pagination[pageSize]=7`,
        };
      },
      providesTags: (result) =>
        result?.data
          ? [
            ...result.data.map(({ id }) => ({ type: 'Orders', id })),
            { type: 'Orders', id: 'LIST' },
          ]
          : [{ type: 'Orders', id: 'LIST' }],
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
    }),
    updateDashboardOrders: build.mutation({
      query: ({ documentId, body }) => {
        console.log("Updating order documentId:", documentId);

        const isFormData = body instanceof FormData;
        return {
          url: `/api/orders/${documentId}`,
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
          ordersApiSlice.util.updateQueryData(
            "getDashboardOrders",
            { page: 1 }, // ✅ must pass same args as your query!
            (draft) => {
              const order = draft.data?.find((p) => p.documentId === documentId);
              if (order && optimisticData) {
                Object.assign(order, optimisticData);
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
        { type: "Orders", id: documentId },
        { type: "Orders", id: "LIST" },
      ],
    }),

    deleteDashboardOrders: build.mutation({
      query(id) {
        console.log("Deleting order ID:", id); // <--- add this
        return {
          url: `/api/orders/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${CookieService.get('jwt')}`
          }
        }
      },
      invalidatesTags: (result, error, id) => [
        { type: 'Orders', id },
        { type: 'Orders', id: 'LIST' }
      ],
    })
  }),
})

export const { useGetDashboardOrdersQuery, useDeleteDashboardOrdersMutation, useUpdateDashboardOrdersMutation } = ordersApiSlice;
