import { NgModule } from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import { HomePage } from './home';
import {TutorialComponentModule} from "../../components/tutorial/tutorial.module";

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    TutorialComponentModule
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}
