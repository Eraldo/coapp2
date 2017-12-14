import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookReviewFormPage } from './book-review-form';
import {Ionic2RatingModule} from "ionic2-rating";
import {SimplemdeModule} from "ng2-simplemde/no-style";

@NgModule({
  declarations: [
    BookReviewFormPage,
  ],
  imports: [
    IonicPageModule.forChild(BookReviewFormPage),
    SimplemdeModule,
    Ionic2RatingModule
  ],
})
export class BookReviewFormPageModule {}
