import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomeMockupPage } from './welcome-mockup';

@NgModule({
  declarations: [
    WelcomeMockupPage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomeMockupPage),
  ],
  exports: [
    WelcomeMockupPage
  ]
})
export class WelcomeMockupPageModule {}
