import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthenticationPage } from './authentication';

@NgModule({
  declarations: [
    AuthenticationPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthenticationPage),
  ],
  exports: [
    AuthenticationPage
  ]
})
export class AuthenticationPageModule {}
