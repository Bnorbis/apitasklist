import express from 'express';
import routes from './routes';
import './index'
import cors from 'cors';

class App {

    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(cors())
        this.server.use(express.json());
    }

    routes(){
        this.server.use(routes);
    }
}

export default new App().server;