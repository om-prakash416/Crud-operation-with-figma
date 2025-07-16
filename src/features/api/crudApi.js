import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiUrl = import.meta.env.VITE_API_URL;
// const BASE_URL = "https://crudcrud.com/api/6b4876eaa2d746d3b4ef680be3b2fa3f";

const BASE_URL = apiUrl; // Use the environment variable for the base URL
const RESOURCE = "/resource";

export const crudApi = createApi({
  reducerPath: "crudApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Resource"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => RESOURCE,
      providesTags: ["Resource"],
    }),
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: RESOURCE,
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Resource"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `${RESOURCE}/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Resource"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${RESOURCE}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Resource"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = crudApi;
