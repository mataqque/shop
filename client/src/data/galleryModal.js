import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showModalGallery:false,
    selectImage:{},
    SLICE_SLIDER:{},
}
const ModalGallery = createSlice({
    name:"GalleryModal",
    initialState,
    reducers:{
        showGallery:(state,slider)=>{
            state.showModalGallery = true
            console.log(slider.payload)
            state.SLICE_SLIDER = slider.payload
        },
        closeGallery:(state)=>{
            state.showModalGallery = false
        },
        insertImage:(state,image)=>{
            state.showModalGallery = false
            state.SLICE_SLIDER.action({image:image.payload,description:state.SLICE_SLIDER.description})
        },
    },
    
})

export const { closeGallery, showGallery,insertImage} = ModalGallery.actions
export default ModalGallery.reducer