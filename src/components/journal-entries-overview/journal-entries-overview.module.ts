import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {RoundProgressModule} from "angular-svg-round-progressbar";
import {JournalEntriesOverviewComponent} from "./journal-entries-overview";
import {MomentModule} from "angular2-moment";

@NgModule({
  declarations: [
    JournalEntriesOverviewComponent,
  ],
  imports: [
    IonicPageModule.forChild(JournalEntriesOverviewComponent),
    RoundProgressModule,
    MomentModule
  ],
  exports: [
    JournalEntriesOverviewComponent
  ]
})
export class JournalEntriesOverviewComponentModule {}
