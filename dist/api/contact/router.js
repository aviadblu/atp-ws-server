"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../_all.d.ts" />
const express = require("express");
const index_1 = require("./index");
let ContactAPI = new index_1.Contact();
class Router {
    constructor() {
        this.router = express.Router();
        this.router.post('/', (req, res) => {
            ContactAPI.sendMail(req.body)
                .then(() => {
                res.send();
            }, err => {
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