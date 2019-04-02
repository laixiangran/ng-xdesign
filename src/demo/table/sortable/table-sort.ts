import { Component, ViewEncapsulation, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { genTableData } from '../table.data';
import { sortFunc } from '../../../component/table';

import { Subject } from 'rxjs';

interface TableArgs {
    order: string;
    orderBy: string;
    page: number;
    pageSize: number;
    filterMap: {
        name: string;
        status: string[];
        school: string;
    };
}

@Component({
    selector: 'demo-table-sort',
    templateUrl: './table-sort.html',
    styleUrls: ['./table-sort.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableSortDemo implements OnInit {

    filterMap: any = {};

    sortParam: any = {
        orderBy: 'height',
        order: 'desc'
    };

    datasource: any[] = genTableData();
    filteredDatasource: any[] = [];

    displayTableData: any[] = [];

    page = 1;

    pageSize = 10;

    paramSubject: Subject<TableArgs> = new Subject<TableArgs>();

    onDisplayDataChange(data: any[]) {
        this.displayTableData = data;
    }

    onSort(sortParam: any) {
        this.sortParam = sortParam;
        this.refresh();
    }

    pageChange(pageEvent: any) {
        if (pageEvent.count) {
            this.pageSize = pageEvent.count;
        }

        if (pageEvent.currrentIndex) {
            this.page = pageEvent.currrentIndex;
        }

        this.refresh();
    }

    getEntity() {
        return {
            order: this.sortParam.order,
            orderBy: this.sortParam.orderBy,
            page: this.page,
            pageSize: this.pageSize,
            filterMap: this.filterMap
        };
    }

    refresh() {
        let entity = this.getEntity();
        this.paramSubject.next(entity);
    }

    ngOnInit() {
        this.filteredDatasource = [...this.datasource];
        this.paramSubject.subscribe(params => {
            this.displayTableData = this.getDisplayDatasource(params);
        });
    }

    getDisplayDatasource(params: TableArgs) {
        let data: any[] = [...this.datasource];

        const page = params.page;
        const pageSize = params.pageSize;
        // filter
        if (params.filterMap.name) {
            data = data.filter(v => v.name.indexOf(params.filterMap.name) !== -1);
        }

        if (params.filterMap.status && params.filterMap.status.length) {
            data = data.filter(v => params.filterMap.status.includes(v.status + ''));
        }

        if (params.filterMap.school && params.filterMap.school.toLowerCase() !== 'all') {
            data = data.filter(v => v.school.indexOf(params.filterMap.school) !== -1);
        }

        // update filted datasource
        this.filteredDatasource = [...data];

        // sort
        if (params.order && params.orderBy) {
            data = data.sort(sortFunc(params.order, params.orderBy));
        }

        // page
        if (page) {
            data = data.slice((page - 1) * pageSize, page * pageSize);
        }

        return data;
    }

    onFilter(value: any, filterParam: any) {

        if (filterParam) {
            const target = filterParam.target;
            this.filterMap[target.field] = value;
            this.refresh();

            switch (target.field) {
                case 'status':
                    if (!value.length) {
                        target.filtered = false;
                    }
                    break;
                case 'name':
                    if (!value.length) {
                        target.filtered = false;
                    }
                    break;
                default: break;
            }
        }
    }

    onSingleFilter(value: string, target: any) {

        this.filterMap.school = value;
        this.refresh();
        target.hide();
    }

    onResetNameFilter(target: HTMLInputElement) {
        target.value = '';
        this.filterMap.name = target.value;
        this.refresh();
    }

    onResetStatusFilter(target: any) {
        target.reset();
        this.filterMap.status = [];
        this.refresh();
    }
}
