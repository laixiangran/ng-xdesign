import { coerceElement } from '@angular/cdk/coercion';
import { AfterViewInit, Directive, ElementRef, Inject, Input, OnChanges, Optional, Renderer2 } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { InputBoolean } from '../util/convert';

// 待禁止动画class名
const DISABLED_CLASSNAME = '[key: string]';

@Directive({
  selector: '[nbNoAnimation]',
  exportAs: 'nbNoAnimation',
  host: {
    '[@.disabled]': 'nzNoAnimation'
  }
})
export class NbNoAnimationDirective implements OnChanges, AfterViewInit {
  @Input() @InputBoolean() nbNoAnimation: boolean = false;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) private animationType: string
  ) {}

  ngOnChanges(): void {
    this.updateClass();
  }

  ngAfterViewInit(): void {
    this.updateClass();
  }

  private updateClass(): void {
    const element = coerceElement(this.element);
    if (!element) {
      return;
    }
    if (this.nbNoAnimation || this.animationType === 'NoopAnimations') {
      this.renderer.addClass(element, DISABLED_CLASSNAME);
    } else {
      this.renderer.removeClass(element, DISABLED_CLASSNAME);
    }
  }
}
