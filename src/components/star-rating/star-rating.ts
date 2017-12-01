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

  getIcon(index) {
    const rating = this.rating;
    if (index <= Math.floor(rating)) {
      return 'star';
    } else {
      // Math.round(rating*2)/2) => rating rounded to nearest 0.5 step.
      if (index - 0.5 == Math.round(rating*2)/2) {
        return 'star-half';
      } else {
        return 'star-outline';
      }
    }
  }
}
