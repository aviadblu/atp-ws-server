/// <reference path="../../src/_all.d.ts" />
declare module Route {
    class Home {
        private router;
        constructor(app: any);
        getRouter(): any;
    }
}
export = Route;
