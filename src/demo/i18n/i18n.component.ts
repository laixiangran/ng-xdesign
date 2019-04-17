import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-i18n',
    templateUrl: './i18n.component.html',
    styleUrls: ['./i18n.component.less']
})
export class I18nComponentDemo implements OnInit {
    now = new Date();

    constructor() {
    }

    ngOnInit() {

    }
}
