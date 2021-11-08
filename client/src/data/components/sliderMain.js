import { createSlice } from "@reduxjs/toolkit";
import { insertImage } from "../galleryModal";

const initialState = {
    data:[],
    sectionEdit:{id:'',imageDesk:'',imageMobile:"",title:'Nombre',alt:'Descipción Alt',type:'slider-main'},
}
const slider = createSlice({
    name:"sliderMain",
    initialState,
    reducers:{
        setEditSlider:(state,image)=>{
            state.sectionEdit = image.payload
        },
        onchange:(state,value)=>{
            console.log(value.payload)
            let edit = state.sectionEdit;
            edit[value.payload.title] = value.payload.target.target.value
            
            let dataSlider = state.data.map((e)=>{
                if(e.id == value.payload.item.id){
                    return e = edit
                }else {
                    return e
                }
            })
            
            state.sectionEdit = edit
            state.data = dataSlider
        },
        addImageSelected:(state,image)=>{
            let edit = state.sectionEdit;
            console.log(image.payload)
            edit[image.payload.description] = `/images/${image.payload.image.filename}`
            
            let dataSlider = state.data.map((e)=>{
                if(e.id == state.sectionEdit.id){
                    return e = edit
                }else {
                    return e
                }
            })
            
            state.sectionEdit = edit
            state.data = dataSlider
        },
        addImageSelectedDropzone:(state,image)=>{
            console.log(image.payload)
            let edit = state.sectionEdit;
            
            edit[image.payload.description] = `${image.payload.image}`
            
            let dataSlider = state.data.map((e)=>{
                if(e.id == state.sectionEdit.id){
                    return e = edit
                }else {
                    return e
                }
            })
            
            state.sectionEdit = edit
            state.data = dataSlider
        },
        getData:(state,value)=>{
            state.data = value.payload.data
        },
        addSlider:(state,value)=>{
            let newArray = JSON.parse(JSON.stringify(state.data));
            let cont = 0;
            newArray.forEach((item)=>{
                item.id > cont ? 
                cont = item.id : cont = cont
            });
            cont++
    
            newArray.push({id:cont,imageDesk:"",imageMobile:"",alt:`Slider-${cont}`,title:`Slider-${cont}`,type:`slider-main`})
            state.data = newArray
        },
        removeSlider:(state,id)=>{
            let getArray = state.data;
            let newArray = getArray.filter((i,index) => index != id.payload)
            state.data = newArray
        },
        onSortItems:(state,value)=>{
            state.data = value.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(insertImage,(state,value)=>{
            // let time = setInterval(() => {
            //     console.log(store.getState())
            //     clearInterval(time)
            // }, 400);
            // state.sectionEdit.imageDesk = 
        })
    }
})

export const { 
    insertImageSlider,setEditSlider,onchange,
    getData,addSlider,removeSlider,onSortItems,
    addImageSelected,addImageSelectedDropzone,

} = slider.actions
export default slider.reducer