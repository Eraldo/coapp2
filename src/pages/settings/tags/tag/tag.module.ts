import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TagPage } from './tag';
import {MarkdownModule} from "ngx-markdown";
import {OutcomeComponentModule} from "../../../../components/outcome/outcome.module";
import {JournalEntryItemComponentModule} from "../../../../components/journal-entry-item/journal-entry-item.module";

@NgModule({
  declarations: [
    TagPage,
  ],
  imports: [
    IonicPageModule.forChild(TagPage),
    MarkdownModule,
    OutcomeComponentModule,
    JournalEntryItemComponentModule
  ],
})
export class TagPageModule {}
