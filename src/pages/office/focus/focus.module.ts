import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FocusPage } from './focus';
import {UserItemComponentModule} from "../../../components/user-item/user-item.module";

@NgModule({
  declarations: [
    FocusPage,
  ],
  imports: [
    IonicPageModule.forChild(FocusPage),
    UserItemComponentModule,
  ],
})
export class FocusPageModule {}
