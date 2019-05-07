import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbI18nService, NbI18nInterface } from '../../component/i18n';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
    selector: 'demo-i18n',
    templateUrl: './i18n.component.html',
    styleUrls: ['./i18n.component.less'],
})
export class I18nComponentDemo implements OnInit, OnDestroy {
    now = new Date();
    locale: NbI18nInterface = this.nbI18nService.getLocale();
    localeIds: string[];
    localeChangeSubscription: Subscription;

    constructor(public nbI18nService: NbI18nService) {
        this.localeIds = this.nbI18nService.getLocaleIds();

        // 监听语言的变化
        this.localeChangeSubscription = this.nbI18nService.localeChange.subscribe((locale: NbI18nInterface) => {
            this.locale = locale;
            console.log(this.locale.empty.description);
            console.log(this.nbI18nService.formatDate(Date.now()));
            console.log(this.nbI18nService.formatCurrency(10));
            console.log(this.nbI18nService.formatNumber(3.14));
            console.log(this.nbI18nService.formatPercent(0.259));
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.localeChangeSubscription.unsubscribe();
    }
}
