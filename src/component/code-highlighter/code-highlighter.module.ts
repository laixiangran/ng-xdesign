import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbCodeHighlighterComponent } from './code-highlighter';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    NbCodeHighlighterComponent,
  ],
  exports: [
    NbCodeHighlighterComponent,
  ],
})
export class NbCodeHighlighterModule { }
