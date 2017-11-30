import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookClubPage } from './book-club';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";

@NgModule({
  declarations: [
    BookClubPage,
  ],
  imports: [
    IonicPageModule.forChild(BookClubPage),
    AppToolbarComponentModule
  ],
  exports: [
    BookClubPage
  ]
})
export class BookClubPageModule {}
