import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step:1,
    course: null,
    editCourse: false,
    paymentLoading: false
}

export const courseSlice = createSlice({

    name: "course",
    initialState: initialState,
    reducers:{

        setStep: (state,action) => {
            state.step = action.payload
        },
        setCourse: (state,action) => {
            state.course = action.payload
        },
        setEditCourse: (state,action) => {
            state.editCourse = action.payload
        },
        setPaymentLoading: (state,action) => {
            state.paymentLoading = action.payload
        },
        resetCourse: (state) => {
            state.course = null,
            state.step = 1,
            state.editCourse = false
        }
    }
});

export const {setCourse , setEditCourse , setStep , setPaymentLoading , resetCourse} = courseSlice.actions;
export default courseSlice.reducer