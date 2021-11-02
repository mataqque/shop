import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    active:false,
    dataImage:'',
}

export const modalFeatures = createSlice({
    name:"modal",
    initialState,
    reducers:{
        active:(state)=>{
            state.active = true
        },
        close:(state,event)=>{
            if(event.payload.target.dataset.type == "modal"){
                state.active = false
            }
        },
    }
})

export const { active, close } = modalFeatures.actions
export default modalFeatures.reducer