import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RolesPage } from './roles';
import {RoleItemComponentModule} from "../../../components/role-item/role-item.module";

@NgModule({
  declarations: [
    RolesPage,
  ],
  imports: [
    IonicPageModule.forChild(RolesPage),
    RoleItemComponentModule
  ],
})
export class RolesPageModule {}
