/// <reference path="../../_all.d.ts" />
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_service_1 = require("../../services/pg.service");
class Categories {
    constructor() {
        this.pgSvc = new pg_service_1.PgService();
    }
    getCategoriesList() {
        let self = this;
        let sql = `SELECT * FROM categories ORDER BY id ASC`;
        return new Promise((resolve) => {
            self.pgSvc.query({ querySQL: sql, queryArgs: [] })
                .then((res) => {
                resolve(res.rows);
            });
        });
    }
    createNewCategory(categoryData) {
        let self = this;
        let queryArgs = [
            categoryData.name
        ];
        return self.insertCategory(queryArgs)
            .then((response) => {
            return response.rows[0];
        });
    }
    updateCategory(categoryId, categoryData) {
        let self = this;
        let queryArgs = [
            categoryData.name
        ];
        return self.updateCategoryInternal(categoryId, queryArgs)
            .then((response) => {
            return response.rows[0];
        });
    }
    deleteCategory(categoryId) {
        let self = this;
        return new Promise((resolve) => {
            let sql = `DELETE FROM categories WHERE id=$1`;
            self.pgSvc.query({ querySQL: sql, queryArgs: [categoryId] }).then((response) => {
                resolve(response);
            });
        });
    }
    updateCategoryInternal(categoryId, queryArgs) {
        let self = this;
        queryArgs.push(categoryId);
        let sql = `UPDATE categories SET
                    name = $1
                    WHERE id = $2
                    RETURNING *;`;
        return self.pgSvc.query({ querySQL: sql, queryArgs: queryArgs });
    }
    insertCategory(queryArgs) {
        let self = this;
        let sql = `INSERT INTO categories (
                    name
                    )
                    VALUES ($1) RETURNING *;`;
        return self.pgSvc.query({ querySQL: sql, queryArgs: queryArgs });
    }
}
exports.Categories = Categories;
//# sourceMappingURL=index.js.map