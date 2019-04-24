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
        this.currentLocaleId = this.nbI18nService.getLocaleId();
        this.localeIds = this.nbI18nService.getLocaleIds();
        this.locale = this.nbI18nService.getLocale();
    }

    ngOnInit() {
    }

    setLocaleId(value: string) {
        this.nbI18nService.setLocaleId(value);
        this.currentLocaleId = this.nbI18nService.getLocaleId();
        this.locale = this.nbI18nService.getLocale();
    }
}
