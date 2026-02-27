import {Component, inject} from '@angular/core';
import {Header} from './header/header';
import {RouterOutlet} from '@angular/router';
import {Footer} from './footer/footer';
import {Overlay} from "../shared/utils/overlay/overlay";
import {UiServices} from "../core/services/ui.services";

@Component({
  selector: 'app-layout',
  templateUrl: 'layout.html',
    imports: [
        Header,
        RouterOutlet,
        Footer,
        Overlay
    ]
})
export class Layout {
    readonly  ui = inject(UiServices)
}
