import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContentPage } from './content';
import {MarkdownModule} from "ngx-markdown";

@NgModule({
  declarations: [
    ContentPage,
  ],
  imports: [
    IonicPageModule.forChild(ContentPage),
    MarkdownModule.forChild()
  ],
})
export class ContentPageModule {}
