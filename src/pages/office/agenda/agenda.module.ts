import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgendaPage } from './agenda';
import {ScopeComponentModule} from "../../../components/scope/scope.module";
import {FocusComponentModule} from "../../../components/focus/focus.module";
import {ScopedDatePickerComponentModule} from "../../../components/scoped-date-picker/scoped-date-picker.module";
import {OutcomeComponentModule} from "../../../components/outcome/outcome.module";

@NgModule({
  declarations: [
    AgendaPage,
  ],
  imports: [
    IonicPageModule.forChild(AgendaPage),
    ScopeComponentModule,
    FocusComponentModule,
    OutcomeComponentModule,
    ScopedDatePickerComponentModule
  ],
  exports: [
    AgendaPage
  ]
})
export class AgendaPageModule {}
