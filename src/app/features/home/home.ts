import {Component} from '@angular/core';
import {Hero} from './hero/hero';

@Component({
  selector: 'home',
  templateUrl: 'home.html',
  imports: [
    Hero
  ]
})
export class HomePage {

}
