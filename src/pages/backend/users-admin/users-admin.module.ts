import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsersAdminPage } from './users-admin';

@NgModule({
  declarations: [
    UsersAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(UsersAdminPage),
  ],
})
export class UsersAdminPageModule {}
