/// <reference path="../../_all.d.ts" />
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'db5v7kkij',
    api_key: '874821816721741',
    api_secret: 'sh4SDortqqGlpZZJ3ZllyxTBrNA'
});
class General {
    constructor() {
    }
    uploadToCloudinary(url) {
        return new Promise((resolve, reject) => {
            if (!url) {
                resolve('');
            }
            else if (url.indexOf('cloudinary') > -1) {
                resolve(url);
            }
            else {
                cloudinary.uploader.upload(url, function (result) {
                    resolve(result.url);
                });
            }
        });
    }
    removeFromCloudinary(url) {
        return new Promise((resolve) => {
            if (url.indexOf('cloudinary') > -1) {
                const imageId = url.split('/').pop().split('.')[0];
                console.log(`removing image ${imageId} from cloudinary`);
                cloudinary.uploader.destroy(imageId, () => {
                    resolve();
                });
            }
            else {
                resolve();
            }
        });
    }
}
exports.General = General;
//# sourceMappingURL=index.js.map