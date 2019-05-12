import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { <%= upperName %>Module } from '../../component/<%= name %>';
import { NbCodeBoxModule } from '../../component/code-box';
import { NbCodeHighlighterModule } from '../../component/code-highlighter';

import { <%= upperName %>Demo } from './<%= name %>';
import { <%= upperName %>BasicDemo } from './basic/<%= name %>-basic';

@NgModule({
    imports: [
        CommonModule,
        <%= upperName %>Module,
        NbCodeBoxModule,
        NbCodeHighlighterModule
    ],
    declarations: [
        <%= upperName %>Demo,
        <%= upperName %>BasicDemo
    ],
    providers: [],
    exports: []
})
export class <%= upperName %>DemoModule { }
