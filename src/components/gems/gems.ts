import {Component, Input} from '@angular/core';
import {Icon} from "../../models/icon";

@Component({
  selector: 'gems',
  templateUrl: 'gems.html'
})
export class GemsComponent {
  icons;
  @Input() balance = 0;

  constructor() {
    console.log('Hello GemsComponent Component');
    this.icons = Icon;
  }

  getGems(area) {
    const balance = this.balance;
    if (!balance) {
      return 0
    }
    switch (area) {
      case 1: {
        return Math.floor(balance * 100) % 10
      }
      case 2: {
        return Math.floor(balance * 10) % 10
      }
      case 3: {
        return balance % 10
      }
      case 4: {
        return Math.floor(balance / 10) % 10
      }
      case 5: {
        return Math.floor(balance / 100) % 10
      }
      case 6: {
        return Math.floor(balance / 1000) % 10
      }
      case 7: {
        return Math.floor(balance / 10000) % 10
      }
    }
  }

  get highestGem() {
    const balance = this.balance;
    if (balance >= 10000) {
      return 7
    } else if (balance >= 1000) {
      return 6
    } else if (balance >= 100) {
      return 5
    } else if (balance >= 10) {
      return 4
    } else if (balance >= 1) {
      return 3
    } else if (balance >= 0.1) {
      return 2
    } else {
      return 1
    }
  }

}
