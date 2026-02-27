import { Component } from '@angular/core';
import {SvgIconComponent} from '../../shared/utils/svg/svg';
import {LinkTarget} from '../../shared/utils/models/link-target.enum';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [
    SvgIconComponent,
    RouterLink
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly LinkTarget = LinkTarget;
}
