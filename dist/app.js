"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const Router = require("./routes/index");
const websites_crawler_service_1 = require("./services/websites-crawler.service");
const firebase_service_1 = require("./services/firebase.service");
// todo split for production
const dev_1 = require("./env/dev");
const production_1 = require("./env/production");
let envConf = dev_1.devConf;
if (process.env.NODE_ENV && process.env.NODE_ENV !== 'dev') {
    envConf = production_1.prodConf;
}
/**
 * The server.
 *
 * @class Server
 */
class Server {
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    static bootstrap() {
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
    config() {
        this.app.use(morgan(envConf.logger));
    }
    routes() {
        //get router
        let router;
        router = express.Router();
        this.app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
        this.app.use(bodyParser.json()); // parse application/json
        this.app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
        this.app.use("/", new Router.Home(this.app).getRouter());
        //use router middleware
        this.app.use(router);
    }
    initServices() {
        this.firebaseSvc = new firebase_service_1.FirebaseService(this);
        this.crawlingSvc = new websites_crawler_service_1.WebsitesCrawlerService(this);
        this.crawlingSvc.listenToChanges();
    }
}
let server = Server.bootstrap();
server.app.listen(envConf.port, function () {
    console.log(`App listening on port ${envConf.port}`);
});
//# sourceMappingURL=app.js.map