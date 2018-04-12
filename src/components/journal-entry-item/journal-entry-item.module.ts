import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {JournalEntryItemComponent} from "./journal-entry-item";
import {MarkdownModule} from "ngx-markdown";
import {MomentModule} from "angular2-moment";

@NgModule({
  declarations: [
    JournalEntryItemComponent,
  ],
  imports: [
    IonicPageModule.forChild(JournalEntryItemComponent),
    MarkdownModule.forChild(),
    MomentModule
  ],
  exports: [
    JournalEntryItemComponent
  ]
})
export class JournalEntryItemComponentModule {
}
