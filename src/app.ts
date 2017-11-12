"use strict";

import * as express from "express";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as Router from "./routes/index";
import {WebsitesCrawlerService} from './services/websites-crawler.service';
import {FirebaseService} from './services/firebase.service';

// todo split for production
import {devConf} from './env/dev';
import {prodConf} from './env/production';

let envConf = devConf;
if (process.env.NODE_ENV && process.env.NODE_ENV !== 'dev') {
    envConf = prodConf;
}

/**
 * The server.
 *
 * @class Server
 */
class Server {

    public app: express.Application;
    private firebaseSvc;
    private crawlingSvc;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        // init services
        this.initServices();

        //create expressjs application
        this.app = express();

        //configure application
        this.config();

        //configure routes
        this.routes();
    }

    private config() {
        this.app.use(morgan(envConf.logger));
    }

    private routes() {
        //get router
        let router: express.Router;
        router = express.Router();

        this.app.use(bodyParser.urlencoded({ extended: false })); 			// parse application/x-www-form-urlencoded
        this.app.use(bodyParser.json()); 									// parse application/json
        this.app.use(bodyParser.json({type: 'application/vnd.api+json'}));

        this.app.use("/", new Router.Home(this.app).getRouter());

        //use router middleware
        this.app.use(router);
    }

    private initServices() {
        this.firebaseSvc = new FirebaseService(this);
        this.crawlingSvc = new WebsitesCrawlerService(this);
        this.crawlingSvc.listenToChanges();
    }
}

let server = Server.bootstrap();
server.app.listen(envConf.port, function () {
    console.log(`App listening on port ${envConf.port}`)
});