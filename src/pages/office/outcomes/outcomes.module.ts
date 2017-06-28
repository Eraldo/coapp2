import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutcomesPage } from './outcomes';
import {ScopeComponentModule} from "../../../components/scope/scope.module";
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";
import {OutcomesComponentModule} from "../../../components/outcomes/outcomes.module";

@NgModule({
  declarations: [
    OutcomesPage,
  ],
  imports: [
    IonicPageModule.forChild(OutcomesPage),
    OutcomesComponentModule,
    ScopeComponentModule,
    AppToolbarComponentModule,
  ],
  exports: [
    OutcomesPage
  ]
})
export class OutcomesPageModule {}
