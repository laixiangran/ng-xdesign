export type HorizontalConnectionPos = 'left' | 'center' | 'right';

export type VerticalConnectionPos = 'top' | 'center' | 'bottom';

export type Placement = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' |
    'bottom-right' | 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom';

export interface ConnectionPosition {
    horizontal: HorizontalConnectionPos;
    vertical: VerticalConnectionPos;
}

export class ConnectionPositionPair {
    targetX: HorizontalConnectionPos;
    targetY: VerticalConnectionPos;
    overlayX: HorizontalConnectionPos;
    overlayY: VerticalConnectionPos;

    constructor(
        target: ConnectionPosition,
        overlay: ConnectionPosition,
        public offsetX?: number,
        public offsetY?: number) {

        this.targetX = target.horizontal;
        this.targetY = target.vertical;
        this.overlayX = overlay.horizontal;
        this.overlayY = overlay.vertical;
    }
}

export interface Point {
    x: number;
    y: number;
}

/**
 * Expands the simple (x, y) coordinate by adding info about whether the
 * element would fit inside the viewport at that position, as well as
 * how much of the element would be visible.
 */
export interface OverlayPoint extends Point {
    visibleArea: number;
    fitsInViewport: boolean;
}
