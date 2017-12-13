import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdventuresPage } from './adventures';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";
import {StarRatingComponentModule} from "../../../components/star-rating/star-rating.module";

@NgModule({
  declarations: [
    AdventuresPage,
  ],
  imports: [
    IonicPageModule.forChild(AdventuresPage),
    AppToolbarComponentModule,
    StarRatingComponentModule
  ],
  exports: [
    AdventuresPage
  ]
})
export class AdventuresPageModule {}
