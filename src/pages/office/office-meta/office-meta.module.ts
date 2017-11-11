import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfficeMetaPage } from './office-meta';

@NgModule({
  declarations: [
    OfficeMetaPage,
  ],
  imports: [
    IonicPageModule.forChild(OfficeMetaPage),
  ],
})
export class OfficeMetaPageModule {}
