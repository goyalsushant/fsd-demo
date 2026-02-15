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
            const root = window.document.documentElement;
            if (state.darkMode) {
                root.classList.add("dark");
            } else {
                root.classList.remove("dark");
            }
        }
    }
})

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer