import { Router } from 'express';
import { leadsController } from '../controllers/leads/leads';

export class leadRoute {
    public router: any;
    public leadsController: leadsController = new leadsController();
    constructor() {
        this.router = Router();
        this.routes();
    }
    private routes() {
        this.router.get("/", this.leadsController.list);
        this.router.get("/:id", this.leadsController.details);
        this.router.post("/", this.leadsController.save);
    }
}