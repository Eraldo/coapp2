import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AchievementsPage } from './achievements';
import {ScopeComponentModule} from "../../../components/scope/scope.module";
import {OutcomeComponentModule} from "../../../components/outcome/outcome.module";
import {ScopedDatePickerComponentModule} from "../../../components/scoped-date-picker/scoped-date-picker.module";

@NgModule({
  declarations: [
    AchievementsPage,
  ],
  imports: [
    IonicPageModule.forChild(AchievementsPage),
    ScopeComponentModule,
    OutcomeComponentModule,
    ScopedDatePickerComponentModule
  ],
  exports: [
    AchievementsPage
  ]
})
export class AchievementsPageModule {}
