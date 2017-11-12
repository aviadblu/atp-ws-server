"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../_all.d.ts" />
const express = require("express");
const index_1 = require("./index");
const UserCommunitiesAPI = new index_1.UserCommunities();
class Router {
    constructor() {
        this.router = express.Router();
        this.router.get('/:userId', (req, res) => {
            const filterText = req.query.filter || '';
            UserCommunitiesAPI.getUserCommunities(req.params.userId, filterText)
                .then(response => {
                res.send(response['data']);
            }, err => {
                res.status(500).send({
                    message: err
                });
            });
        });
        this.router.post('/:userId', (req, res) => {
            UserCommunitiesAPI.insertNewUserCommunity(req.params.userId, req.body)
                .then(response => {
                res.send(response.rows[0]);
            }, err => {
                res.status(500).send({
                    message: err
                });
            });
        });
        this.router.delete('/:userCommunityId', (req, res) => {
            UserCommunitiesAPI.deleteUserCommunity(req.params.userCommunityId)
                .then(response => {
                res.send({
                    message: "deleted successfully"
                });
            }, err => {
                res.status(500).send({
                    message: err
                });
            });
        });
        this.router.get('/:userCommunityId/community', (req, res) => {
            UserCommunitiesAPI.getOneUserCommunity(req.params.userCommunityId)
                .then(response => {
                res.send(response);
            }, err => {
                res.status(500).send({
                    message: err
                });
            });
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map