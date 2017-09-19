import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MetricsPage } from './metrics';

@NgModule({
  declarations: [
    MetricsPage,
  ],
  imports: [
    IonicPageModule.forChild(MetricsPage),
  ],
})
export class MetricsPageModule {}
