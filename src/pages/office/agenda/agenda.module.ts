import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgendaPage } from './agenda';
import {MomentModule} from "angular2-moment";

@NgModule({
  declarations: [
    AgendaPage,
  ],
  imports: [
    IonicPageModule.forChild(AgendaPage),
    MomentModule,
  ],
  exports: [
    AgendaPage
  ]
})
export class AgendaPageModule {}
