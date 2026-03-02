
import { Injectable, inject } from '@angular/core';
import { signal, WritableSignal } from '@angular/core';
import {UiServices} from "./ui.services";

@Injectable({ providedIn: 'root' })
export class HeaderService {
    private ui = inject(UiServices);

    readonly activeNav: WritableSignal<any> = signal(null);
    readonly activeNavMobile: WritableSignal<any> = signal(null);
    readonly showMobileMenu: WritableSignal<boolean> = signal(false);

    toggleDesktopMenu(nav?: any) {
        if (!nav || !nav.child) {
            this.activeNav.set(null);
            this.syncBody();
            return;
        }

        this.activeNav.update(current => current !== nav ? nav : null);
        this.syncBody();
    }

    toggleMobileMenu(nav?: any) {
        if (!nav || !nav.child) {
            this.closeMobileMenu();
            return;
        }

        this.activeNavMobile.update(current => current !== nav ? nav : null);
        this.syncBody();
    }

    openMobileMenu() {
        this.showMobileMenu.update(v => !v);
        this.ui.showOverlay.update(v => !v);
        this.syncBody();
    }

    closeMobileMenu() {
        this.showMobileMenu.set(false);
        this.activeNavMobile.set(null);
        this.ui.showOverlay.set(false);
        this.syncBody();
    }

    closeDesktopMenu() {
        this.activeNav.set(null);
        this.syncBody();
    }

    private syncBody() {
        const shouldBeActive = this.showMobileMenu() || this.activeNav();
        if (shouldBeActive) {
            this.ui.addClassBody('header-active');
        } else {
            this.ui.removeClassBody('header-active');
        }
    }
}
