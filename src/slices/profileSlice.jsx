import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false
}

export const profileSlice = createSlice({

    name:"profile",
    initialState:initialState,
    reducers:{
        setLoading: (state,action) => {
            state.loading = action.payload
        },
        setUser: (state,action) => {
            state.user = action.payload
        }
    }
})

export const {setUser , setLoading} = profileSlice.actions;
export default profileSlice.reducer;