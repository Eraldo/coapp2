import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdventuresPage } from './adventures';
import {ProgressBarComponentModule} from "../../../components/progress-bar/progress-bar.module";

@NgModule({
  declarations: [
    AdventuresPage,
  ],
  imports: [
    IonicPageModule.forChild(AdventuresPage),
    ProgressBarComponentModule,
  ],
  exports: [
    AdventuresPage
  ]
})
export class AdventuresPageModule {}
