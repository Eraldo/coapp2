import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JournalEntryPage } from './journal-entry';
import {MarkdownModule} from "ngx-markdown";
import {JournalEntryComponentModule} from "../../../../components/journal-entry/journal-entry.module";

@NgModule({
  declarations: [
    JournalEntryPage,
  ],
  imports: [
    IonicPageModule.forChild(JournalEntryPage),
    MarkdownModule.forChild(),
    JournalEntryComponentModule
  ],
})
export class JournalEntryPageModule {}
