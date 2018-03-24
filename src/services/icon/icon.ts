import {Injectable} from '@angular/core';
import {Icon} from "../../models/icon";

@Injectable()
export class IconService {
  constructor() {
    console.log('Hello UiService Provider');
    for (let icon in Icon) {
      this[icon] = Icon[icon];
    }
  }

}
