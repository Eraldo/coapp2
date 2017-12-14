import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdventureReviewFormPage } from './adventure-review-form';
import {SimplemdeModule} from "ng2-simplemde/no-style";
import {Ionic2RatingModule} from "ionic2-rating";

@NgModule({
  declarations: [
    AdventureReviewFormPage,
  ],
  imports: [
    IonicPageModule.forChild(AdventureReviewFormPage),
    SimplemdeModule,
    Ionic2RatingModule
  ],
})
export class AdventureReviewFormPageModule {}
