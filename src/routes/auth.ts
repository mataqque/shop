import { Router } from 'express';
import {Request, Response} from 'express';
import { authPanelController } from '../controllers/auth/authController';
const passport = require('passport');

export class authRoute {
    public router: any;
    public authPanelController: authPanelController = new authPanelController();
    constructor() {
        this.router = Router();
        this.routes();
    }
    private routes() {
        this.router.post("/login", this.authPanelController.login);
        this.router.post("/validate", this.authPanelController.validate);
        this.router.post("/registro", passport.authenticate('register', {passReqToCallback: true}), (req: Request, res: Response) => {
            console.log(req.body)
        });
    }
}

