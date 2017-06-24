import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppToolbarComponent } from './app-toolbar';
import {ProgressBarComponentModule} from "../progress-bar/progress-bar.module";

@NgModule({
  declarations: [
    AppToolbarComponent,
  ],
  imports: [
    IonicPageModule.forChild(AppToolbarComponent),
    ProgressBarComponentModule,
  ],
  exports: [
    AppToolbarComponent
  ]
})
export class AppToolbarComponentModule {}
