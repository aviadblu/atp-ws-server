export declare class WebsitesCrawlerService {
    private app;
    private queue;
    private websitesListLocal;
    constructor(app: any);
    listenToChanges(): void;
    private listToArray(list);
    private onWebsitesValueChanged(snapshot);
    private handleQueue();
    private crawlAndUpload(url);
    static hashString(string: any): string | Int32Array;
}
