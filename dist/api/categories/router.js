"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../_all.d.ts" />
const express = require("express");
const index_1 = require("./index");
let CategoriesAPI = new index_1.Categories();
class Router {
    constructor() {
        this.router = express.Router();
        this.router.post('/', (req, res) => {
            CategoriesAPI.createNewCategory(req.body)
                .then((response) => {
                res.send(response);
            }, (err) => {
                res.status(500).send(err);
            });
        });
        this.router.put('/:categoryId', (req, res) => {
            CategoriesAPI.updateCategory(req.params.categoryId, req.body)
                .then((response) => {
                res.send(response);
            }, (err) => {
                res.status(500).send(err);
            });
        });
        this.router.get('/', (req, res) => {
            CategoriesAPI.getCategoriesList()
                .then((response) => {
                res.send(response);
            }, (err) => {
                res.status(500).send(err);
            });
        });
        this.router.delete('/:categoryId', (req, res) => {
            CategoriesAPI.deleteCategory(req.params.categoryId)
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