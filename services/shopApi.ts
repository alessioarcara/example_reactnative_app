import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { FIREBASE_AUTH_API, FIREBASE_DB_API } from "../constants";
import Order from "../models/order";
import { baseProduct, Product } from "../models/product";
import { AuthRequest, UserResponse } from "../models/user";
import { RootState } from "../store";

type FIREBASE_POST_RESPONSE = {
  name: string;
};

type FIREBASE_ERROR = {
  status: "FIREBASE_ERROR";
  data: {
    error: {
      code: number;
      message: string;
    };
  };
};

type FirebaseFetchBaseQueryError = FIREBASE_ERROR | FetchBaseQueryError;

const rawBaseQuery = fetchBaseQuery({ baseUrl: FIREBASE_DB_API });

const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FirebaseFetchBaseQueryError,
  { sendToken?: boolean }
> = async (args, api, extraOptions) => {
  const token = (api.getState() as RootState).auth.token;

  const adjustedArgs =
    typeof args === "string"
      ? args
      : args.url.startsWith("http")
      ? args
      : args.method !== "GET"
      ? { ...args, url: `${args.url}?auth=${token}` }
      : args;

  return rawBaseQuery(adjustedArgs, api, extraOptions);
};

export const addOrder = createAsyncThunk(
  "shopApi/addOrder",
  (order: Omit<Order, "id">, { dispatch }) => {
    dispatch(shopApi.endpoints.addOrder.initiate(order));
    for (const cartItem of order.items) {
      const pushToken = cartItem.pushToken;

      console.log(pushToken);

      fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-Encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: pushToken,
          title: "Order was placed!",
          body: cartItem.title,
        }),
      });
    }
  }
);

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: dynamicBaseQuery,
  tagTypes: ["Product", "Order"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => `/products.json`,
      providesTags: () => ["Product"],
      transformResponse: (response: any) => {
        let loadedProducts: Product[] = [];

        for (const key in response) {
          loadedProducts.push({ id: key, ...response[key] });
        }
        return loadedProducts;
      },
    }),
    addProduct: builder.mutation<FIREBASE_POST_RESPONSE, baseProduct>({
      async queryFn(arg, api, extraOptions, baseQuery) {
        const userId = (api.getState() as any).auth.userId;
        const result = await baseQuery({
          url: `/products.json`,
          method: "POST",
          body: { ...arg, ownerId: userId },
        });

        return result.data
          ? { data: result.data as FIREBASE_POST_RESPONSE }
          : { error: result.error as FirebaseFetchBaseQueryError };
      },
      invalidatesTags: ["Product"],
    }),
    editProduct: builder.mutation<
      Partial<Product>,
      Omit<Product, "ownerId" | "price">
    >({
      query: ({ id, ...patch }) => ({
        url: `/products/${id}.json`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<void, Pick<Product, "id">>({
      query: ({ id }) => ({
        url: `/products/${id}.json`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    getUserOrders: builder.query<Order[], void>({
      async queryFn(arg, api, extraOptions, baseQuery) {
        const userId = (api.getState() as any).auth.userId;
        const result = await baseQuery(`/orders/${userId}.json`);

        //for simplicity we cast data to any instead of unknown, don't do like this!
        const data: any = result.data;

        let loadedOrders: Order[] = [];

        for (const key in data) {
          loadedOrders.push({ id: key, ...data[key] });
        }

        return result.error
          ? { error: result.error as FirebaseFetchBaseQueryError }
          : { data: loadedOrders };
      },
      providesTags: () => ["Order"],
    }),
    addOrder: builder.mutation<FIREBASE_POST_RESPONSE, Omit<Order, "id">>({
      async queryFn(order, api, extraOptions, baseQuery) {
        const userId = (api.getState() as any).auth.userId;
        const result = await baseQuery({
          url: `/orders/${userId}.json`,
          method: "POST",
          body: order,
        });

        return result.data
          ? { data: result.data as FIREBASE_POST_RESPONSE }
          : {
              error: {
                status: "FIREBASE_ERROR",
                ...result.error,
              } as FirebaseFetchBaseQueryError,
            };
      },
      invalidatesTags: ["Order"],
    }),
    signup: builder.mutation<UserResponse, AuthRequest>({
      query: (user) => ({
        url: `${FIREBASE_AUTH_API}:signUp?key=AIzaSyCIEaTfJjhDBozqUJhoHDUYFbu_836G6B4`,
        method: "POST",
        body: { ...user, returnSecureToken: true },
      }),
    }),
    login: builder.mutation<UserResponse, AuthRequest>({
      query: (user) => ({
        url: `${FIREBASE_AUTH_API}:signInWithPassword?key=AIzaSyCIEaTfJjhDBozqUJhoHDUYFbu_836G6B4`,
        method: "POST",
        body: { ...user, returnSecureToken: true },
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetUserOrdersQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useSignupMutation,
  useLoginMutation,
} = shopApi;
