import { NgModule } from '@angular/core';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { NbDatePipe } from './i18n.pipe';
import localeZhhans from '@angular/common/locales/zh-Hans';
import localeZhHant from '@angular/common/locales/zh-Hant';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeZhhans);
registerLocaleData(localeZhHant);

@NgModule({
    imports: [
        TranslateModule.forRoot()
    ],
    declarations: [
        NbDatePipe
    ],
    exports: [
        TranslatePipe,
        NbDatePipe
    ]
})
export class I18nModule {
}
