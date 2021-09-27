import { createSlice } from '@reduxjs/toolkit'
import Inicio from '../pages/inicio/inicio'
import Login from '../pages/formularios/login'
import LoginRegister from '../pages/formularios/loginRegister'
import { dataInicio } from './inicio'
import Dashboard from '../pages/dashboard/dashboard'

const  initialState = {
    activeLinkValue: 0,
    links:[
        {
            index:1,
            title:"Inicio",
            link:"/",
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
        {
            index:null,
            title:"Dashboard",
            link:"/dashboard",
            component:<Dashboard></Dashboard>,
            show:false
        },
        {
            index:null,
            title:"Dashboard",
            link:"/dashboard/:page",
            component:<Dashboard></Dashboard>,
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
        }
    }
})

export const {activeLinks } = routesFeatures.actions
export default routesFeatures.reducer