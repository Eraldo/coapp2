import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JournalSearchPage } from './journal-search';
import {MarkdownModule} from "ngx-md";
import {MomentModule} from "angular2-moment";

@NgModule({
  declarations: [
    JournalSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(JournalSearchPage),
    MarkdownModule,
    MomentModule
  ],
})
export class JournalSearchPageModule {}