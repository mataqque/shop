import axios from "axios"

const TOKEN = 'token'
export const setTokenHelper = (token) => {
    localStorage.setItem(TOKEN,token)
}

export const getTokenHelper = () => {
    return localStorage.getItem(TOKEN)
}

export const deleteTokenHelper = () => {
    localStorage.removeItem(TOKEN)
}

export const curremtUserHelper = (state) => {
    
    state.currentUser = true
    // axios.post("/api/checkUser",{token:localStorage.getItem('token')}).then((res)=>{
 
    // });    
}