import { UserAccountController } from "../controllers";

export default class AccountRoutes {

    constructor(){
        this.controller = new UserAccountController();
    }

    #registerRoutes(app){

        app.get('/show', (req,res) => this.controller.show(req,res));
        app.get('/:id', (req,res) => this.controller.index(req,res));
        return app;
    }

    useRoute(app){
        app.use('/user-account', this.#registerRoutes(app))
    }
}