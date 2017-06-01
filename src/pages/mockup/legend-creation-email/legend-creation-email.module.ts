import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LegendCreationEmailPage } from './legend-creation-email';

@NgModule({
  declarations: [
    LegendCreationEmailPage,
  ],
  imports: [
    IonicPageModule.forChild(LegendCreationEmailPage),
  ],
  exports: [
    LegendCreationEmailPage
  ]
})
export class LegendCreationEmailPageModule {}
