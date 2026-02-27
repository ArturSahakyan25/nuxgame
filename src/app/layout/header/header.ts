import {
    Component,
    computed,
    DOCUMENT,
    ElementRef, HostListener,
    Inject,
    inject,
    Renderer2,
    signal,
    WritableSignal
} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SvgIconComponent} from "../../shared/utils/svg/svg"
import {navData} from '../../shared/utils/nav-data/nav-data';
import {NgClass, NgStyle} from '@angular/common';
import {NAVDATATYPES} from '../../shared/utils/models';
import {LinkTarget} from '../../shared/utils/models/link-target.enum';
import {UiServices} from '../../core/services/ui.services';
import {BreakpointService} from "../../core/services/breakpoint-services";

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
export class Header {
    protected readonly LinkTarget = LinkTarget;
    protected readonly navData = navData;
    protected readonly nav_footer_show = NAVDATATYPES;
    readonly activeNav = signal<any>(null);
    readonly isLoadingImg = signal(false)
    readonly showSubHeader = computed(() => !!this.activeNav());
    readonly changeLangIconEvent = signal(false);
    readonly ui = inject(UiServices);
    readonly bp = inject(BreakpointService);
    private timeoutId: any;
    readonly showMobileMenu: WritableSignal<boolean> = signal(false)


    constructor(
        private el: ElementRef
    ) {
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
        if (!this.activeNav()) return;
        const clickedInside = this.el.nativeElement.contains(event.target);
        if (!clickedInside) {
            this.closeMenu();
        }
    }

    closeMenu() {
        this.activeNav.set(null);
        this.ui.removeClassBody('header-active')
    }

    toggleLang() {
        this.changeLangIconEvent.update(val => !val);
    }

    onLeave() {
        this.timeoutId = setTimeout(() => {
            this.changeLangIconEvent.set(false);
        }, 200);
    }

    onEnter() {
        if (this.timeoutId) clearTimeout(this.timeoutId);
        this.changeLangIconEvent.set(true);
    }

    toggleSubmenu(nav: any) {
        if (!nav.child) {
            this.activeNav.set(null);
            this.ui.removeClassBody('header-active')
            return;
        }

        this.activeNav.update(current => {
            const isOpening = current !== nav;
            if (isOpening) {
                this.ui.addClassBody('header-active')
                return nav;
            } else {
                this.ui.removeClassBody('header-active')
                return null;
            }
        });
    }

    onImageLoad() {
        this.isLoadingImg.set(false);
    }

    openMobileMenu() {
        this.showMobileMenu.update(v => !v);
        this.ui.showOverlay.update(v => !v);
        const isOpen = this.showMobileMenu();

        if (isOpen) {
            this.ui.addClassBody('header-active');
        } else {
            this.ui.removeClassBody('header-active');
        }
    }

}
