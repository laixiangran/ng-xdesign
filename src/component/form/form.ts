import {
    Component, ElementRef, Renderer2, Input,
    OnInit, ViewEncapsulation
} from '@angular/core';

@Component({
    selector: '[nb-form]',
    templateUrl: './form.html',
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-form'
    },
    exportAs: 'nbForm'
})
export class FormComponent implements OnInit {
    _el: HTMLElement;
    _prefixCls = 'nb-form';

    @Input() nbLayout: 'horizontal' | 'inline' = 'horizontal';

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
        this._el = this._elementRef.nativeElement;
    }

    ngOnInit() {
        this.setClassMap();
    }

    setClassMap(): void {
        this._renderer.addClass(this._el, `${this._prefixCls}-${this.nbLayout}`);
    }
}
