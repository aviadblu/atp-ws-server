/// <reference path="../../../src/_all.d.ts" />
export declare class UserBook {
    private pgSvc;
    constructor();
    getUserBooks(userId: any, filterText: any): Promise<{}>;
    getOneUserBook(userBookId: any): Promise<{}>;
    insertNewUserBook(userId: any, payload: any): any;
    updateUserBook(userBookId: any, payload: any): any;
    deleteUserBook(userBookId: any): any;
}
