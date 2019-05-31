import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbTabsComponent } from './tabs';
import { NbTabComponent } from './tab';
import { NbTabHeaderComponent } from './tab-header';
import { NbTabTitleDirective } from './tab-title.directive';
import { AttachDirective } from './attach.directive';
import { NbInkBarComponent } from './ink-bar';
import { NbButtonModule } from '../button/index';

const components = [
    NbTabsComponent,
    NbTabComponent,
    NbInkBarComponent,
    NbTabHeaderComponent,
    NbTabTitleDirective,
    AttachDirective
];

@NgModule({
    imports: [
        CommonModule,
        NbButtonModule
    ],
    declarations: [
        ...components
    ],
    exports: [
        ...components
    ]
})
export class NbTabsModule { }
