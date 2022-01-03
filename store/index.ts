import { configureStore } from "@reduxjs/toolkit";
// import productsSlice from "./products";
import cartSlice from "./cart";
import authSlice from "./auth";
// import ordersSlice from "./orders";
import { shopApi } from "../services/shopApi";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
    [shopApi.reducerPath]: shopApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
