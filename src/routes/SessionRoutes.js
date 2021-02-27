import { SessionUserController } from "../controllers";
export default class UserRoutes {

    constructor(){
        this.controller = new SessionUserController();
    }

    #registerRoutes(app){

        app.post('/login', (req,res) => this.controller.store(req,res));
        return app;
    }

    useRoute(app){
        app.use('/session', this.#registerRoutes(app))
    }
}