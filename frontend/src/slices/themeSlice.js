import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    darkMode: false
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state, action) => {
            state.darkMode = !state.darkMode
        }
    }
})

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer