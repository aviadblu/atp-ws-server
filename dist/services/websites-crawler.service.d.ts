export declare class WebsitesCrawlerService {
    private app;
    private queue;
    private jobsInprocess;
    private websitesListLocal;
    constructor(app: any);
    listenToChanges(): void;
    private listToArray(list);
    private onWebsitesValueChanged(snapshot);
    private handleQueue();
    private processJob(job);
    private crawlAndUpload(url);
    static hashString(string: any): string | Int32Array;
}
