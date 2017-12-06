import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JournalEntryFormPage } from './journal-entry-form';
import {SimplemdeModule} from "ng2-simplemde/no-style";
import {JournalEntriesOverviewComponentModule} from "../../../../components/journal-entries-overview/journal-entries-overview.module";

@NgModule({
  declarations: [
    JournalEntryFormPage,
  ],
  imports: [
    IonicPageModule.forChild(JournalEntryFormPage),
    SimplemdeModule,
    JournalEntriesOverviewComponentModule
  ],
  exports: [
    JournalEntryFormPage
  ]
})
export class JournalEntryFormPageModule {}
