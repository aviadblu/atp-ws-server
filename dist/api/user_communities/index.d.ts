/// <reference path="../../../src/_all.d.ts" />
export declare class UserCommunities {
    private pgSvc;
    constructor();
    getUserCommunities(userId: any, filterText: any): Promise<{}>;
    getOneUserCommunity(userCommunityId: any): Promise<{}>;
    insertNewUserCommunity(userId: any, payload: any): any;
    deleteUserCommunity(userCommunityId: any): any;
}
