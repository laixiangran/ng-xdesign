import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, ButtonAnchorComponent } from './button';
import { I18nModule } from '../i18n';

const components = [
    ButtonComponent,
    ButtonAnchorComponent
];

@NgModule({
    imports: [CommonModule, I18nModule],
    declarations: [...components],
    exports: [...components]
})
export class ButtonModule {
    constructor() {
    }
}
