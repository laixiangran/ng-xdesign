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
} from '../component';
import { AppComponent } from './app.component';
import { appRoutes } from './app.router';
import { GuideComponentDemo } from './docs';
import { IconsComponentDemo } from './icons';
import { TypographyDemo } from './typography';
import { I18nComponentDemo } from './i18n';
import { ButtonDemoModule } from './button';
import { registerLocaleData } from '@angular/common';
import zh_hans from '@angular/common/locales/zh-Hans';
import zh_hant from '@angular/common/locales/zh-Hant';
import fr_BE from '@angular/common/locales/fr-BE';

registerLocaleData(zh_hans);
registerLocaleData(zh_hant);
registerLocaleData(fr_BE);

const frLocale: NbI18nInterface  = {
    localeId: 'fr-BE',
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
        { provide: NB_I18N, useValue: frLocale },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
