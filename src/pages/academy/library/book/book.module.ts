import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookPage } from './book';
import {MarkdownModule} from "ngx-markdown";
import {LifeAreaMetersComponentModule} from "../../../../components/life-area-meters/life-area-meters.module";
import {StarRatingComponentModule} from "../../../../components/star-rating/star-rating.module";
import {TagComponentModule} from "../../../../components/tag/tag.module";

@NgModule({
  declarations: [
    BookPage,
  ],
  imports: [
    IonicPageModule.forChild(BookPage),
    MarkdownModule.forChild(),
    LifeAreaMetersComponentModule,
    StarRatingComponentModule,
    TagComponentModule
  ],
})
export class BookPageModule {}
