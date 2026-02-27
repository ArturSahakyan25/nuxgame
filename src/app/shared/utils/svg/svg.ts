import {Component, Input} from '@angular/core';

@Component({
  selector: 'svg[icon]',
  template: '<svg:use [attr.href]="href"></svg:use>',
  standalone:true,
})
export class SvgIconComponent {
  @Input() icon = ""

  get href(){
    return `/svg/${this.icon}.svg#${this.icon}`;
  }

}
