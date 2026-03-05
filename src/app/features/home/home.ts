import {Component} from '@angular/core';
import {Hero} from './hero/hero';
import {WhyUs} from "./why-us/why-us";
import {Products} from "./products/products";
import {SolutionsComponent} from "./solutions-main/solutions-main";
import {GameProvaider} from "./game-provaider/game-provaider";

@Component({
  selector: 'home',
  templateUrl: 'home.html',
    imports: [
        Hero,
        WhyUs,
        Products,
        SolutionsComponent,
        GameProvaider,
    ]
})
export class HomePage {

}
