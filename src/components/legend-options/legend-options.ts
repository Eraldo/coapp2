import { Component } from '@angular/core';

@Component({
  selector: 'legend-options',
  templateUrl: 'legend-options.html'
})
export class LegendOptionsComponent {

  constructor() {
    console.log('Hello LegendOptionsComponent Component');
  }

  logout() {
    console.log('>> TODO: logout')
  }
}
