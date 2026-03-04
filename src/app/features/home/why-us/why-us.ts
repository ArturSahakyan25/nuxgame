import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";
import {iGamingItem} from "./why-us.models";
import {LinkTarget} from "../../../shared/utils/models/link-target.enum";
import {SvgIconComponent} from "../../../shared/utils/svg/svg";

@Component({
    selector: "app-why-us",
  imports: [
    RouterLink,
    SvgIconComponent
  ],
    templateUrl: "./why-us.html",
    styleUrl: "./why-us.scss",
})
export class WhyUs {
    public readonly seoPrefix = 'iGaming Software Platform - ';
    public items: iGamingItem[] = [
        {id: '1', imgName: '1-1', title: 'Comprehensive iGaming products'},
        {id: '2', imgName: '2-1', title: 'Customizable iGaming software'},
        {id: '3', imgName: '3-1', title: 'Rapid Deployment'},
        {id: '4', imgName: '4-1', title: '24/7 customer support'},
        {id: '5', imgName: '5-1', title: 'Advanced anti-fraud protection'},
        {id: '6', imgName: '6-1', title: 'Intuitive back-office system'},
        {id: '7', imgName: '7-1', title: 'Marketing tools'},
        {id: '8', imgName: '8-1', title: 'Legal consulting services'}
    ];
  protected readonly LinkTarget = LinkTarget;
}
