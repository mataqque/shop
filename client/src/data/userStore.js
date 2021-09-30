import { createSlice } from "@reduxjs/toolkit";
import { deleteTokenHelper, getTokenHelper, setTokenHelper, curremtUserHelper } from "./helpers/helpers";

const initialState = {
    currentUser:true,
}
export const userStore = createSlice({
    name:"serStore",
    initialState,
    reducers:{
        setToken: setTokenHelper,
        getToken: getTokenHelper,
        deleteToken: deleteTokenHelper,
        curremtUser: curremtUserHelper
    }
})

export const { setToken, getToken, deleteToken, curremtUser} = userStore.actions
export default userStore.reducer