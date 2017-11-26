import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfficeOptionsPage } from './office-options';

@NgModule({
  declarations: [
    OfficeOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(OfficeOptionsPage),
  ],
})
export class OfficeOptionsPageModule {}
