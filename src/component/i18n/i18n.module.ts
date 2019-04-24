import { NgModule } from '@angular/core';
import { NbDatePipe } from './i18n.pipe';

@NgModule({
    declarations: [
        NbDatePipe,
    ],
    exports: [
        NbDatePipe,
    ],
    providers: [
        NbDatePipe,
    ],
})
export class NbI18nModule {
}
