import SperantService from './SperantService';

export class InterestedService {
    constructor() {
        this._sperantService = new SperantService()
    }

    send = async (data) => {
        const client = {
            "fname": data.fname,
            "lname": data.lname,
            "email": data.email,
            "main_telephone": data.phone,
            "interest_type_id": 4,
            "project_related": 17,
            "input_channel_ids": 4,
            "source_id": 85,
            "observation": [
                data.rooms_amount && `Dormitorios: ${data.rooms_amount}`,
                data.parking_lots && `Estacionamientos: ${data.parking_lots}`,
                data.message && `Mensaje: ${data.message}`,
            ].join(", ")
        }

        const date = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })

        const axios = require("axios")
        axios.post("https://cors.formulaperu.com/https://script.google.com/macros/s/AKfycbws7GCpc1eEN5ScQ_IisUkLEwKQHvY_XCe5_KEbXA3ytUWVtA/exec", {
            "ss_id": "1CfCxJdJJDWvfmixvX7AdowGGq_LfiBuP823m4Ryj3YA",
            "range": "Ativa!A:XX",
            "values": [[date, data.fname, data.lname, data.phone, data.email, client.observation]]
        })
        
        return this._sperantService
            .captationWays(localStorage.getItem("url_query"), {
                "google|adwords|googleads|gclid|cpc": 59, // Google Ads
                "facebook|fbclid|pixel": 51, // facebook
                "icommarketing|mailchimp|mail": 27, // mailing
            })
            .client(client)
            .create()
    }
}