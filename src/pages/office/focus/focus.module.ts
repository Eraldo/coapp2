import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FocusPage } from './focus';
import {UserItemComponentModule} from "../../../components/user-item/user-item.module";
import {OutcomeComponentModule} from "../../../components/outcome/outcome.module";

@NgModule({
  declarations: [
    FocusPage,
  ],
  imports: [
    IonicPageModule.forChild(FocusPage),
    UserItemComponentModule,
    OutcomeComponentModule
  ],
})
export class FocusPageModule {}
