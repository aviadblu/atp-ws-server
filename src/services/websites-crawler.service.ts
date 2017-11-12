import * as webshot from 'webshot';
import * as cloudinary from 'cloudinary';
import * as fs from "fs";

cloudinary.config({
    cloud_name: 'db5v7kkij',
    api_key: '874821816721741',
    api_secret: 'sh4SDortqqGlpZZJ3ZllyxTBrNA'
});

export class WebsitesCrawlerService {
    private queue = [];
    private websitesListLocal;
    private dirty = false;
    private waitnigChanges = false;

    constructor(private app) {}

    listenToChanges() {
        this.app.firebaseSvc.fb.ref(`/websites`)
            .on('value', this.onWebsitesValueChanged.bind(this));
    }

    private onWebsitesValueChanged(snapshot) {
        if(this.dirty) {
            this.waitnigChanges = true;
            return;
        }

        let list = snapshot.val();
        if(!list) {
            list = [];
        }
        this.websitesListLocal = list;
        let index = 0;
        list.forEach(ws => {
            if(ws.thumbnail.indexOf('cloudinary') < 0) {
                this.queue.push({
                    index: index,
                    url: ws.url
                });
            }
            index++;
        });

        this.handleQueue();
    }

    private handleQueue() {
        if(this.queue.length > 0) {
            this.crawlAndUpload(this.queue[0].url)
                .then(thumbnailUrl => {
                    // todo update thumbnail
                    this.websitesListLocal[this.queue[0].index].thumbnail = thumbnailUrl;
                    this.queue.splice(0,1);
                })
                .then(this.handleQueue.bind(this))
                .catch(err => {
                    console.log('ERROR!!! ---- ', err);
                });

        } else if(this.dirty) {
            this.updateDB();
            this.dirty = false;
            if(this.waitnigChanges) {
                // todo: handle unhandled changes
                this.waitnigChanges = false;
            }
        }
    }

    private crawlAndUpload(url) {
        this.dirty = true;
        return new Promise((resolve, reject) => {
            const captureOptions = {
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'
            };

            let tmpImage = 'tmp/tmp-image.png';

            console.log('taking snapshot of ', url);

            webshot(url, tmpImage, captureOptions, function(err) {
                console.log('snapshot upload to cloudinary');
                if(err) {
                    reject(err);
                } else {
                    cloudinary.uploader.upload(tmpImage, function (result) {
                        console.log('upload to cloudinary completed!');
                        fs.unlinkSync(tmpImage);
                        resolve(result.url);
                    });
                }
            });
        });
    }

    private updateDB() {
        this.app.firebaseSvc.fb.ref(`/websites`).set(this.websitesListLocal);
    }

}