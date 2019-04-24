import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NbI18nService } from './i18n.service';

@Pipe({
    name: 'nbDate',
})
export class NbDatePipe implements PipeTransform {
    currentLocaleId: string;

    constructor(private nbI18nService: NbI18nService) {
        this.currentLocaleId = this.nbI18nService.getLocaleId();
    }

    transform(value: any, localeId: string = this.currentLocaleId, format: string = 'mediumDate'): any {
        const datePipe: DatePipe = new DatePipe(localeId);
        return datePipe.transform(value, format);
    }
}
