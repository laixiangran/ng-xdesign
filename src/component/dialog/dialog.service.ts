import {
    Injectable,
    ViewContainerRef
} from '@angular/core';
import { AlertComponent } from './alert';
import { ConfirmComponent } from './confirm';
import { DynamicComponentService } from '../overlay/dynamic-component.service';

@Injectable()
export class DialogService {

    private dialogInstance: AlertComponent | ConfirmComponent;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private dynamicComponentService: DynamicComponentService<AlertComponent | ConfirmComponent>) {
    }

    createOverlay(type, content, title) {
        let componentRef = this.dynamicComponentService.createDynamicComponent(
            this.viewContainerRef, AlertComponent, '', window.document.body);

        this.dialogInstance = componentRef.instance;

        const config = {
            type: type,
            title: title,
            content: content
        };
        Object.keys(config).forEach(key => this.dialogInstance![key] = config[key]);

        this.dialogInstance.open();

        return new Promise((resolve) => {

            this.dialogInstance.confirmEvent.subscribe(() => {
                resolve(this.dialogInstance);
                this.dynamicComponentService.dispose();
            });
        });
    }

    createConfirmOverlay(content, title) {
        let componentRef = this.dynamicComponentService.createDynamicComponent(
            this.viewContainerRef, ConfirmComponent, '', window.document.body);

        this.dialogInstance = componentRef.instance;

        const config = {
            title: title,
            content: content
        };
        Object.keys(config).forEach(key => this.dialogInstance![key] = config[key]);

        this.dialogInstance.open();

        return new Promise((resolve, reject) => {

            this.dialogInstance.confirmEvent.subscribe(() => {
                resolve(this.dialogInstance);
                this.dynamicComponentService.dispose();
            });
            this.dialogInstance.cancelEvent.subscribe(() => {
                reject(this.dialogInstance);
                this.dynamicComponentService.dispose();
            });
        });
    }

    info(content: string, title: string) {
        return this.createOverlay('info', content, title);
    }

    error(content: string, title: string) {
        return this.createOverlay('error', content, title);
    }

    success(content: string, title: string) {
        return this.createOverlay('success', content, title);
    }

    confirm(content: string, title: string) {
        return this.createConfirmOverlay(content, title);
    }

    dispose() {
        this.dynamicComponentService.dispose();
    }
}
