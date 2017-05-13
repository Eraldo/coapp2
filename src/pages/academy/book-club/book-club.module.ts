import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookClubPage } from './book-club';

@NgModule({
  declarations: [
    BookClubPage,
  ],
  imports: [
    IonicPageModule.forChild(BookClubPage),
  ],
  exports: [
    BookClubPage
  ]
})
export class BookClubPageModule {}
