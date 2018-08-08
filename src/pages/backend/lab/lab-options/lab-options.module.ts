import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LabOptionsPage } from './lab-options';

@NgModule({
  declarations: [
    LabOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(LabOptionsPage),
  ],
})
export class LabOptionsPageModule {}
