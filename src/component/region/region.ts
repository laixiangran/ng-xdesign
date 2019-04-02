import {
    Component, Input, Output, EventEmitter, ChangeDetectorRef, forwardRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnDestroy
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OnChange } from '../core/decorators';

/**
 * region item interface
 */
export interface RegionItem {

    /** region node id */
    id: number;

    /** region node label */
    label: string;

    /** whether region node is selected */
    selected?: boolean;

    /** whether region node is disabled */
    disabled?: boolean;

    /** whether region node's children is partly selected */
    intermediate?: boolean;

    /** the children nodes of the region node */
    children?: RegionItem[];

    /** other properties */
    [key: string]: any;
}

/*
 * Provider Expression that allows component to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const REGION_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RegionComponent),
    multi: true
};

/**
 * Region Picker Component
 */
@Component({
    selector: 'nb-region',
    templateUrl: './region.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    providers: [REGION_VALUE_ACCESSOR],
    host: {
        'class': 'nb-widget nb-region'
    },
    exportAs: 'nbRegion'
})
export class RegionComponent implements OnInit, OnDestroy, ControlValueAccessor {

    /** region value change event, emit an array of ids */
    @Output() change: EventEmitter<number[] | string[]> = new EventEmitter<number[] | string[]>();

    /**
     * region datasource
     * @default []
     */
    @Input() datasource: RegionItem[] = [];

    /**
     * region value, an array of numbers
     * @default []
     */
    @OnChange()
    @Input() value: number[] = [];

    /**
     * region value change event
     * @docs-private
     */
    valueChange: EventEmitter<number[]> = new EventEmitter<number[]>();

    /**
     * whether the region is disabled
     * @default false
     */
    @OnChange(true)
    @Input() disabled: boolean = false;

    /** timers */
    _timer: any;

    /** timeout */
    _timeout = 100;

    /** previous shown province */
    _previousProvince: any;

    /** value map */
    _valueMap = {};

    constructor(private _cd: ChangeDetectorRef) {
        const self = this;
        self.valueChange.subscribe((newValue: number[]) => {
            if (!newValue) {
                return;
            }

            // set default region value
            self.walkDatasource(self.datasource, (item: RegionItem) => {
                const checked = newValue.indexOf(+item.id) !== -1;
                self.updateNode(item, checked);
            });

            self.datasource = [...self.datasource];
            this._cd.markForCheck();
        });
    }

    ngOnInit() {

        // compute city rows, when show city panel, we want two split cities in three columns
        this.walkDatasource(this.datasource, (item: RegionItem) => {
            if (item.children) {
                const rows = Math.ceil(item.children.length / 3);
                let rowArray: number[] = [];
                for (let i = 0; i < rows; i++) {
                    rowArray.push(i);
                }
                item.cityRows = rowArray;
            }
        });
    }

    /**
     * @docs-private
     */
    onToggleNode(item: RegionItem, checked: boolean) {
        this.updateNode(item, checked);
        this.getSelectedValue();
    }

    /**
     * @docs-private
     */
    updateNode(node: RegionItem, checked: boolean) {
        node.intermediate = false;
        node.selected = checked;

        if (node.selected) {
            this._valueMap[node.id] = true;
        }
        else {
            delete this._valueMap[node.id];
        }

        this.setChildren(node.children || [], checked);

        let parentNode = this.findParentNode(node.id);
        if (parentNode) {
            if (node.children) {
                parentNode.intermediate = node.children.some(v => !!v.selected);
            }

            this.updateParent(parentNode, checked);
        }
    }

    /**
     * @docs-private
     */
    setChildren(children: RegionItem[], checked: boolean) {
        const self = this;
        if (children && children.length) {
            children.forEach(v => {
                v.intermediate = false;
                v.selected = checked;

                if (v.selected) {
                    self._valueMap[v.id] = true;
                }
                else {
                    delete self._valueMap[v.id];
                }

                self.setChildren(v.children || [], checked);
            });
        }
    }

    /**
     * @docs-private
     */
    updateParent(currentNode: RegionItem, checked: boolean) {
        const self = this;
        if (currentNode.children) {
            let allChecked = currentNode.children.every(v => !!v.selected);
            let someChecked = currentNode.children.some(v => !!v.selected || !!v.intermediate);

            if (allChecked) {
                currentNode.selected = allChecked;
                currentNode.intermediate = false;
            }
            else if (someChecked) {
                currentNode.intermediate = true;
                currentNode.selected = false;
            }
            else {
                currentNode.selected = false;
                currentNode.intermediate = false;
            }

            if (currentNode.selected) {
                this._valueMap[currentNode.id] = true;
            }
            else {
                delete this._valueMap[currentNode.id];
            }

            let parentNode = self.findParentNode(currentNode.id);
            if (parentNode) {
                if (currentNode.intermediate) {
                    parentNode.intermediate = true;
                }
                this.updateParent(parentNode, checked);
            }
        }
    }

    /**
     * @docs-private
     */
    getSelectedValue() {
        this.value = Object.keys(this._valueMap).map(v => +v);
        this._markForCheck();
        this.change.emit(this.value);
    }

    /**
     * @docs-private
     */
    walkDatasource(datasource: RegionItem[], fn: Function) {
        const self = this;
        datasource.forEach(item => {
            fn(item);

            if (item.children) {
                self.walkDatasource(item.children, fn);
            }
        });
    }

    /**
     * @docs-private
     */
    findParentNode(id: number): RegionItem | undefined {
        let parentNode: RegionItem | undefined;

        this.walkDatasource(this.datasource, (item: RegionItem) => {
            if (item.children) {
                item.children.forEach(child => {
                    if (child.id === id) {
                        parentNode = item;
                        return;
                    }
                });
            }
        });

        return parentNode;
    }

    /**
     * @docs-private
     */
    onShowCity(overlay: any, event: MouseEvent) {

        clearTimeout(this._timer);

        if (this._previousProvince) {
            this._previousProvince.hide();
        }

        overlay.show();
        this._previousProvince = overlay;

        event.stopImmediatePropagation();
        event.preventDefault();
    }

    onClearTimeout() {
        clearTimeout(this._timer);
    }

    onHideOverlay(overlay: any) {
        this._timer = setTimeout(() => {
            if (overlay) {
                overlay.hide();
            }
        }, this._timeout);
    }

    /**
     * @docs-private
     */
    onHideCity(overlay: any) {

        this._timer = setTimeout(() => {
            if (overlay) {
                overlay.hide();
            }
        }, this._timeout);
    }

    /**
     * @docs-private
     */
    onOverPanel(province: RegionItem) {
        clearTimeout(this._timer);
        province.showCity = true;
    }

    /**
     * @docs-private
     */
    onLeavePanel(province: RegionItem) {
        this._timer = setTimeout(() => {
            province.showCity = false;
            this._cd.markForCheck();
        }, this._timeout);
    }

    /**
     * @docs-private
     */
    getSelectedCount(cities: RegionItem[]) {
        return cities.filter(v => !!v.selected).length;
    }

    ngOnDestroy() {
        clearTimeout(this._timer);
    }

    /**
     * The method to be called in order to update ngModel.
     * Now `ngModel` binding is not supported in multiple selection mode.
     */
    private _onModelChange: Function;

    /**
     * Registers a callback that will be triggered when the value has changed.
     * Implemented as part of ControlValueAccessor.
     * @param fn On change callback function.
     */
    registerOnChange(fn: Function) {
        this._onModelChange = fn;
    }

    /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
    private _onTouch: Function;

    /**
     * Registers a callback that will be triggered when the control has been touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn On touch callback function.
     */
    registerOnTouched(fn: Function) {
        this._onTouch = fn;
    }

    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param value Value to be set to the model.
     */
    writeValue(value: any) {

        if (value != null) {
            this.value = value;
        }
    }

    /**
     * Toggles the disabled state of the component. Implemented as part of ControlValueAccessor.
     * @param isDisabled Whether the component should be disabled.
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this._cd.markForCheck();
    }

    /**
     * update form model value and mark for check
     */
    _markForCheck() {
        if (this._onModelChange) {
            this._onModelChange(this.value);
        }

        if (this._onTouch) {
            this._onTouch(this.value);
        }

        this._cd.markForCheck();
    }
}
