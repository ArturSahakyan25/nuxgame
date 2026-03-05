import { Component } from "@angular/core";
import {Partner} from "./game-provaider.models";
import {LinkTarget} from "../../../shared/utils/models/link-target.enum";
import {RouterLink} from "@angular/router";
import {SvgIconComponent} from "../../../shared/utils/svg/svg";

@Component({
  selector: "app-game-provaider",
  imports: [
    RouterLink,
    SvgIconComponent
  ],
  templateUrl: "./game-provaider.html",
  styleUrl: "./game-provaider.scss",
})
export class GameProvaider {
  public readonly partners: Partner[] = [
    { link: 'habanero', img: 'habanero.png', alt: 'Habanero Slot Games' },
    { link: 'evolution-gaming', img: 'evolution-gaming-1.png', alt: 'Evolution Gaming Casinos' },
    { link: 'golden-race', img: 'golden_race.webp', alt: 'GoldenRace' },
    { link: 'ezugi', img: 'ezugi-provider.png', alt: 'Ezugi' },
    { link: 'tvbet', img: 'tvbet-provider.png', alt: 'TVBET' },
    { link: 'endorphina', img: 'endorphina-provider.png', alt: 'Endorphina' },
    { link: 'pariplay', img: 'pariplay-provider.png', alt: 'Pariplay' },
    { link: 'spinmatic', img: 'spinmatic.webp', alt: 'spinmatic' },
    { link: 'vivo-gaming', img: 'vivo-gaming-provider.png', alt: 'Vivo Gaming' },
    { link: 'tom-horn-gaming', img: 'game-provider-tom-horngaming.webp', alt: 'Tom Horn Gaming' },
    { link: 'espresso-games', img: 'espresso-games-provider.png', alt: 'Espresso Games' },
    { link: 'pragmatic-play', img: 'pragmatic-play-provider-1.png', alt: 'Pragmatic Play Games' },
    { link: 'playson', img: 'playson-provider.png', alt: 'Playson' },
    { link: 'booongo', img: 'booongo.png', alt: 'Booongo' },
    { link: '1x2-network', img: '1x2-network-provider.png', alt: '1x2 Network' }
  ];
  public readonly baseUrl = 'https://nuxgame.com/wp-content/uploads/2025/';
  protected readonly LinkTarget = LinkTarget;
}
