"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../_all.d.ts" />
const express = require("express");
const index_1 = require("./index");
let BooksAPI = new index_1.Books();
class Router {
    constructor() {
        this.router = express.Router();
        // profile page API's
        this.router.get('/booksListNames', (req, res) => {
            const filterText = req.query.filter || '';
            BooksAPI.getBooksListNames(filterText)
                .then((data) => {
                res.send(data);
            });
        });
        this.router.post('/', (req, res) => {
            BooksAPI.createNewBook(req.body)
                .then((response) => {
                res.send(response);
            }, (err) => {
                res.status(500).send(err);
            });
        });
        this.router.put('/:bookId', (req, res) => {
            BooksAPI.updateBook(req.params.bookId, req.body)
                .then((response) => {
                res.send(response);
            }, (err) => {
                res.status(500).send(err);
            });
        });
        this.router.get('/', (req, res) => {
            BooksAPI.getBooksList()
                .then((response) => {
                res.send(response);
            }, (err) => {
                res.status(500).send(err);
            });
        });
        this.router.get('/:bookId', (req, res) => {
            BooksAPI.getOneBook(req.params.bookId)
                .then((response) => {
                res.send(response);
            }, (err) => {
                res.status(500).send(err);
            });
        });
        this.router.delete('/:bookId', (req, res) => {
            BooksAPI.deleteBook(req.params.bookId)
                .then((response) => {
                res.send(response);
            }, (err) => {
                res.status(500).send(err);
            });
        });
        this.router.get('/search', (req, res) => {
            res.send(`<html>
                        <head>
                            <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
                        </head>
                        <body ng-app="myApp" ng-controller="mainCtrl">
                        <div>
                            <input ng-model="name" placeholder="Book name">
                            <input ng-model="author" placeholder="Author">
                            <button ng-click="search()">Search</button>
                        </div>
                        <script>
                            var myApp = angular.module('myApp', []);
                            myApp.controller('mainCtrl', ['$scope', '$http', function ($scope, $http) {
                                $scope.search = function() {
                                  console.log($scope.name);
                                  console.log($scope.author);
                                  
                                  $http.post('/api/books/q', {
                                      name: $scope.name,
                                      author: $scope.author
                                  }).then(function(res) {
                                      console.log(res);
                                  });
                                };
                            }]);
                        </script>
                        </body>
                        </html>
                        `);
        });
        this.router.get('/searchOnline', (req, res) => {
            BooksAPI.searchOnline(req.query)
                .then((response) => {
                res.send(response);
            }, (err) => {
                res.status(500).send(err);
            });
        });
        this.router.post('/q', (req, res) => {
            BooksAPI.searchBook(req)
                .then((response) => {
                res.send(response);
            }, (err) => {
                res.status(500).send(err);
            });
        });
        this.router.get('/uploadBooks', (req, res) => {
            res.send();
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map