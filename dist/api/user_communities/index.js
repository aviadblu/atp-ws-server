/// <reference path="../../_all.d.ts" />
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_service_1 = require("../../services/pg.service");
class UserCommunities {
    constructor() {
        this.pgSvc = new pg_service_1.PgService();
    }
    getUserCommunities(userId, filterText) {
        return new Promise(resolve => {
            let sql = `SELECT 
                        communities.id AS communityId,
                        communities.name,
                        communities.logo,
                        communities.address,
                        communities.owner as community_owner,
                        user_community.id AS userCommunityId
                        FROM user_community
                        INNER JOIN communities ON user_community.community_id = communities.id
                        WHERE user_community.user_id=$1`;
            return this.pgSvc.query({ querySQL: sql, queryArgs: [userId] })
                .then(res => {
                let rows = res.rows.filter(r => r.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1);
                resolve({
                    count: res.rows.length,
                    data: rows.map(row => {
                        row.owner = row.community_owner == userId;
                        delete row.community_owner;
                        return row;
                    })
                });
            });
        });
    }
    getOneUserCommunity(userCommunityId) {
        return new Promise(resolve => {
            let sql = `SELECT 
                        communities.id AS communityId,
                        communities.name,
                        communities.logo,
                        communities.address,
                        communities.owner,
                        user_community.id AS userCommunityId
                        FROM user_community
                        INNER JOIN communities ON user_community.community_id = communities.id
                        WHERE user_community.id=$1`;
            return this.pgSvc.query({ querySQL: sql, queryArgs: [userCommunityId] })
                .then((res) => {
                resolve(res.rows);
            });
        });
    }
    insertNewUserCommunity(userId, payload) {
        const queryArgs = [
            userId,
            payload.communityId,
            new Date().getTime()
        ];
        let sql = `INSERT INTO user_community(
                    user_id, 
                    community_id, 
                    last_update)
                    VALUES ($1, $2, $3) RETURNING *;`;
        return this.pgSvc.query({ querySQL: sql, queryArgs: queryArgs });
    }
    deleteUserCommunity(userCommunityId) {
        let sql = `DELETE FROM user_community
                    WHERE id=$1 RETURNING *;`;
        return this.pgSvc.query({ querySQL: sql, queryArgs: [userCommunityId] });
    }
}
exports.UserCommunities = UserCommunities;
//# sourceMappingURL=index.js.map