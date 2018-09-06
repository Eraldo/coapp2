import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {UnderConstructionItemComponent} from "./under-construction-item";

@NgModule({
  declarations: [
    UnderConstructionItemComponent,
  ],
  imports: [
    IonicPageModule.forChild(UnderConstructionItemComponent),
  ],
  exports: [
    UnderConstructionItemComponent
  ]
})
export class UnderConstructionItemComponentModule {}
