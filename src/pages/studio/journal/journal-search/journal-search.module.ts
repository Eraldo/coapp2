import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JournalSearchPage } from './journal-search';
import {MarkdownModule} from "ngx-markdown";
import {MomentModule} from "ngx-moment";
import {JournalEntryItemComponentModule} from "../../../../components/journal-entry-item/journal-entry-item.module";

@NgModule({
  declarations: [
    JournalSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(JournalSearchPage),
    MarkdownModule.forChild(),
    MomentModule,
    JournalEntryItemComponentModule
  ],
})
export class JournalSearchPageModule {}
