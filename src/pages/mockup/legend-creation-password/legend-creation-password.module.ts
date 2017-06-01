import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LegendCreationPasswordPage } from './legend-creation-password';

@NgModule({
  declarations: [
    LegendCreationPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(LegendCreationPasswordPage),
  ],
  exports: [
    LegendCreationPasswordPage
  ]
})
export class LegendCreationPasswordPageModule {}
