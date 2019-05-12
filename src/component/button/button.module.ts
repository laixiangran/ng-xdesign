import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonComponent, NbButtonAnchorComponent } from './button';

const components = [
    NbButtonComponent,
    NbButtonAnchorComponent,
];

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ...components
    ],
    exports: [
        ...components
    ]
})
export class NbButtonModule {}
