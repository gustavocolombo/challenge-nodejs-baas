import UserRoutes from "./UserRoutes";
import SessionRoutes from './SessionRoutes';
import AccountRoutes from './AccountRoutes';
export default class Routes {
    constructor(app){
        this.app = app;
        this.routes = [
            UserRoutes,
            SessionRoutes,
            AccountRoutes,
        ];
    }

    registerRoutes(){
        this.app.get('/status', (req,res) => {
            res.json({
                status: 'UP',
                version: pkg.version,
                node: process.version,
                resource: process.cpuUsage().system,
                uptime_min: Math.floor(process.uptime() / 60)
            })
        })
        
        this.routes.forEach(route => {
            let instanceOfRoute = new route();
            instanceOfRoute.useRoute(this.app);
        })

        return this.app;
    }
}