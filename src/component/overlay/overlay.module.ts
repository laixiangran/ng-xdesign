import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbOverlayComponent } from './overlay';
import { ViewportRuler } from './scroll-strategy';
import { NbOverlayPositionService } from './overlay-position.service';
import { NbOverlayOriginDirective } from './overlay-origin.directive';
import { OverlayPositionBuilder } from './overlay-position-builder';
import { DynamicComponentService } from './dynamic-component.service';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        NbOverlayComponent,
        NbOverlayOriginDirective,
    ],
    exports: [
        NbOverlayComponent,
        NbOverlayOriginDirective,
    ],
    providers: [
        ViewportRuler,
        NbOverlayPositionService,
        DynamicComponentService,
        OverlayPositionBuilder,
    ]
})
export class NbOverlayModule { }
