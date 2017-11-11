import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JourneyMetaPage } from './journey-meta';

@NgModule({
  declarations: [
    JourneyMetaPage,
  ],
  imports: [
    IonicPageModule.forChild(JourneyMetaPage),
  ],
})
export class JourneyMetaPageModule {}
