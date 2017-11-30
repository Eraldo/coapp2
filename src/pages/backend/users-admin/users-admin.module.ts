import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsersAdminPage } from './users-admin';
import {UserItemComponentModule} from "../../../components/user-item/user-item.module";

@NgModule({
  declarations: [
    UsersAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(UsersAdminPage),
    UserItemComponentModule
  ],
})
export class UsersAdminPageModule {}
