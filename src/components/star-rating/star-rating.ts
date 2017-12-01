import {Component, Input} from '@angular/core';

@Component({
  selector: 'star-rating',
  templateUrl: 'star-rating.html'
})
export class StarRatingComponent {
  public ratingRange = [1, 2, 3, 4, 5];
  @Input() rating = 0;

  constructor() {
    console.log('Hello StarRatingComponent Component');
  }

  // getIcon(index) {
  //   if ()
  //   return ''
  // }
}
