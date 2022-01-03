import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import {aggregatedProduct, Product} from "../models/product";
import { shopApi } from "../services/shopApi";
// import { addOrder } from "./orders";
// import { removeProduct } from "./products";

export type CartState = {
    items: {[key: string]: aggregatedProduct};
    totalAmount: number
}

const initialState: CartState = {
    items: {},
    totalAmount: 0
} 

const removeProductFromCart = (state: CartState, productId: string) => {
    const {[productId]: removedCartItem, ...updatedCart} = state.items
    return {
        ...state, 
        items: updatedCart,
        totalAmount: state.totalAmount - removedCartItem.quantity * removedCartItem.price
    }
}

const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        addToCart: (state, {payload}: PayloadAction<Product>) => {
            if (state.items.hasOwnProperty(payload.id)) {
                const updatedItem = {
                    ...state.items[payload.id],
                    quantity: state.items[payload.id].quantity + 1
                }
                return {
                    ...state, 
                    items: {
                        ...state.items,
                        [payload.id]: updatedItem
                    },
                    totalAmount: state.totalAmount + payload.price
                }
            } else {
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [payload.id]: {...payload, quantity: 1}
                    },
                    totalAmount: state.totalAmount + payload.price
                }
            }
        },
        removeFromCart: (state, {payload}: PayloadAction<string>) => {
            const selectedCartItem = state.items[payload]
            if (selectedCartItem.quantity > 1) {
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [payload]: {
                            ...selectedCartItem,
                            quantity: selectedCartItem.quantity - 1
                        },
                    },
                    totalAmount: state.totalAmount - selectedCartItem.price
                }
            } else {
                return removeProductFromCart(state, payload)
            }
        },
    },
    extraReducers: builder => {
        builder
            .addMatcher(
                isAnyOf(shopApi.endpoints.deleteProduct.matchFulfilled, shopApi.endpoints.addOrder.matchFulfilled), 
                () => initialState
            )
        // builder.addCase(removeProduct, (state, {payload}) => state.items[payload] ? removeProductFromCart(state, payload) : state)
    }
})

export const {addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;