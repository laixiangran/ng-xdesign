import { Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NbFormItemComponent } from './nb-form-item.component';

@Component({
    selector: '[nb-form-explain]',
    encapsulation: ViewEncapsulation.None,
    template: `
        <ng-content></ng-content>
    `
})

export class NbFormExplainComponent implements OnDestroy, OnInit {
    @HostBinding(`class.nb-form-explain`) _nbFormExplain = true;

    constructor(private _nbFormItem: NbFormItemComponent) {
    }

    ngOnDestroy(): any {
        this._nbFormItem.disableHelp();
    }

    ngOnInit() {
        this._nbFormItem.enableHelp();
    }
}
