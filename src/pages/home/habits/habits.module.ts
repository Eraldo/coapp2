import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HabitsPage } from './habits';
import {ScopeComponentModule} from "../../../components/scope/scope.module";
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";

@NgModule({
  declarations: [
    HabitsPage,
  ],
  imports: [
    IonicPageModule.forChild(HabitsPage),
    ScopeComponentModule,
    AppToolbarComponentModule,
  ],
  exports: [
    HabitsPage
  ]
})
export class HabitsPageModule {}
