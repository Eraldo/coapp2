import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JournalPage } from './journal';
import {MomentModule} from "angular2-moment";
import {ScopeComponentModule} from "../../../components/scope/scope.module";
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";
import {ScopedDatePickerComponentModule} from "../../../components/scoped-date-picker/scoped-date-picker.module";
import {MarkdownModule} from "angular2-markdown";
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
    AppToolbarComponentModule,
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
