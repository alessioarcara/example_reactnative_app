// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import Order from "../models/order";
// import { aggregatedProduct } from "../models/product";
// import { getReadableDate } from "../utils/utils";

// type OrdersState = {
//     orders: Order[]
// }

// const initialState: OrdersState = {
//     orders: []
// }

// const ordersSlice = createSlice({
//     name: "orders",
//     initialState,
//     reducers: {
//         addOrder: (state, {payload}: PayloadAction<{items: aggregatedProduct[]; totalAmount: number}>) => {
//             const newOrder = {
//                 // dummy id
//                 id: new Date().toString(),
//                 ...payload,
//                 date: getReadableDate(new Date())
//             }

//             return {
//                 ...state,
//                 orders: state.orders.concat(newOrder)
//             }
//         }
//     },
// })

// export const {addOrder} = ordersSlice.actions
// export default ordersSlice.reducer
