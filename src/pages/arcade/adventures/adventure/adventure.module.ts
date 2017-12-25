import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdventurePage } from './adventure';
import {MarkdownModule} from "ngx-md";
import {StarRatingComponentModule} from "../../../../components/star-rating/star-rating.module";

@NgModule({
  declarations: [
    AdventurePage,
  ],
  imports: [
    IonicPageModule.forChild(AdventurePage),
    MarkdownModule,
    StarRatingComponentModule
  ],
})
export class AdventurePageModule {}
