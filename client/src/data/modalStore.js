import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    active:false,
}

export const modalFeatures = createSlice({
    name:"modal",
    initialState,
    reducers:{
        active:(state)=>{
            state.active = true
        },
        close:(state,event)=>{
            console.log(event.payload.target.dataset.type)
            if(event.payload.target.dataset.type == "modal"){
                state.active = false
            }
        },
    }
})

export const { active, close} = modalFeatures.actions
export default modalFeatures.reducer