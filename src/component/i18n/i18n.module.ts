import { NgModule } from '@angular/core';
import { NbDatePipe } from './i18n.pipe';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { I18nService } from './i18n.service';

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
    constructor(private i18nService: I18nService) {}
}
