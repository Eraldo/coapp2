import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JournalEntryFormPage } from './journal-entry-form';
import {SimplemdeModule} from "ng2-simplemde/no-style";

@NgModule({
  declarations: [
    JournalEntryFormPage,
  ],
  imports: [
    IonicPageModule.forChild(JournalEntryFormPage),
    SimplemdeModule
  ],
  exports: [
    JournalEntryFormPage
  ]
})
export class JournalEntryFormPageModule {}
