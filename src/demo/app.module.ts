import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localeZhHans from '@angular/common/locales/zh-Hans';
import localeZhHant from '@angular/common/locales/zh-Hant';

import {
    I18nModule
} from '../component';

import { AppComponent } from './app.component';
import { appRoutes } from './app.router';

import { GuideComponentDemo } from './docs';
import { IconsComponentDemo } from './icons';
import { TypographyDemo } from './typography';
import { I18nComponentDemo } from './i18n';
import { TranslateModule } from '@ngx-translate/core';

registerLocaleData(localeZhHans);
registerLocaleData(localeZhHant);

@NgModule({
    declarations: [
        AppComponent,
        GuideComponentDemo,
        IconsComponentDemo,
        TypographyDemo,
        I18nComponentDemo
    ],
    imports: [
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        I18nModule,
        RouterModule.forRoot(appRoutes, { useHash: true }),
        TranslateModule.forRoot()
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'zh-Hans' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
