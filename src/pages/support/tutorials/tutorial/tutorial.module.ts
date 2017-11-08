import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TutorialPage } from './tutorial';
import {TutorialComponentModule} from "../../../../components/tutorial/tutorial.module";

@NgModule({
  declarations: [
    TutorialPage,
  ],
  imports: [
    IonicPageModule.forChild(TutorialPage),
    TutorialComponentModule
  ],
})
export class TutorialPageModule {}
