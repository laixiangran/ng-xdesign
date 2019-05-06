import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe, CurrencyPipe, PercentPipe, DecimalPipe } from '@angular/common';
import { NbI18nService } from './i18n.service';
import { NbI18nInterface } from './i18n.interface';

@Pipe({
    name: 'nbDate',
})
export class NbDatePipe implements PipeTransform {
    currentLocaleId: string;

    constructor(private nbI18nService: NbI18nService) {
        this.currentLocaleId = this.nbI18nService.getLocaleId();
    }

    transform(value: any, localeId: string = this.currentLocaleId, format: string = 'mediumDate'): string | null {
        const datePipe: DatePipe = new DatePipe(localeId);
        return datePipe.transform(value, format);
    }
}

@Pipe({
    name: 'nbCurrency',
})
export class NbCurrencyPipe implements PipeTransform {
    currentLocaleId: string;
    currentLocale: NbI18nInterface;

    constructor(private nbI18nService: NbI18nService) {
        this.currentLocaleId = this.nbI18nService.getLocaleId();
    }

    transform(value: any, localeId: string = this.currentLocaleId, currencyCode?: string,
        display?: 'code' | 'symbol' | 'symbol-narrow' | string, digitsInfo?: string): string | null {
            const currencyPipe: CurrencyPipe = new CurrencyPipe(localeId);
            return currencyPipe.transform(value, currencyCode, display, digitsInfo);
    }
}

@Pipe({
    name: 'nbDecimal',
})
export class NbDecimalPipe implements PipeTransform {
    currentLocaleId: string;
    currentLocale: NbI18nInterface;

    constructor(private nbI18nService: NbI18nService) {
        this.currentLocaleId = this.nbI18nService.getLocaleId();
    }

    transform(value: any, localeId: string = this.currentLocaleId, digitsInfo?: string): string | null {
            const decimalPipe: DecimalPipe = new DecimalPipe(localeId);
            return decimalPipe.transform(value, digitsInfo);
    }
}

@Pipe({
    name: 'nbPercent',
})
export class NbPercentPipe implements PipeTransform {
    currentLocaleId: string;
    currentLocale: NbI18nInterface;

    constructor(private nbI18nService: NbI18nService) {
        this.currentLocaleId = this.nbI18nService.getLocaleId();
    }

    transform(value: any, localeId: string = this.currentLocaleId, digitsInfo?: string): string | null {
            const percentPipe: PercentPipe = new PercentPipe(localeId);
            return percentPipe.transform(value, digitsInfo);
    }
}
