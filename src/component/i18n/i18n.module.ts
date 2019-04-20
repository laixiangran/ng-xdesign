import { NgModule } from '@angular/core';
import { NbDatePipe } from './i18n.pipe';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
    imports: [
        TranslateModule
    ],
    declarations: [
        NbDatePipe
    ],
    exports: [
        NbDatePipe,
        TranslatePipe
    ]
})
export class I18nModule {
}
