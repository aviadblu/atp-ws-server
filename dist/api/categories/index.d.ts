/// <reference path="../../../src/_all.d.ts" />
export declare class Categories {
    private pgSvc;
    constructor();
    getCategoriesList(): Promise<{}>;
    createNewCategory(categoryData: any): any;
    updateCategory(categoryId: any, categoryData: any): any;
    deleteCategory(categoryId: any): Promise<{}>;
    private updateCategoryInternal(categoryId, queryArgs);
    private insertCategory(queryArgs);
}
