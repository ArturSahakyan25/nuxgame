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
import {NgStyle} from '@angular/common';
import {NAVDATATYPES} from '../../shared/utils/models';
import {LinkTarget} from '../../shared/utils/models/link-target.enum';
import {UiServices} from '../../core/services/ui.services';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    SvgIconComponent,
    NgStyle,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly navData = navData;
  protected readonly nav_footer_show = NAVDATATYPES;
  readonly activeNav = signal<any>(null);
  readonly isLoadingImg = signal(false)
  readonly showSubHeader = computed(() => !!this.activeNav());
  readonly changeLangIconEvent = signal(false);
  readonly ui = inject(UiServices)
  private timeoutId: any;


  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private el: ElementRef,
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
    this.renderer.removeClass(this.document.body, 'header-active');
  }
  toggleLang() {
    this.changeLangIconEvent.update(val => !val);
  }

  onLeave() {
    this.timeoutId = setTimeout(() => {
      this.changeLangIconEvent.set(false);
    }, 200); // Закроется через 0.2 секунды
  }

  onEnter() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.changeLangIconEvent.set(true);
  }

  toggleSubmenu(nav: any) {
    if (!nav.child) {
      this.activeNav.set(null);
      this.renderer.removeClass(this.document.body, 'header-active');
      return;
    }

    this.activeNav.update(current => {
      const isOpening = current !== nav;

      if (isOpening) {
        this.renderer.addClass(this.document.body, 'header-active');
        return nav;
      } else {
        this.renderer.removeClass(this.document.body, 'header-active');
        return null;
      }
    });
  }
  onImageLoad() {
    this.isLoadingImg.set(false);
  }

  protected readonly LinkTarget = LinkTarget;
}
