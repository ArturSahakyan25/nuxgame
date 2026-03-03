import { Injectable, signal, NgZone, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BreakpointService {
    readonly isMobile = signal(typeof window !== 'undefined' ? window.innerWidth <= 1024 : false);
    readonly isMiniMobile = signal(typeof window !== 'undefined' ? window.innerWidth <= 600 : false);

    private ngZone = inject(NgZone);

    constructor() {
        if (typeof window !== 'undefined') {
            this.ngZone.runOutsideAngular(() => {
                window.addEventListener('resize', () => {
                    const width = window.innerWidth;
                    this.isMobile.set(width <= 1024);
                    this.isMiniMobile.set(width <= 600);
                });
            });
        }
    }
}