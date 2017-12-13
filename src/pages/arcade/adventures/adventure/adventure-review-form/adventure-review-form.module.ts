import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdventureReviewFormPage } from './adventure-review-form';
import {SimplemdeModule} from "ng2-simplemde/no-style";

@NgModule({
  declarations: [
    AdventureReviewFormPage,
  ],
  imports: [
    IonicPageModule.forChild(AdventureReviewFormPage),
    SimplemdeModule
  ],
})
export class AdventureReviewFormPageModule {}
