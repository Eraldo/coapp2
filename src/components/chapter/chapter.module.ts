import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {ChapterComponent} from "./chapter";
import {MarkdownModule} from "ngx-markdown";

@NgModule({
  declarations: [
    ChapterComponent,
  ],
  imports: [
    IonicModule,
    MarkdownModule.forChild(),
  ],
  exports: [
    ChapterComponent
  ]
})
export class ChapterComponentModule {}
