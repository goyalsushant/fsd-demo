import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    cartItems: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setCartItems: (state, action) => {
            state.cartItems = [...state.cartItems, action.payload]
        },
        removeCartItem: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id)
        }
    }
})

export const { setLoading, setCartItems, removeCartItem } = cartSlice.actions

export default cartSlice.reducer