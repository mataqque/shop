import axios from 'axios';

export default class ApiService {
    constructor(){
        this.$api = axios.create({
            baseURL:  process.env.NODE_ENV == "production" ? "/api" : "http://localhost:3000",
            // baseURL:  "https://prueba.ativa.com.pe/api",
            headers: {
                "Cache-Control": "no-cache",
                'Content-Type': 'application/json',
            }
        })
    }
    saveLead = payload => this.$api.post("/leads", {data: payload})
    saveComplaint = payload => this.$api.post("/complaints", {data: payload})
    post = (url, payload) => this.$api.post(url, payload);
    get = (url) => this.$api.get(url);

}