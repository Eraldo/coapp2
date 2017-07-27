import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JournalEntryFormPage } from './journal-entry-form';
import {ElasticModule} from "angular2-elastic";

@NgModule({
  declarations: [
    JournalEntryFormPage,
  ],
  imports: [
    IonicPageModule.forChild(JournalEntryFormPage),
    ElasticModule
  ],
  exports: [
    JournalEntryFormPage
  ]
})
export class JournalEntryFormPageModule {}
