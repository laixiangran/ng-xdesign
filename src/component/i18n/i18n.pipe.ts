import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe, CurrencyPipe, PercentPipe, DecimalPipe } from '@angular/common';
import { NbI18nService } from './i18n.service';
import { NbI18nInterface } from './i18n.interface';

@Pipe({
    name: 'nbDate',
})
export class NbDatePipe implements PipeTransform {

    constructor(private nbI18nService: NbI18nService) {
    }

    transform(value: any, localeId?: string, format?: string): string | null {
        return this.nbI18nService.formatDate(value, localeId, format);
    }
}

@Pipe({
    name: 'nbCurrency',
})
export class NbCurrencyPipe implements PipeTransform {

    constructor(private nbI18nService: NbI18nService) {
    }

    transform(value: any, localeId?: string, currency?: string, currencyCode?: string, digitsInfo?: string): string | null {
        return this.nbI18nService.formatCurrency(value, localeId, currency, currencyCode, digitsInfo);
    }
}

@Pipe({
    name: 'nbDecimal',
})
export class NbDecimalPipe implements PipeTransform {

    constructor(private nbI18nService: NbI18nService) {
    }

    transform(value: any, localeId?: string, digitsInfo?: string): string | null {
        return this.nbI18nService.formatNumber(value, localeId, digitsInfo);
    }
}

@Pipe({
    name: 'nbPercent',
})
export class NbPercentPipe implements PipeTransform {

    constructor(private nbI18nService: NbI18nService) {
    }

    transform(value: any, localeId?: string, digitsInfo?: string): string | null {
        return this.nbI18nService.formatPercent(value, localeId, digitsInfo);
    }
}
