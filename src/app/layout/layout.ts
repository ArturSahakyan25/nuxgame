import {Component} from '@angular/core';
import {Header} from './header/header';
import {RouterOutlet} from '@angular/router';
import {Footer} from './footer/footer';

@Component({
  selector: 'app-layout',
  templateUrl: 'layout.html',
  imports: [
    Header,
    RouterOutlet,
    Footer
  ]
})
export class Layout {

}
