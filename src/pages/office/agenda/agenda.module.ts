import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgendaPage } from './agenda';
import {MomentModule} from "angular2-moment";
import {ScopeComponentModule} from "../../../components/scope/scope.module";
import {FocusComponentModule} from "../../../components/focus/focus.module";
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";

@NgModule({
  declarations: [
    AgendaPage,
  ],
  imports: [
    IonicPageModule.forChild(AgendaPage),
    ScopeComponentModule,
    MomentModule,
    FocusComponentModule,
    AppToolbarComponentModule,
  ],
  exports: [
    AgendaPage
  ]
})
export class AgendaPageModule {}
