import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LegendCreationNamePage } from './legend-creation-name';

@NgModule({
  declarations: [
    LegendCreationNamePage,
  ],
  imports: [
    IonicPageModule.forChild(LegendCreationNamePage),
  ],
  exports: [
    LegendCreationNamePage
  ]
})
export class LegendCreationNamePageModule {}
