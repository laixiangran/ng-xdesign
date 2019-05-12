import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


import { NbButtonModule } from '../component/button';

import { E2ERouterModule } from './e2e-route';

import { RootComponent } from './root-app/root-app';
import { NbButtonComponent } from './button/button-e2e';

const modules = [
    NbButtonModule
];

const components = [
    RootComponent,
    NbButtonComponent
];

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        E2ERouterModule,
        ...modules
    ],
    declarations: [
        ...components
    ],
    providers: [],
    bootstrap: [
        RootComponent
    ],
    exports: []
})
export class AppModule { }
