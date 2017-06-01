import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LegendCreationPage } from './legend-creation';

@NgModule({
  declarations: [
    LegendCreationPage,
  ],
  imports: [
    IonicPageModule.forChild(LegendCreationPage),
  ],
  exports: [
    LegendCreationPage
  ]
})
export class LegendCreationPageModule {}
