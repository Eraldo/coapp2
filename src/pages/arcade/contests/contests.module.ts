import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContestsPage } from './contests';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";

@NgModule({
  declarations: [
    ContestsPage,
  ],
  imports: [
    IonicPageModule.forChild(ContestsPage),
    AppToolbarComponentModule,
  ],
  exports: [
    ContestsPage
  ]
})
export class ContestsPageModule {}
