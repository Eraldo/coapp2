import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {JournalEntryComponent} from "./journal-entry";
import {MarkdownModule} from "ngx-md";

@NgModule({
  declarations: [
    JournalEntryComponent,
  ],
  imports: [
    IonicPageModule.forChild(JournalEntryComponent),
    MarkdownModule
  ],
  exports: [
    JournalEntryComponent
  ]
})
export class JournalEntryComponentModule {}
