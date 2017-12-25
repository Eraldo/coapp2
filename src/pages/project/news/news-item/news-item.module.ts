import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsItemPage } from './news-item';
import {MarkdownModule} from "ngx-md";
import {PipesModule} from "../../../../pipes/pipes.module";

@NgModule({
  declarations: [
    NewsItemPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsItemPage),
    MarkdownModule,
    PipesModule
  ],
})
export class NewsItemPageModule {}
