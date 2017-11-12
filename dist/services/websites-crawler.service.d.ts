export declare class WebsitesCrawlerService {
    private app;
    private queue;
    private websitesListLocal;
    private dirty;
    private waitnigChanges;
    constructor(app: any);
    listenToChanges(): void;
    private onWebsitesValueChanged(snapshot);
    private handleQueue();
    private crawlAndUpload(url);
    private updateDB();
}
