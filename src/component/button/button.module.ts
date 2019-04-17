import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, ButtonAnchorComponent } from './button';

const components = [
    ButtonComponent,
    ButtonAnchorComponent
];

@NgModule({
    imports: [CommonModule],
    declarations: [...components],
    exports: [...components]
})
export class ButtonModule {
}
