import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NbButtonModule } from '../../component/button';
import { NbCodeBoxModule } from '../../component/code-box';
import { NbCodeHighlighterModule } from '../../component/code-highlighter';

import { ButtonDemo } from './button';
import { ButtonThemeDemo } from './themes/button-theme';
import { ButtonSizeDemo } from './size/button-size';
import { ButtonLinkDemo } from './link/button-link';
import { ButtonIconDemo } from './icon/button-icon';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NbButtonModule,
        NbCodeBoxModule,
        NbCodeHighlighterModule
    ],
    declarations: [
        ButtonDemo,
        ButtonThemeDemo,
        ButtonSizeDemo,
        ButtonLinkDemo,
        ButtonIconDemo
    ],
    providers: [],
    exports: []
})
export class ButtonDemoModule { }
