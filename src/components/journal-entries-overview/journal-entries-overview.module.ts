import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {JournalEntriesOverviewComponent} from "./journal-entries-overview";
import {MomentModule} from "angular2-moment";
import {ScopedDateComponentModule} from "../scoped-date/scoped-date.module";

@NgModule({
  declarations: [
    JournalEntriesOverviewComponent,
  ],
  imports: [
    IonicPageModule.forChild(JournalEntriesOverviewComponent),
    MomentModule,
    ScopedDateComponentModule
  ],
  exports: [
    JournalEntriesOverviewComponent
  ]
})
export class JournalEntriesOverviewComponentModule {}
