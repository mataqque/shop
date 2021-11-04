import { createSlice } from "@reduxjs/toolkit";
import { increment } from "./counter";

const user = createSlice({
    name: 'user',
    initialState: { name: '', age: 20 },
    reducers: {
        setUserName: (state, action) => {
            state.name = action.payload // mutate the state all you want with immer
        },
    },
    extraReducers: {
        [increment]: (state,action) => {
            state.age += 1
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(increment,(state,action)=>{
            state.age++
            return state
        })
    }
})

export const { setUserName } = user.actions
export default user.reducer