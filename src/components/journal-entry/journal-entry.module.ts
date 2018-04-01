import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {JournalEntryComponent} from "./journal-entry";
import {MarkdownModule} from "ngx-md";
import {ScopedDateComponentModule} from "../scoped-date/scoped-date.module";

@NgModule({
  declarations: [
    JournalEntryComponent,
  ],
  imports: [
    IonicPageModule.forChild(JournalEntryComponent),
    ScopedDateComponentModule,
    MarkdownModule
  ],
  exports: [
    JournalEntryComponent
  ]
})
export class JournalEntryComponentModule {}
