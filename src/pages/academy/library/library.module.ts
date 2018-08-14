import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LibraryPage } from './library';
import {StarRatingComponentModule} from "../../../components/star-rating/star-rating.module";

@NgModule({
  declarations: [
    LibraryPage,
  ],
  imports: [
    IonicPageModule.forChild(LibraryPage),
    StarRatingComponentModule
  ],
  exports: [
    LibraryPage
  ]
})
export class LibraryPageModule {}
