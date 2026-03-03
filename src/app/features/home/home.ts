import {Component} from '@angular/core';
import {Hero} from './hero/hero';
import {WhyUs} from "./why-us/why-us";

@Component({
  selector: 'home',
  templateUrl: 'home.html',
    imports: [
        Hero,
        WhyUs
    ]
})
export class HomePage {

}
