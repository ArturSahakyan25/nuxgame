import {Component, inject} from "@angular/core";
import {UiServices} from "../../../core/services/ui.services";

@Component({
    selector: 'app-overlay',
    template: `@if(ui.showOverlay()){<div class="overlay"></div>}`,
})
export class Overlay {
    readonly ui = inject(UiServices)
}