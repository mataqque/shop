const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    slider:[
        {img:require("../../assets/images/inicio/slider/slider-1.png").default},
        {img:require("../../assets/images/inicio/slider/slider-2.jpg").default},
        {img:require("../../assets/images/inicio/slider/slider-3.jpg").default},
    ]
}

export const sliderMain = createSlice({
    name:'sliderMain',
    initialState,
    reducers:{

    }
})

export default sliderMain.reducer
