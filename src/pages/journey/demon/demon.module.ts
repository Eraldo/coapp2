import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DemonPage } from './demon';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";

@NgModule({
  declarations: [
    DemonPage,
  ],
  imports: [
    IonicPageModule.forChild(DemonPage),
    AppToolbarComponentModule,
  ],
  exports: [
    DemonPage
  ]
})
export class DemonPageModule {}
