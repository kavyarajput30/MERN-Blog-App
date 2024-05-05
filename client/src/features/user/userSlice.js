import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {

            state.loading = false

            state.currentUser = action.payload
            state.error = null
        },
        signInFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        logout: (state) => {
            state.currentUser = null
        }
    }
})

export const { signInStart, signInSuccess, signInFailure, logout } = userSlice.actions
export default userSlice.reducer
