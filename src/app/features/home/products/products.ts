import {afterNextRender, Component, effect, signal, WritableSignal} from "@angular/core";
import {RouterLink} from "@angular/router";
import {SvgIconComponent} from "../../../shared/utils/svg/svg";
import {NgStyle} from "@angular/common";

@Component({
    selector: "app-products",
    imports: [
        RouterLink,
        SvgIconComponent,
        NgStyle
    ],
    templateUrl: "./products.html",
    styleUrl: "./products.scss",
})
export class Products {
    public readonly openedCard = signal<number | null>(null);

    toggleMobileCardsText(index: number): void {
        this.openedCard.update(v => v === index ? null : index);
    }

    constructor() {

    }
}
