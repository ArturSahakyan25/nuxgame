import {Injectable, signal, WritableSignal} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UiServices {
  public isMobile : WritableSignal<boolean> = signal(false)

}
