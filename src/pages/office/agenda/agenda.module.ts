import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgendaPage } from './agenda';
import {MomentModule} from "angular2-moment";
import {ScopeComponentModule} from "../../../components/scope/scope.module";

@NgModule({
  declarations: [
    AgendaPage,
  ],
  imports: [
    IonicPageModule.forChild(AgendaPage),
    ScopeComponentModule,
    MomentModule,
  ],
  exports: [
    AgendaPage
  ]
})
export class AgendaPageModule {}
