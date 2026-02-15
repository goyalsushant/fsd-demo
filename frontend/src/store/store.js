import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../slices/authSlice'
import productSlice from '../slices/productSlice'
import themeSlice from '../slices/themeSlice'
import orderSlice from '../slices/orderSlice'
import cartSlice from '../slices/cartSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        products: productSlice,
        cart: cartSlice,
        orders: orderSlice,
        theme: themeSlice
    }
})

export default store