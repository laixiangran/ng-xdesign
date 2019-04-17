import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { I18nService } from './i18n.service';

@Injectable({
    providedIn: 'root'
})
@Pipe({
    name: 'nbDate'
})
export class NbDatePipe implements PipeTransform {
    currentLocaleId: string;

    constructor(private i18nService: I18nService) {
        this.currentLocaleId = this.i18nService.getCurrentLocaleId();
    }

    transform(value: any, localeId: string = this.currentLocaleId, format: string = 'mediumDate'): any {
        const datePipe: DatePipe = new DatePipe(localeId);
        return datePipe.transform(value, format);
    }
}
