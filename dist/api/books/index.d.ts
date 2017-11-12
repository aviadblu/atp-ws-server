/// <reference path="../../../src/_all.d.ts" />
export declare class Books {
    private pgSvc;
    constructor();
    getBooksList(): Promise<{}>;
    getOneBook(id: any): Promise<{}>;
    createNewBook(bookData: any): Promise<any>;
    updateBook(bookId: any, bookData: any): Promise<any>;
    deleteBook(bookId: any): Promise<{}>;
    private uploadCover(coverUrl);
    private removeImageCloudinary(coverUrl);
    private updateBookInternal(bookId, queryArgs);
    private insertBook(queryArgs);
    searchBook(request: any): Promise<{}>;
    searchOnline(query: any): Promise<{}>;
    getBooksListNames(filterText: any): Promise<{}>;
}
