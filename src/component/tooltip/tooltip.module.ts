import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbTooltipDirective } from './tooltip';
import { NbTiplayerComponent } from './tiplayer';
import { NbOverlayModule } from '../overlay/index';

@NgModule({
    imports: [CommonModule, NbOverlayModule],
    declarations: [NbTooltipDirective, NbTiplayerComponent],
    exports: [NbTooltipDirective, NbTiplayerComponent],
    entryComponents: [NbTiplayerComponent]
})
export class NbTooltipModule { }
