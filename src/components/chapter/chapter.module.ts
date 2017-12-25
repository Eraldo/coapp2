import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {ChapterComponent} from "./chapter";
import {MarkdownModule} from "ngx-md";

@NgModule({
  declarations: [
    ChapterComponent,
  ],
  imports: [
    IonicModule,
    MarkdownModule,
  ],
  exports: [
    ChapterComponent
  ]
})
export class ChapterComponentModule {}
