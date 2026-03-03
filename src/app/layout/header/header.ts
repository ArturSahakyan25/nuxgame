import {
    Component,
    computed,
    ElementRef,
    HostListener,
    inject,
    OnInit,
    signal,
    WritableSignal
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { SvgIconComponent } from "../../shared/utils/svg/svg";
import { navData } from '../../shared/utils/nav-data/nav-data';
import { NgClass, NgStyle } from '@angular/common';
import { NAVDATATYPES } from '../../shared/utils/models';
import { LinkTarget } from '../../shared/utils/models/link-target.enum';
import { UiServices } from '../../core/services/ui.services';
import { BreakpointService } from "../../core/services/breakpoint-services";
import { filter } from "rxjs";
import {HeaderService} from "../../core/services/header.services";

@Component({
    selector: 'app-header',
    imports: [
        RouterLink,
        SvgIconComponent,
        NgStyle,
        NgClass,
    ],
    templateUrl: './header.html',
    styleUrl: './header.scss',
})
export class Header implements OnInit {

    protected readonly LinkTarget = LinkTarget;
    protected readonly navData = navData;
    protected readonly nav_footer_show = NAVDATATYPES;

    public headerService = inject(HeaderService)


    readonly activeNav = signal<any>(null);
    readonly activeNavMobile = signal<any>(null);

    readonly showSubHeader = computed(() => !!this.activeNav());

    readonly showSubHeaderMobile = computed(() => !!this.activeNavMobile());

    readonly showMobileMenu: WritableSignal<boolean> = signal(false);

    readonly changeLangIconEvent = signal(false);

    readonly isLoadingImg = signal(false);

    readonly ui = inject(UiServices);
    readonly bp = inject(BreakpointService);

    private timeoutId: any;
    private isMobileSignal = signal(this.bp.isMobile());

    constructor(private el: ElementRef, public router: Router) {}

    /* =========================
       CLOSE ON OUTSIDE CLICK (DESKTOP)
    ========================== */

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
        if (!this.activeNav()) return;
        const clickedInside = this.el.nativeElement.contains(event.target);
        if (!clickedInside) this.closeDesktopMenu();
    }

    /* =========================
       HANDLE BREAKPOINT SWITCH
    ========================== */

    @HostListener('window:resize')
    onResize() {
        this.checkBreakpointChange();
    }

    private checkBreakpointChange() {
        const isMobile = this.bp.isMobile();

        if (isMobile !== this.isMobileSignal()) {
            this.isMobileSignal.set(isMobile);

            if (isMobile) {
                // Desktop → Mobile
                this.closeDesktopMenu();
            } else {
                // Mobile → Desktop
                this.closeMobileMenu();
            }

            this.syncBodyClass();
        }
    }

    /* =========================
       DESKTOP MENU
    ========================== */

    toggleSubmenu(nav: any) {
        if (!nav.child) {
            this.closeDesktopMenu();
            return;
        }

        this.activeNav.update(current => {
            const isOpening = current !== nav;
            return isOpening ? nav : null;
        });

        this.syncBodyClass();
    }

    closeDesktopMenu() {
        this.activeNav.set(null);
        this.syncBodyClass();
    }

    /* =========================
       MOBILE MENU
    ========================== */

    toggleSubmenuMobile(nav: any) {
        if (!nav.child) {
            this.closeMobileMenu();
            return;
        }

        this.activeNavMobile.update(current => current !== nav ? nav : null);
        this.syncBodyClass();
    }

    openMobileMenu() {
        this.showMobileMenu.update(v => !v);
        this.ui.showOverlay.update(v => !v);
        this.syncBodyClass();
    }

    closeMobileMenu() {
        this.showMobileMenu.set(false);
        this.activeNavMobile.set(null);
        this.ui.showOverlay.set(false);
        this.syncBodyClass();
    }

    /* =========================
       LOGO CLICK
    ========================== */

    onLogoClick() {
        if (this.showMobileMenu()) {
            this.closeMobileMenu();
        } else {
            this.closeDesktopMenu();
        }
    }

    /* =========================
       LANGUAGE HOVER
    ========================== */

    toggleLang() {
        this.changeLangIconEvent.update(val => !val);
    }

    onLeave() {
        this.timeoutId = setTimeout(() => this.changeLangIconEvent.set(false), 200);
    }

    onEnter() {
        if (this.timeoutId) clearTimeout(this.timeoutId);
        this.changeLangIconEvent.set(true);
    }

    /* =========================
       IMAGE
    ========================== */

    onImageLoad() {
        this.isLoadingImg.set(false);
    }

    /* =========================
       BODY CLASS SYNC
    ========================== */

    private syncBodyClass() {
        const shouldBeActive = this.showMobileMenu() || this.activeNav();
        if (shouldBeActive) {
            this.ui.addClassBody('header-active');
        } else {
            this.ui.removeClassBody('header-active');
        }
    }

    /* =========================
       ROUTER NAVIGATION
    ========================== */

    ngOnInit() {
        // подписка на навигацию
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.closeDesktopMenu();
                this.closeMobileMenu();
            });

        // сигнал, чтобы сразу реагировать на изменение breakpoint (например, orientation change)
        setInterval(() => this.checkBreakpointChange(), 200);
    }
}
