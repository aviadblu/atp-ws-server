"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../_all.d.ts" />
const express = require("express");
const index_1 = require("./index");
const index_2 = require("../books/index");
const BooksAPI = new index_2.Books();
const UserBookAPI = new index_1.UserBook();
class Router {
    constructor() {
        this.router = express.Router();
        this.router.get('/:userId', (req, res) => {
            const filterText = req.query.filter || '';
            UserBookAPI.getUserBooks(req.params.userId, filterText)
                .then(response => {
                res.send(response['data']);
            }, err => {
                res.status(500).send({
                    message: err
                });
            });
        });
        this.router.post('/:userId', (req, res) => {
            UserBookAPI.insertNewUserBook(req.params.userId, req.body)
                .then(response => {
                res.send(response.rows[0]);
            }, err => {
                res.status(500).send({
                    message: err
                });
            });
        });
        this.router.get('/:userBookId/book', (req, res) => {
            UserBookAPI.getOneUserBook(req.params.userBookId)
                .then(response => {
                res.send(response);
            }, err => {
                res.status(500).send({
                    message: err
                });
            });
        });
        this.router.put('/:userBookId', (req, res) => {
            UserBookAPI.updateUserBook(req.params.userBookId, req.body)
                .then(response => {
                res.send(response.rows[0]);
            }, err => {
                res.status(500).send({
                    message: err
                });
            });
        });
        this.router.delete('/:userBookId', (req, res) => {
            UserBookAPI.deleteUserBook(req.params.userBookId)
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
    }
    getRouter() {
        return this.router;
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map