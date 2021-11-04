import { createSlice } from "@reduxjs/toolkit";
import { insertImageSlider } from "./components/sliderMain";

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
            // state.SLICE_SLIDER = slider.payload           
            
        },
        closeGallery:(state)=>{
            state.showModalGallery = false
        },
        insertImage:(state,image)=>{
            state.showModalGallery = false
            // state.SLICE_SLIDER.insert(image)
            // console.log(state.SLICE_SLIDER.insert)
            // state.selectImage = image.payload
            // state.SLICE_SLIDER.changeFromGallery(image.payload)
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(insertImageSlider,(state, action) => {
            console.log(state)
            return 
            // action is inferred correctly here if using TS
        })
    }
})

export const { closeGallery, showGallery,insertImage} = ModalGallery.actions
export default ModalGallery.reducer