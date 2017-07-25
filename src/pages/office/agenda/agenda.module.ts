import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgendaPage } from './agenda';
import {ScopeComponentModule} from "../../../components/scope/scope.module";
import {FocusComponentModule} from "../../../components/focus/focus.module";
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";
import {ScopedDatePickerComponentModule} from "../../../components/scoped-date-picker/scoped-date-picker.module";

@NgModule({
  declarations: [
    AgendaPage,
  ],
  imports: [
    IonicPageModule.forChild(AgendaPage),
    ScopeComponentModule,
    FocusComponentModule,
    AppToolbarComponentModule,
    ScopedDatePickerComponentModule
  ],
  exports: [
    AgendaPage
  ]
})
export class AgendaPageModule {}
