import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showModalGallery:false,
    selectImage:{},
    SLICE_SLIDER:'',
}
const ModalGallery = createSlice({
    name:"GalleryModal",
    initialState,
    reducers:{
        showGallery:(state,slider)=>{
            state.showModalGallery = true
            state.SLICE_SLIDER = slider.payload            
        },
        closeGallery:(state)=>{
            state.showModalGallery = false
        },
        insertImage:(state,image)=>{
            state.selectImage = image.payload
            state.showModalGallery = false
            state.SLICE_SLIDER.changeFromGallery(image.payload)
        },
    },
})

export const { closeGallery, showGallery,insertImage} = ModalGallery.actions
export default ModalGallery.reducer