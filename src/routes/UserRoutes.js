import { UserController } from "../controllers";
import { CheckToken } from "../middlewares";
export default class UserRoutes {

    constructor(){
        this.controller = new UserController()
    }

    #registerRoutes(app){

        app.post('/login', (req,res) => this.controller.login(req,res));
        //app.get('/', [CheckToken], (req,res) => this.controller.listUsers(req,res));
        app.post('/', (req,res) => this.controller.saveUser(req,res));
        //app.put('/:id', [CheckToken], (req,res) => this.controller.updateUser(req,res));
        //app.delete('/:id', [CheckToken], (req,res) => this.controller.deleteUser(req,res));

        return app;
    }

    useRoute(app){
        app.use('/user', this.#registerRoutes(app))
    }
}