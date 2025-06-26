import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    signupData: null,
    loading: false,
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    select: false,
    location: null
}

export const authSlice = createSlice({

    name:"auth",
    initialState:initialState,
    reducers : {

        setLoading: (state , action) => {
            state.loading = action.payload
        },
        setSignupData: (state , action) => {
            state.signupData = action.payload
        },
        setToken: (state , action) => {
            state.token = action.payload
        },
        setSelect: (state,action) => {
            state.select = action.payload
        },
        setLocation: (state,action) => {
            state.location = action.payload
        }
    }
})

export const {setToken , setSignupData , setLoading , setSelect , setLocation} = authSlice.actions;
export default authSlice.reducer;