import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NbNoAnimationDirective } from './nb-no-animation.directive';

@NgModule({
  declarations: [NbNoAnimationDirective],
  exports: [NbNoAnimationDirective],
  imports: [CommonModule]
})
export class NbNoAnimationModule {}
