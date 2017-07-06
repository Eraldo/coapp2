import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LegendOptionsPage } from './legend-options';

@NgModule({
  declarations: [
    LegendOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(LegendOptionsPage),
  ],
  exports: [
    LegendOptionsPage
  ]
})
export class LegendOptionsPageModule {}
