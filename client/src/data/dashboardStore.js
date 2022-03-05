import { createSlice } from "@reduxjs/toolkit";
import Galeria from "../pages/dashboard/galeria";
import SliderMain from "../pages/dashboard/sliderMain";

const initialState = {
    activeSection:5,
    sectionBoton:[
        {   
            header:'MEDIA',
            sections:[
                {
                    icon:"fas fa-photo-video",
                    title:'Galería',
                    index:2,
                    component:<Galeria/>,
                    subSection:[]
                }
            ]
        
        },
        {   
            header:'SITEMAP',
            sections:[
                {
                    icon:"fas fa-sitemap",
                    title:'Sitemap',
                    index:3,
                    component:null,
                    subSection:[]
                }
            ]
        
        },
        {   
            header:'TEMAS',
            sections:[
                {
                    icon:"fas fa-tint",
                    title:'Colores',
                    index:4,
                    subSection:[
                        {
                            icon:"fas fa-circle",
                            title:'Colors',
                            component:null,
                        }
                    ]
                }
            ]
        
        },
        {   
            header:'COMPONENTES',
            sections:[
            {
                icon:"fas fa-images",
                title:'Sliders',
                index:5,
                subSection:[{
                        icon:"fas fa-circle",
                        title:'Slider Principal',
                        component: <SliderMain type={'slider-main'}/>,
                    },
                    {
                        icon:"fas fa-circle",
                        title:'Slider Interiores',
                        component: <SliderMain type={'slider-interiores'}/>,
                    },
                    {
                        icon:"fas fa-circle",
                        title:'Slider Áreas comunes',
                        component:<SliderMain type={'slider-areas-comunes'}/>,
                    },
                    {
                        icon:"fas fa-circle",
                        title:'Slider tipologias',
                        component:<SliderMain type={'slider-tipologias'}/>,
                    },
                    {
                        icon:"fas fa-circle",
                        title:'Slider Sitios',
                        component:<SliderMain type={'slider-sitios'}/>,
                    },
                    
                ]
            },
            {
                icon:"fas fa-gift",
                title:'Promociones',
                index:7,
                subSection:[{
                        icon:"fas fa-circle",
                        title:'Formulario de inicio',
                        component:null,
                    },
                    {
                        icon:"fas fa-circle",
                        title:'Formulario template',
                        component:null,
                    },
                ]
            },
            {
                icon:"fas fa-table",
                title:'Form',
                index:8,
                subSection:[{
                        icon:"fas fa-circle",
                        title:'Formulario de inicio',
                        component:null,
                    },
                    {
                        icon:"fas fa-circle",
                        title:'Formulario template',
                        component:null,
                    },
                ]
            },
            {
                icon:"fas fa-columns",
                title:'Atributos',
                index:9,
                subSection:[{
                        icon:"fas fa-circle",
                        title:'Formulario Inicio',
                        component:null,
                    },
                    {
                        icon:"fas fa-circle",
                        title:'Slider Interiores',
                        component:null,
                    },
                    {
                        icon:"fas fa-circle",
                        title:'Slider Areas comunes',
                        component:null,
                    },
                ]
            },
            {
                icon:"fab fa-whatsapp",
                title:'Whatsapp',
                index:10,
                subSection:[{
                        icon:"fas fa-circle",
                        title:'Float Whatsapp',
                        component:null,
                    },
                ]
            },
        
        ]
        }
    ]
}

export const dashboardStore = createSlice({
    name:"dashboard",
    initialState
});
export default dashboardStore.reducer