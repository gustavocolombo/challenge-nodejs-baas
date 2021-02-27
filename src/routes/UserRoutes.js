import { UserController } from "../controllers";
import { CheckToken } from "../middlewares";
export default class UserRoutes {

    constructor(){
        this.controller = new UserController()
    }

    #registerRoutes(app){

        app.get('/', (req,res) => this.controller.show(req,res));
        app.post('/', (req,res) => this.controller.saveUser(req,res));
        app.put('/:id', (req,res) => this.controller.update(req,res));
        app.delete('/:id', (req,res) => this.controller.delete(req,res));

        return app;
    }

    useRoute(app){
        app.use('/user', this.#registerRoutes(app))
    }
}