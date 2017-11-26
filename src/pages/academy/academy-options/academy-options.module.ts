import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcademyOptionsPage } from './academy-options';

@NgModule({
  declarations: [
    AcademyOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(AcademyOptionsPage),
  ],
})
export class AcademyOptionsPageModule {}
