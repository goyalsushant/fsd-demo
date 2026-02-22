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
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(
                item => item._id === action.payload._id
            )

            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.cartItems.push({
                    ...action.payload,
                    quantity: 1
                })
            }
        },
        updateQuantity: (state, action) => {
            const { product_id, quantity } = action.payload

            const item = state.cartItems.find(
                item => item._id === product_id
            )

            if (item) {
                item.quantity = quantity
            }
        },
        removeCartItem: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id)
        }
    }
})

export const { setLoading, addToCart, removeCartItem, updateQuantity } = cartSlice.actions

export default cartSlice.reducer