import { Injectable } from '@angular/core';
import { signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BreakpointService {
    readonly isMobile = signal(window.innerWidth <= 1024);

    constructor() {
        effect(() => {
            window.addEventListener('resize', () => {
                this.isMobile.set(window.innerWidth <= 1024);
            });
        });
    }
}
