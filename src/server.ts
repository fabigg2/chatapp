import express, { Application, Request, Response } from 'express';
import http from 'http';

import cors from 'cors';
// import path from 'path'

import route from './infrastructure/routes/routes';


import DB from './infrastructure/settings/db/DB';
import { swaggerServe, swaggerSetup } from './infrastructure/settings/doc/swagger';
import { socketIo } from './infrastructure/settings/io/io';
import { ioConnectionManager } from './infrastructure/socket';



class Server {
    private app: Application = express();
    private serve: any;
    private socketIo: any;
    private port: String = process.env.PORT || '8080';

    constructor() {
    }

    /**
     * description: start the server
     */
    public start(port: String = this.port) {
        this.serve = http.createServer(this.app);
        this.socketIo = socketIo(this.serve);
        this.serve.listen(this.port, () => {
            console.log('Server on port ' + port)
        })
        this.middleware();
        this.routes()
        DB.connect();

        
    }

    private middleware() {
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(express.json())
        this.app.use(cors());
        this.app.use('/doc', swaggerServe, swaggerSetup);
        this.app.get('/', (req: Request, res:Response )=>res.redirect('https://chatapp-fa-v1.herokuapp.com'));
        
    }

    private routes() {
        this.app.use('/api', route);
        this.app.get('**', (req: Request, res:Response )=>res.json({ok:false, msg:"page no found"}))
        ioConnectionManager(this.socketIo);
    }

    public testSettings(){
        this.middleware();
        this.app.use('/api', route);
    }

    public getApp(){
        return this.app;
    }

}


// this.app.use(express.urlencoded({ extended: false }))
// this.app.use(express.json())
// this.app.use(cors())
// this.app.use('/doc', swaggerServe, swaggerSetup);
// this.app.use('/', express.static(path.join(__dirname, '../public')));
// this.app.use('/api', route)

export default Server;