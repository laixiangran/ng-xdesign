import { Component } from '@angular/core';

@Component({
    selector: 'demo-uploader-image-progress-bar',
    templateUrl: './uploader-image-progress-bar.html',
    styleUrls: ['./uploader-image-progress-bar.less']
})
export class UploaderImageProgressBarDemo {

    uploadedFiles: any[] = [
        {
            url: 'https://www.baidu.com/img/bd_logo1.png',
            fileUid: 123456,
            name: 'bd_logo1.png',
            size: 7877,
            type: 'image/jpeg'
        },
        {
            url: 'http://nodejs.cn/static/images/logo.svg',
            fileUid: 234567,
            name: 'logo.svg',
            size: 5925,
            type: 'image/svg+xml'
        }
    ];

    onImageBarUpload(event) {
        const responseObject = JSON.parse(event.xhr.response);
        const file = event.file;
        file.url = responseObject.data.files[0].url;
    }
}
