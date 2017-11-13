import * as webshot from 'webshot';
import * as cloudinary from 'cloudinary';
import * as fs from "fs";
import {Md5} from 'ts-md5/dist/md5';

cloudinary.config({
    cloud_name: 'db5v7kkij',
    api_key: '874821816721741',
    api_secret: 'sh4SDortqqGlpZZJ3ZllyxTBrNA'
});

export class WebsitesCrawlerService {
    private queue = [];
    private jobsInprocess = {};
    private websitesListLocal;

    constructor(private app) {
    }

    listenToChanges() {
        this.app.firebaseSvc.fb.ref(`/websites`)
            .on('value', this.onWebsitesValueChanged.bind(this));
    }

    private listToArray(list) {
        let arr = [];
        Object.keys(list).forEach(ws => {
            arr.push(list[ws]);
        });
        return arr;
    }

    private onWebsitesValueChanged(snapshot) {
        this.websitesListLocal = snapshot.val() || {};
        let list = this.listToArray(this.websitesListLocal);
        if (!list) {
            list = [];
        }
        list.forEach(ws => {
            if (ws.thumbnail.indexOf('cloudinary') < 0 && !this.jobsInprocess[ws.id]) {
                this.queue.push({
                    id: ws.id,
                    url: ws.url
                });
            }
        });
        this.handleQueue();
    }

    private handleQueue() {
        if (this.queue.length > 0) {
            this.jobsInprocess[this.queue[0].id] = 1;
            this.processJob({
                url: this.queue[0].url,
                ws_id: this.queue[0].id
            });
            this.queue.splice(0, 1);
        }
    }


    private processJob(job) {
        this.crawlAndUpload(job.url)
            .then(thumbnailUrl => {
                let data = {
                    thumbnail: thumbnailUrl
                };
                this.app.firebaseSvc.fb.ref(`/websites`).child(job.ws_id).update(data);
                delete this.jobsInprocess[job.ws_id];
            })
            .then(this.handleQueue.bind(this))
            .catch(err => {
                console.log('ERROR!!! ---- ', err);
            });
    }

    private crawlAndUpload(url) {
        return new Promise((resolve, reject) => {
            const captureOptions = {
                renderDelay: 2000,
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'
            };

            const now = new Date().getTime();
            let tmpImage = 'tmp/' + now + '.png';

            console.log('taking snapshot of ', url);

            webshot(url, tmpImage, captureOptions, function (err) {
                console.log('uploading snapshot to cloudinary', WebsitesCrawlerService.hashString(url));
                if (err) {
                    reject(err);
                } else {
                    cloudinary.v2.uploader.upload(tmpImage, {public_id: "webshot/" + WebsitesCrawlerService.hashString(url)}, function (error, result) {
                        console.log('upload to cloudinary completed!');
                        fs.unlinkSync(tmpImage);
                        resolve(result.url.replace('/upload/', '/upload/c_fill,h_120,w_160/'));
                    });
                }
            });
        });
    }

    public static hashString(string) {
        return Md5.hashStr(string);
    }

}