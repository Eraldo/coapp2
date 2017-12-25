import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JournalPage } from './journal';
import {MomentModule} from "angular2-moment";
import {ScopeComponentModule} from "../../../components/scope/scope.module";
import {ScopedDatePickerComponentModule} from "../../../components/scoped-date-picker/scoped-date-picker.module";
import {MarkdownModule} from "ngx-md";
import {SimplemdeModule} from "ng2-simplemde/no-style";
import {JournalEntriesOverviewComponentModule} from "../../../components/journal-entries-overview/journal-entries-overview.module";

@NgModule({
  declarations: [
    JournalPage,
  ],
  imports: [
    IonicPageModule.forChild(JournalPage),
    MomentModule,
    ScopeComponentModule,
    ScopedDatePickerComponentModule,
    MarkdownModule,
    SimplemdeModule,
    JournalEntriesOverviewComponentModule
  ],
  exports: [
    JournalPage
  ]
})
export class JournalPageModule {}
