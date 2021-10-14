import { createSlice } from "@reduxjs/toolkit";
import { deleteTokenHelper, getTokenHelper, setTokenHelper } from "./helpers/helpers";

const initialState = {
    currentUser: true,
}
export const userStore = createSlice({
    name:"serStore",
    initialState,
    reducers:{
        setToken: (state)=>{
            state.currentUser = true
        },
        getToken: (state)=>{
            state.currentUser = true
        },
        deleteToken: (state)=>{
            state.currentUser = true
        },
        curremtUser: (state)=>{
            state.currentUser = true
        }
    }
})

export const { curremtUser,deleteToken,getToken,setToken } = userStore.actions
export default userStore.reducer