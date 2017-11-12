"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../_all.d.ts" />
const express = require("express");
const index_1 = require("./index");
let GeneralAPI = new index_1.General();
class Router {
    constructor() {
        this.router = express.Router();
        this.router.post('/uploadToCloudinary', (req, res) => {
            GeneralAPI.uploadToCloudinary(req.body.url)
                .then((response) => {
                res.send(response);
            }, (err) => {
                res.status(500).send(err);
            });
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map