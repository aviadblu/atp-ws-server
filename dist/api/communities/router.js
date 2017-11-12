"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../_all.d.ts" />
const express = require("express");
const index_1 = require("./index");
let CommunitiesAPI = new index_1.Communities();
class Router {
    constructor() {
        this.router = express.Router();
        this.router.post('/', (req, res) => {
            CommunitiesAPI.createNewCommunity(req.body)
                .then((response) => {
                res.send(response);
            }, (err) => {
                res.status(500).send(err);
            });
        });
        this.router.put('/:communityId', (req, res) => {
            CommunitiesAPI.updateCommunity(req.params.communityId, req.body)
                .then((response) => {
                res.send(response);
            }, (err) => {
                res.status(500).send(err);
            });
        });
        this.router.get('/', (req, res) => {
            const filterText = req.query.filter || '';
            CommunitiesAPI.getCommunitiesList(filterText)
                .then((response) => {
                res.send(response);
            }, (err) => {
                res.status(500).send(err);
            });
        });
        this.router.delete('/:communityId', (req, res) => {
            CommunitiesAPI.deleteCommunity(req.params.communityId)
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