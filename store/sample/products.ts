// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import PRODUCTS from "../data/dummy-data";
// import { baseProduct, Product } from "../models/product";

// type UpdateProductPayload = Pick<Product, "id" | "title" | "description" | "imageUrl">

// const initialState = {
//     availableProducts: PRODUCTS,
//     userProducts: PRODUCTS.filter(product => product.ownerId === 'u1'),
// }

// const findAndUpdateProduct = (productList: Product[], productItem: UpdateProductPayload) => {
//     const productIndex = productList.findIndex(product => product.id === productItem.id )
//     const updatedProduct = {
//         id: productItem.id,
//         ownerId: productList[productIndex].ownerId,
//         title: productItem.title,
//         imageUrl: productItem.imageUrl,
//         price: productList[productIndex].price,
//         description: productItem.description,
//     };
//     const updatedUserProducts = [...productList];
//     updatedUserProducts[productIndex] = updatedProduct
//     return updatedUserProducts
// }

// const productsSlice = createSlice({
//     name: "products",
//     initialState,
//     reducers: {
//         addProduct: (state, {payload}: PayloadAction<baseProduct>) => {
//             const newProduct = {
//                 id: new Date().toString(),
//                 ownerId: 'u1',
//                 ...payload
//             }
//             return {
//                 ...state,
//                 availableProducts: state.availableProducts.concat(newProduct),
//                 userProducts: state.userProducts.concat(newProduct)
//             }
//         },
//         updateProduct: (state, {payload}: PayloadAction<UpdateProductPayload>) => {
//             return {
//                 ...state,
//                 availableProducts: findAndUpdateProduct(state.availableProducts, payload),
//                 userProducts: findAndUpdateProduct(state.userProducts, payload),
//             }
//         },
//         removeProduct: (state, {payload}: PayloadAction<string>) => {
//             return {
//                 ...state, 
//                 userProducts: state.userProducts.filter(product => product.id !== payload),
//                 availableProducts: state.availableProducts.filter(product => product.id !== payload)
//             }
//         },
//     }
// })

// export const {} = productsSlice.actions
// export default productsSlice.reducer