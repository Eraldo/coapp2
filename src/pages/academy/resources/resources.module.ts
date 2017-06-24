import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResourcesPage } from './resources';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";

@NgModule({
  declarations: [
    ResourcesPage,
  ],
  imports: [
    IonicPageModule.forChild(ResourcesPage),
    AppToolbarComponentModule,
  ],
  exports: [
    ResourcesPage
  ]
})
export class ResourcesPageModule {}
