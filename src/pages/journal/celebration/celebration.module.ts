import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CelebrationPage } from './celebration';

@NgModule({
  declarations: [
    CelebrationPage,
  ],
  imports: [
    IonicPageModule.forChild(CelebrationPage),
  ],
  exports: [
    CelebrationPage
  ]
})
export class CelebrationPageModule {}
