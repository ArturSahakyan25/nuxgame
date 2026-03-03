import {Component, viewChild, ElementRef, signal, AfterViewInit, ViewChild, inject, effect} from '@angular/core';
import {SvgIconComponent} from "../../../shared/utils/svg/svg";
import {RouterLink} from "@angular/router";
import {LinkTarget} from "../../../shared/utils/models/link-target.enum";
import {BreakpointService} from "../../../core/services/breakpoint-services";

@Component({
    selector: 'app-hero',
    imports: [SvgIconComponent, RouterLink],
    templateUrl: './hero.html',
    styleUrl: './hero.scss',
})
export class Hero implements AfterViewInit {
    @ViewChild('firstVideo') firstVideo!: ElementRef<HTMLVideoElement>;
    @ViewChild('secondVideo') secondVideo!: ElementRef<HTMLVideoElement>;
    @ViewChild('mobileVideo') mobileVideo!: ElementRef<HTMLVideoElement>;
    readonly bp = inject(BreakpointService)
    protected readonly LinkTarget = LinkTarget;

    ngAfterViewInit() {
        const first = this.firstVideo.nativeElement;
        const second = this.secondVideo.nativeElement;
        first.muted = true;
        second.muted = true;
        first.addEventListener('ended', () => {
            first.style.display = 'none';
            second.style.display = 'block';
            second.play().catch(() => {
            });
        });
        first.play().catch(() => {
        });
    }

  constructor() {
      effect(() => {
          const isMini = this.bp.isMiniMobile();
          if (isMini && this.mobileVideo) {
              this.mobileVideo.nativeElement.play().catch(() => {
                  console.log('Readonly');
              });
          }
      });
  }


}