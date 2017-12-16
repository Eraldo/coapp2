import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookClubPage } from './book-club';
import {StarRatingComponentModule} from "../../../components/star-rating/star-rating.module";

@NgModule({
  declarations: [
    BookClubPage,
  ],
  imports: [
    IonicPageModule.forChild(BookClubPage),
    StarRatingComponentModule
  ],
  exports: [
    BookClubPage
  ]
})
export class BookClubPageModule {}
