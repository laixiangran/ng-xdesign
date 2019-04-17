import { Component, OnInit } from '@angular/core';
import { I18nService } from '../../component/i18n';
import { NbDatePipe } from '../../component/i18n/i18n.pipe';

@Component({
    selector: 'demo-i18n',
    templateUrl: './i18n.component.html',
    styleUrls: ['./i18n.component.less']
})
export class I18nComponentDemo implements OnInit {
    now = new Date();
    currentLocaleId: string;
    localeIds: string[];

    constructor(public i18nService: I18nService, public nbDatePipe: NbDatePipe) {
        this.currentLocaleId = this.i18nService.getCurrentLocaleId();
        this.localeIds = this.i18nService.getLocaleIds();
    }

    ngOnInit() {
    }

    setLocaleId(value: string) {
        this.i18nService.setLocaleId(value);
        this.currentLocaleId = this.i18nService.getCurrentLocaleId();
    }
}
