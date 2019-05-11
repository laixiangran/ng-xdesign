import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    ButtonModule,
    NbI18nModule,
    NB_I18N,
    NbI18nInterface,
} from '../component/public_api';
import { AppComponent } from './app.component';
import { appRoutes } from './app.router';
import { GuideComponentDemo } from './docs';
import { IconsComponentDemo } from './icons';
import { TypographyDemo } from './typography';
import { I18nComponentDemo } from './i18n';
import { ButtonDemoModule } from './button';
import { registerLocaleData } from '@angular/common';
import zh_hans from '@angular/common/locales/zh-Hans'; // 简体中文
import zh_hant_HK from '@angular/common/locales/zh-Hant-HK'; // 繁体中文（香港）
import fr_CA from '@angular/common/locales/fr-CA'; // 法语（加拿大）

registerLocaleData(zh_hans);
registerLocaleData(zh_hant_HK);
registerLocaleData(fr_CA);

const frCALocale: NbI18nInterface  = {
    localeId: 'fr-CA',
    global: {
      placeholder: 'Veuillez choisir',
    },
    empty: {
      description: 'Aucune donnée',
    },
};

@NgModule({
    declarations: [
        AppComponent,
        GuideComponentDemo,
        IconsComponentDemo,
        TypographyDemo,
        I18nComponentDemo,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule.forRoot(),
        NbI18nModule,
        RouterModule.forRoot(appRoutes, { useHash: true }),
        ButtonDemoModule,
    ],
    providers: [
        { provide: NB_I18N, useValue: frCALocale },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
