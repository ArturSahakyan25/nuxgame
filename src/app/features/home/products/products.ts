import { Component } from "@angular/core";
import {RouterLink} from "@angular/router";
import {SvgIconComponent} from "../../../shared/utils/svg/svg";

@Component({
  selector: "app-products",
  imports: [
    RouterLink,
    SvgIconComponent
  ],
  templateUrl: "./products.html",
  styleUrl: "./products.scss",
})
export class Products {}
