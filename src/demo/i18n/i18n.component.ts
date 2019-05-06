import { Component, OnInit } from '@angular/core';
import { NbI18nService, NbI18nInterface, NbDatePipe } from '../../component/i18n';

@Component({
    selector: 'demo-i18n',
    templateUrl: './i18n.component.html',
    styleUrls: ['./i18n.component.less'],
})
export class I18nComponentDemo implements OnInit {
    now = new Date();
    currentLocaleId: string;
    localeIds: string[];
    locale: NbI18nInterface;

    constructor(public nbI18nService: NbI18nService, public nbDatePipe: NbDatePipe) {
        this.localeIds = this.nbI18nService.getLocaleIds();
        this.initLocale();
        this.nbI18nService.localeChange.subscribe(() => {
            this.initLocale();
        });
    }

    ngOnInit() {
    }

    initLocale() {
        this.currentLocaleId = this.nbI18nService.getLocaleId();
        this.locale = this.nbI18nService.getLocale();
    }
}
