import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JourneyOptionsPage } from './journey-options';

@NgModule({
  declarations: [
    JourneyOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(JourneyOptionsPage),
  ],
})
export class JourneyOptionsPageModule {}
