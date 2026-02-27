import { Injectable, inject, signal } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
    providedIn: 'root'
})
export class BreakpointService {
    private breakpointObserver = inject(BreakpointObserver);
    readonly isMobile = signal<boolean>(false);

    constructor() {
        this.breakpointObserver
            .observe(['(max-width: 1024px)'])
            .pipe(takeUntilDestroyed())
            .subscribe(result => {
                this.isMobile.set(result.matches);
            });
    }
}