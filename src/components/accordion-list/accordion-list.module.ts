import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {AccordionListComponent} from "./accordion-list";

@NgModule({
  declarations: [
    AccordionListComponent,
  ],
  imports: [
    IonicPageModule.forChild(AccordionListComponent),
  ],
  exports: [
    AccordionListComponent
  ]
})
export class AccordionListComponentModule {}
