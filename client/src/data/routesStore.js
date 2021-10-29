import { createSlice } from '@reduxjs/toolkit'
import Inicio from '../pages/inicio/inicio'
import Login from '../pages/formularios/login'
import LoginRegister from '../pages/formularios/loginRegister'
import { dataInicio } from './inicio'
import Inicio2 from '../pages/inicio/inicio2'

const  initialState = {
    activeLinkValue: 0,
    navShow:true,
    links:[
        {
            index:0,
            title:"Inicio2",
            link:"/",
            component:<Inicio2></Inicio2>,
        },
        {
            index:1,
            title:"Inicio",
            link:"/inicio2",
            component:<Inicio data={dataInicio}></Inicio>
        },
        {
            index:2,
            title:"Mi carrito",
            link:"/carrito"
        },
        {   
            index:3,
            title:"Nosotros",
            link:"/nosotros"
        },
        {
            index:4,
            title:"Cotizador",
            link:"/cotizador"
        },
        {
            index:5,
            title:"Login",
            link:"/login",
            component:<Login></Login>
        },
        {
            index:6,
            title:"Registro",
            link:"/registro",
            component:<LoginRegister></LoginRegister>,
            show:false,
        },
        {
            index:null,
            title:"Politicas de Privacidad",
            link:"/politicas-de-privacidad",
            show:false
        },        
    ]
}
export const routesFeatures = createSlice({
    name:"routes",
    initialState,
    reducers:{
        activeLinks: (state,value)=>{
            state.activeLinkValue = value.payload
        },
        hideNav:(state)=>{
            state.navShow = false
        },
        showNav:(state)=>{
            state.navShow = true
        },
    }
})

export const {activeLinks, hideNav, showNav} = routesFeatures.actions
export default routesFeatures.reducer