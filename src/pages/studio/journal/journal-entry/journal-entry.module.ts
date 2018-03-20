import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JournalEntryPage } from './journal-entry';
import {MarkdownModule} from "ngx-md";

@NgModule({
  declarations: [
    JournalEntryPage,
  ],
  imports: [
    IonicPageModule.forChild(JournalEntryPage),
    MarkdownModule,
  ],
})
export class JournalEntryPageModule {}
