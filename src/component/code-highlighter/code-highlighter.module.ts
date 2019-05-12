import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCodeHighlighterComponent } from './code-highlighter';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NbCodeHighlighterComponent
    ],
    exports: [
        NbCodeHighlighterComponent
    ]
})
export class NbCodeHighlighterModule { }
