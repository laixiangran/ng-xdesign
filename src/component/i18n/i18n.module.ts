import { NgModule } from '@angular/core';
import { NbDatePipe, NbCurrencyPipe, NbPercentPipe, NbDecimalPipe } from './i18n.pipe';

@NgModule({
    declarations: [
        NbDatePipe,
        NbCurrencyPipe,
        NbDecimalPipe,
        NbPercentPipe,
    ],
    exports: [
        NbDatePipe,
        NbCurrencyPipe,
        NbDecimalPipe,
        NbPercentPipe,
    ]
})
export class NbI18nModule {
}
