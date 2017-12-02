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

  getIcon(star) {
    // Round rating to nearest 0.5 step.
    const rating = Math.round(this.rating*2)/2;
    if (rating > star - 1) {
      if (rating < star) {
        return 'star-half';
      } else {
        return 'star';
      }
    } else {
      return 'star-outline';
    }
  }
}
