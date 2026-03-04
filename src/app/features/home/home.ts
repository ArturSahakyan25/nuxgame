import {Component} from '@angular/core';
import {Hero} from './hero/hero';
import {WhyUs} from "./why-us/why-us";
import {Products} from "./products/products";

@Component({
  selector: 'home',
  templateUrl: 'home.html',
    imports: [
        Hero,
        WhyUs,
        Products
    ]
})
export class HomePage {

}
