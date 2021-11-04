import { createSlice, createAction  } from "@reduxjs/toolkit";


const counter = createSlice({
    name: 'counter',
    initialState: {count:3},
    reducers: {
        increment: (state,value)=>{
            console.log(value.payload)
            return state
            // state.count = state.count+1
        }
    },
})


export const { increment } = counter.actions
export default counter.reducer
