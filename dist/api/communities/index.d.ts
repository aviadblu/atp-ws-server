/// <reference path="../../../src/_all.d.ts" />
export declare class Communities {
    private pgSvc;
    constructor();
    getCommunitiesList(filterText: any): Promise<{}>;
    createNewCommunity(payload: any): any;
    updateCommunity(communityId: any, payload: any): any;
    deleteCommunity(communityId: any): Promise<{}>;
    private updateCommunityInternal(communityId, queryArgs);
    private insertCommunity(queryArgs);
}
