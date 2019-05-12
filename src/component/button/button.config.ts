import { Injectable } from '@angular/core';

/**
 * button default config
 */
@Injectable({
    providedIn: 'root',
})
export class ButtonConfig {

    /**
     * button default theme
     * @default primary
     */
    theme: string = 'primary';

    /**
     * button default size
     * @default default
     */
    size: string = 'default';
}
