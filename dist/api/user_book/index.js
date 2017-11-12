/// <reference path="../../_all.d.ts" />
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_service_1 = require("../../services/pg.service");
class UserBook {
    constructor() {
        this.pgSvc = new pg_service_1.PgService();
    }
    /*
      id: 1,
      name: "some name 1",
      author: "some author 1",
      picture: "http://someurl.net",
      bookUserId: 2,
      rating: 6,
      review: "some review"
     */
    getUserBooks(userId, filterText) {
        return new Promise(resolve => {
            let sql = `SELECT 
                        books.id AS bookId,
                        books.name,
                        books.author,
                        books.cover_url as picture,
                        books.pending,
                        user_book.id AS bookUserId,
                        user_book.rating, 
                        user_book.review,
                        user_book.ready_for_swap
                        FROM user_book
                        INNER JOIN books ON user_book.book_id = books.id
                        WHERE user_book.user_id=$1`;
            return this.pgSvc.query({ querySQL: sql, queryArgs: [userId] })
                .then(res => {
                let rows = res.rows.filter(r => (r.name + r.author).indexOf(filterText) > -1);
                resolve({
                    count: res.rows.length,
                    data: rows
                });
            });
        });
    }
    getOneUserBook(userBookId) {
        return new Promise(resolve => {
            let sql = `SELECT 
                        books.id AS bookId,
                        books.name,
                        books.author,
                        books.cover_url,
                        books.pending,
                        user_book.id AS bookUserId,
                        user_book.rating, 
                        user_book.review,
                        user_book.ready_for_swap
                        FROM user_book
                        INNER JOIN books ON user_book.book_id = books.id
                        WHERE user_book.id = $1`;
            let self = this;
            return this.pgSvc.query({ querySQL: sql, queryArgs: [userBookId] })
                .then((res) => {
                resolve(res.rows);
            });
        });
    }
    insertNewUserBook(userId, payload) {
        const queryArgs = [
            userId,
            payload.bookId,
            payload.rating,
            new Date().getTime(),
            payload.review,
            payload.ready_for_swap
        ];
        let sql = `INSERT INTO user_book(
                    user_id, 
                    book_id, 
                    rating, 
                    last_update,
                    review,
                    ready_for_swap)
                    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
        return this.pgSvc.query({ querySQL: sql, queryArgs: queryArgs });
    }
    updateUserBook(userBookId, payload) {
        const queryArgs = [
            payload.rating,
            new Date().getTime(),
            payload.review,
            payload.ready_for_swap,
            userBookId
        ];
        let sql = `UPDATE user_book SET
                    rating = $1, 
                    last_update = $2,
                    review = $3,
                    ready_for_swap = $4
                    WHERE id=$5 RETURNING *;`;
        return this.pgSvc.query({ querySQL: sql, queryArgs: queryArgs });
    }
    deleteUserBook(userBookId) {
        let sql = `DELETE FROM user_book
                    WHERE id=$1 RETURNING *;`;
        return this.pgSvc.query({ querySQL: sql, queryArgs: [userBookId] });
    }
}
exports.UserBook = UserBook;
//# sourceMappingURL=index.js.map