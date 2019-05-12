import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbNoAnimationDirective } from './nb-no-animation.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NbNoAnimationDirective
  ],
  exports: [
    NbNoAnimationDirective
  ],
})
export class NbNoAnimationModule {}
