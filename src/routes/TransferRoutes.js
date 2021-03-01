import { TransferController } from "../controllers";

export default class TransferRoutes {

    constructor(){
        this.controller = new TransferController();
    }

    #registerRoutes(app){

        app.post('/:id', (req,res) => this.controller.store(req,res));
        return app;
    }

    useRoute(app){
        app.use('/user', this.#registerRoutes(app))
    }
}