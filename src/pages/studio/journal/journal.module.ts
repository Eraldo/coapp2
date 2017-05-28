import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JournalPage } from './journal';
import {MomentModule} from "angular2-moment";
import {ScopeComponentModule} from "../../../components/scope/scope.module";

@NgModule({
  declarations: [
    JournalPage,
  ],
  imports: [
    IonicPageModule.forChild(JournalPage),
    MomentModule,
    ScopeComponentModule,
  ],
  exports: [
    JournalPage
  ]
})
export class JournalPageModule {}
