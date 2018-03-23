import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StyleguidePage } from './styleguide';
import {AccordionListComponentModule} from "../../../components/accordion-list/accordion-list.module";

@NgModule({
  declarations: [
    StyleguidePage,
  ],
  imports: [
    IonicPageModule.forChild(StyleguidePage),
    AccordionListComponentModule
  ],
})
export class StyleguidePageModule {}
