import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, ButtonAnchorComponent } from './button';
import { ButtonConfig } from './button.config';

const components = [
    ButtonComponent,
    ButtonAnchorComponent
];

@NgModule({
    imports: [CommonModule],
    declarations: [...components],
    exports: [...components],
    providers: [ButtonConfig]
})
export class ButtonModule {
    static forRoot(): ModuleWithProviders {
        return { ngModule: ButtonModule, providers: [ButtonConfig] };
    }
}
