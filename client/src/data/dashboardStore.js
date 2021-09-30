import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeSection:1,
    sectionBoton:[
        {   
            header:'MEDIA',
            sections:[
                {
                    icon:"fas fa-photo-video",
                    title:'Galeria',
                    index:2,
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
                    },
                    {
                        icon:"fas fa-circle",
                        title:'Slider Interiores',
                    },
                    {
                        icon:"fas fa-circle",
                        title:'Slider Areas comunes',
                    },
                    {
                        icon:"fas fa-circle",
                        title:'Avance de obra',
                    },
                ]
            },
            {
                icon:"fas fa-table",
                title:'Form',
                index:6,
                subSection:[{

                        icon:"fas fa-circle",
                        title:'Formulario de inicio',
                    },
                    {
                        icon:"fas fa-circle",
                        title:'Formulario template',
                    },
                ]
            },
            {
                icon:"fas fa-columns",
                title:'Atributos',
                index:7,
                subSection:[{
                        icon:"fas fa-circle",
                        title:'Formulario Inicio',
                    },
                    {
                        icon:"fas fa-circle",
                        title:'Slider Interiores',
                    },
                    {
                        icon:"fas fa-circle",
                        title:'Slider Areas comunes',
                    },
                ]
            },
            {
                icon:"fab fa-whatsapp",
                title:'Whatsapp',
                index:8,
                subSection:[{
                        icon:"fas fa-circle",
                        title:'Float Whatsapp',
                    },
                ]
            },
        
        ]
        }
    ]
}

export const dashboardStore = createSlice({
    name:"dashboard",
    initialState,
    reducers:{
        
    }
})

export default dashboardStore.reducer