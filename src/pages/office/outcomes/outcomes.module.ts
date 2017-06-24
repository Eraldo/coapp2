import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutcomesPage } from './outcomes';
import {OutcomeComponentModule} from "../../../components/outcome/outcome.module";
import {ScopeComponentModule} from "../../../components/scope/scope.module";
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";

@NgModule({
  declarations: [
    OutcomesPage,
  ],
  imports: [
    IonicPageModule.forChild(OutcomesPage),
    OutcomeComponentModule,
    ScopeComponentModule,
    AppToolbarComponentModule,
  ],
  exports: [
    OutcomesPage
  ]
})
export class OutcomesPageModule {}
