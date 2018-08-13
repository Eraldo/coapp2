import {Injectable} from '@angular/core';
import {PopoverController, ToastController} from "ionic-angular";

interface Option {
  text: string,
  icon?: string,
  handler?(): void,
}

@Injectable()
export class OptionsMenuService {
  loading = true;
  query$;
  options;

  constructor(
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController,
  ) {
    console.log('Hello OptionsMenu Service');
  }

  showOptions(options: Option[], event=undefined) {
    this.options = options;
    let popover = this.popoverCtrl.create('OptionsMenuPage', {options});
    popover.present({
      ev: event
    });
  }
}
