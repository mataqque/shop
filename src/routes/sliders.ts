import {Request, Response,Router} from 'express';
import { sliderController } from '../controllers/slider/slider';
const passport = require('passport');

export class sliderRoute {
    public router: any;
    public sliderController: sliderController = new sliderController();
    constructor() {
        this.router = Router();
        this.routes();
    }
    private routes() {
        this.router.post("/update", this.sliderController.updateSlider);
        this.router.post("/getSliders", this.sliderController.getSliders);
    }
}