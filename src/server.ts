import express, { Application, Request, Response } from 'express';
import http from 'http';

import cors from 'cors';
import path from 'path';

import route from './infrastructure/routes/routes';


import DB from './infrastructure/settings/db/DB';
import { swaggerServe, swaggerSetup } from './infrastructure/settings/doc/swagger';
import { socketIo } from './infrastructure/settings/io/io';
import { ioConnectionManager } from './infrastructure/socket';



class Server {
    public static app: Application = express();
    public serve: any;
    public socketIo: any;
    private port: String = process.env.PORT || '8080';

    constructor() {
    }

    /**
     * description: start the server
     */
    public start(port: String = this.port) {
        this.serve = http.createServer(Server.app);
        this.socketIo = socketIo(this.serve);
        this.serve.listen(this.port, () => {
            console.log('Server on port ' + port)
        })
        this.middleware();
        this.routes()
        DB.connect();

        
    }

    private middleware() {
        Server.app.use(express.urlencoded({ extended: false }))
        Server.app.use(express.json())
        Server.app.use(cors());
        Server.app.use('/doc', swaggerServe, swaggerSetup);
        Server.app.get('/', (req: Request, res:Response )=>res.redirect('https://chatapp-fa-v1.herokuapp.com'));
        
    }

    private routes() {
        Server.app.use('/api', route);
        Server.app.get('**', (req: Request, res:Response )=>res.json({ok:false, msg:"page no found"}))
        ioConnectionManager(this.socketIo);
    }

}


Server.app.use(express.urlencoded({ extended: false }))
Server.app.use(express.json())
Server.app.use(cors())
Server.app.use('/doc', swaggerServe, swaggerSetup);
Server.app.use('/', express.static(path.join(__dirname, '../public')));
// Server.app.use('/api', route)

export default Server;