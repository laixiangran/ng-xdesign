import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonComponent, NbButtonAnchorComponent } from './button';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NbButtonComponent,
        NbButtonAnchorComponent,
    ],
    exports: [
        NbButtonComponent,
        NbButtonAnchorComponent,
    ],
})
export class NbButtonModule { }
