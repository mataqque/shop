const express = require("express")
import {Request, Response} from 'express'
require('dotenv').config()
const helmet = require("helmet")
const morgan =  require("morgan")
const cors = require("cors")
const path = require("path")
const favicon = require('express-favicon')
const PORT = process.env.PORT || 4000
const passport = require('passport')
import bodyParser from 'body-parser'
import {policy} from './src/config/helmet'
import { leadRoute } from './src/routes/leads'
import { complaintsRoute } from './src/routes/complaints'
import { authRoute } from './src/routes/auth'
import { filesRoute } from './src/routes/files'
import { sliderRoute } from './src/routes/sliders'
import { passportUtilities } from './src/utilities/passport.utilities'

class App {
    public server
    public passport = new passportUtilities().passportInit()
    public authRoute: authRoute = new authRoute()
    public filesRoute: filesRoute = new filesRoute()
    public sliderRoute: sliderRoute = new sliderRoute()
    public leadsRoute: leadRoute = new leadRoute()
    public complaintsRoute: complaintsRoute = new complaintsRoute()

    constructor() {
        this.server = express()
        this.middlewares()
        this.routes()
    }
    private middlewares() {
        // this.server.use(express.json())
        this.server.use(bodyParser.json())
        this.server.use(express.urlencoded({extended: false}))
        this.server.use(favicon(path.join(__dirname, '../client/build/favicon.ico')))
        this.server.use(express.static(path.join(__dirname, './src/public')))
        this.server.use(express.static(path.resolve(__dirname, '../client/build')))
        this.server.use(morgan('dev'))
        this.server.use(helmet(policy))
        this.server.disable("x-powered-by")
        this.server.use(cors({origin: '*'}))
        this.server.use(passport.initialize())

    }
    routes() {
        this.server.use('/auth', this.authRoute.router)
        this.server.use('/files', this.filesRoute.router)
        this.server.use('/slider', this.sliderRoute.router)
        this.server.use('/leads', this.leadsRoute.router)
        this.server.use('/complaints', this.complaintsRoute.router)
        this.server.get('/*', (req: Request, res: Response) => {
            res.sendFile(path.join(__dirname, '../client/build/index.html'))
        })
    }
}

const app = new App().server
app.listen(PORT, () => console.log('open port: ', PORT))