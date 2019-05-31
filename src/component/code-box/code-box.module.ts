import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCodeBoxComponent } from './code-box';

import { NbTabsModule } from '../tabs/index';
import { NbTooltipModule } from '../tooltip/index';
import { NbCodeHighlighterModule } from '../code-highlighter/index';

@NgModule({
    imports: [
        CommonModule,
        NbTabsModule,
        NbTooltipModule,
        NbCodeHighlighterModule
    ],
    declarations: [
        NbCodeBoxComponent
    ],
    exports: [
        NbCodeBoxComponent
    ]
})
export class NbCodeBoxModule { }
