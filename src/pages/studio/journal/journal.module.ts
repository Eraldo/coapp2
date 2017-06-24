import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JournalPage } from './journal';
import {MomentModule} from "angular2-moment";
import {ScopeComponentModule} from "../../../components/scope/scope.module";
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";

@NgModule({
  declarations: [
    JournalPage,
  ],
  imports: [
    IonicPageModule.forChild(JournalPage),
    MomentModule,
    ScopeComponentModule,
    AppToolbarComponentModule,
  ],
  exports: [
    JournalPage
  ]
})
export class JournalPageModule {}
