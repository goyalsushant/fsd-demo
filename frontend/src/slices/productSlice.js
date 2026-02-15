import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    products: [],
    selectedProduct: null
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setProducts: (state, action) => {
            state.products = action.payload
        }
    }
})

export const { setLoading, setProducts } = productSlice.actions

export default productSlice.reducer