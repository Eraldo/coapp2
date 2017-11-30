import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookPage } from './book';
import {MarkdownModule} from "angular2-markdown";
import {LifeAreaMetersComponentModule} from "../../../../components/life-area-meters/life-area-meters.module";

@NgModule({
  declarations: [
    BookPage,
  ],
  imports: [
    IonicPageModule.forChild(BookPage),
    MarkdownModule,
    LifeAreaMetersComponentModule
  ],
})
export class BookPageModule {}
