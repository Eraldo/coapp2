import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {RoleItemComponent} from "./role-item";

@NgModule({
  declarations: [
    RoleItemComponent,
  ],
  imports: [
    IonicPageModule.forChild(RoleItemComponent),
  ],
  exports: [
    RoleItemComponent
  ]
})
export class RoleItemComponentModule {}
