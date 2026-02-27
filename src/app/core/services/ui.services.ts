import {DOCUMENT, Inject, Injectable, Renderer2, RendererFactory2, signal, WritableSignal} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UiServices {
  public isMobile : WritableSignal<boolean> = signal(false)
  public showOverlay : WritableSignal<boolean> = signal(false)
  private renderer!: Renderer2;
  constructor(
      rendererFactory: RendererFactory2,
      @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  addClassBody(className: string) {
    this.renderer.addClass(this.document.body, className);
  }

  removeClassBody(className: string) {
    this.renderer.removeClass(this.document.body, className);
  }

  // @TODO if add dark-light theme working this fn
  toggleClass(className: string, condition: boolean) {
    if (condition) {
      this.addClassBody(className);
    } else {
      this.removeClassBody(className);
    }
  }


}
