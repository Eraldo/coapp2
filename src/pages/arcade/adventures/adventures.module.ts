import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdventuresPage } from './adventures';
import {StarRatingComponentModule} from "../../../components/star-rating/star-rating.module";

@NgModule({
  declarations: [
    AdventuresPage,
  ],
  imports: [
    IonicPageModule.forChild(AdventuresPage),
    StarRatingComponentModule
  ],
  exports: [
    AdventuresPage
  ]
})
export class AdventuresPageModule {}
