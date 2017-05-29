import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HabitsPage } from './habits';
import {ScopeComponentModule} from "../../../components/scope/scope.module";

@NgModule({
  declarations: [
    HabitsPage,
  ],
  imports: [
    IonicPageModule.forChild(HabitsPage),
    ScopeComponentModule,
  ],
  exports: [
    HabitsPage
  ]
})
export class HabitsPageModule {}
