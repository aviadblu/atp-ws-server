/// <reference path="../../_all.d.ts" />
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_service_1 = require("../../services/pg.service");
class Communities {
    constructor() {
        this.pgSvc = new pg_service_1.PgService();
    }
    getCommunitiesList(filterText) {
        return new Promise(resolve => {
            const sql = `SELECT id, name, logo, owner, address FROM communities`;
            console.log(sql);
            this.pgSvc.query({ querySQL: sql, queryArgs: [] })
                .then(res => {
                let rows = res.rows.filter(r => r.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1);
                resolve({
                    count: rows.length,
                    data: rows
                });
            }, err => {
                console.log(err);
            });
        });
    }
    createNewCommunity(payload) {
        let self = this;
        let queryArgs = [
            payload.name,
            payload.logo,
            payload.owner,
            payload.address || {}
        ];
        return self.insertCommunity(queryArgs)
            .then((response) => {
            return response.rows[0];
        });
    }
    updateCommunity(communityId, payload) {
        let self = this;
        let queryArgs = [
            payload.name,
            payload.logo,
            payload.owner,
            payload.address || {}
        ];
        console.log(queryArgs);
        return self.updateCommunityInternal(communityId, queryArgs)
            .then((response) => {
            return response.rows[0];
        });
    }
    deleteCommunity(communityId) {
        let self = this;
        return new Promise((resolve) => {
            let sql = `DELETE FROM communities WHERE id=$1`;
            self.pgSvc.query({ querySQL: sql, queryArgs: [communityId] }).then((response) => {
                resolve(response);
            });
        });
    }
    updateCommunityInternal(communityId, queryArgs) {
        let self = this;
        queryArgs.push(communityId);
        let sql = `UPDATE communities SET
                    name = $1,
                    logo = $2,
                    owner = $3,
                    address = $4
                    WHERE id = $5
                    RETURNING *;`;
        return self.pgSvc.query({ querySQL: sql, queryArgs: queryArgs });
    }
    insertCommunity(queryArgs) {
        let self = this;
        let sql = `INSERT INTO communities (
                    name,
                    logo,
                    owner,
                    address
                    )
                    VALUES ($1, $2, $3, $4) RETURNING *;`;
        return self.pgSvc.query({ querySQL: sql, queryArgs: queryArgs });
    }
}
exports.Communities = Communities;
//# sourceMappingURL=index.js.map