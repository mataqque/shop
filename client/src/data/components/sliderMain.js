import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    data:[],
    sectionEdit:{id:'',imageDesk:'/images/947119258-Astronaut-Wallpaper.jpg',imageMobile:"",title:'Nombre',alt:'Descipción Alt'},
}
const slider = createSlice({
    name:"sliderMain",
    initialState,
    reducers:{
        setEditSlider:(state,image)=>{
            state.sectionEdit = image.payload
        },
        insertImageSlider:(state,image)=>{
            console.log('insertImageSlider',image.payload)
            // state.sectionEdit = image.payload
        },
        onchange:(state,value)=>{
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
    
            newArray.push({id:cont,imageDesk:"",imageMobile:"",alt:`Slider-${cont}`,title:`Slider-${cont}`})
            state.data = newArray
        },
        removeSlider:(state,id)=>{
            let getArray = state.data;
            let newArray = getArray.filter((i,index) => index != id.payload)
            state.data = newArray
        },
        onSortItems:(state,value)=>{
            state.data = value.payload
            console.log('sortitems',value.payload)
        }
    },
})

export const { insertImageSlider,setEditSlider,onchange,getData,addSlider,removeSlider,onSortItems} = slider.actions
export default slider.reducer