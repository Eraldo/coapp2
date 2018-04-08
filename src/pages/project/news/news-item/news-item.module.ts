import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsItemPage } from './news-item';
import {MarkdownModule} from "ngx-markdown";
import {PipesModule} from "../../../../pipes/pipes.module";

@NgModule({
  declarations: [
    NewsItemPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsItemPage),
    MarkdownModule.forChild(),
    PipesModule
  ],
})
export class NewsItemPageModule {}
