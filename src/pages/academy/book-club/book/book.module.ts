import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookPage } from './book';
import {MarkdownModule} from "ngx-md";
import {LifeAreaMetersComponentModule} from "../../../../components/life-area-meters/life-area-meters.module";
import {StarRatingComponentModule} from "../../../../components/star-rating/star-rating.module";

@NgModule({
  declarations: [
    BookPage,
  ],
  imports: [
    IonicPageModule.forChild(BookPage),
    MarkdownModule,
    LifeAreaMetersComponentModule,
    StarRatingComponentModule
  ],
})
export class BookPageModule {}
