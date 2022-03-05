import Axios from 'axios';

export default class SperantService {
    constructor(){
        this._client = {}
        this.auth("TSTl3tDXrnk6Li_hDJn9dCIJyDvVRyMj5VjtNCwnciA")
    }
    auth(apiKey) {
        this._sperantAPI = Axios.create({
            baseURL: 'https://cors.formulaperu.com/https://api.sperant.com/v2/',
            headers: {
                "Cache-Control": "no-cache",
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`
            }
        })
        return this
    }

     client(client) {
        this._client = {...this._client, ...client}
        return this
    }

    captationWays(target_url, captation_ways = {}) {
        for (const key in captation_ways) {
            if (new RegExp(key, 'i').test(target_url)) {
                this._client.source_id = captation_ways[key]
            }
        }
        new URLSearchParams(target_url).forEach((v, k) => {
            /utm_/.test(k) && (this._client[`${k.toLowerCase()}`] = v)
        })
        return this
    }

    async create(){
        return await this._sperantAPI.post('/clients', {data: this._client})
    }

}