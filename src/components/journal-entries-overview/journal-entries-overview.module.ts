import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {JournalEntriesOverviewComponent} from "./journal-entries-overview";
import {MomentModule} from "ngx-moment";
import {ScopedDateComponentModule} from "../scoped-date/scoped-date.module";
import {JournalEntryItemComponentModule} from "../journal-entry-item/journal-entry-item.module";

@NgModule({
  declarations: [
    JournalEntriesOverviewComponent,
  ],
  imports: [
    IonicPageModule.forChild(JournalEntriesOverviewComponent),
    MomentModule,
    ScopedDateComponentModule,
    JournalEntryItemComponentModule
  ],
  exports: [
    JournalEntriesOverviewComponent
  ]
})
export class JournalEntriesOverviewComponentModule {}
