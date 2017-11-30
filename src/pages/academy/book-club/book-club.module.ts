import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookClubPage } from './book-club';
import {AppToolbarComponentModule} from "../../../components/app-toolbar/app-toolbar.module";
import {LifeAreaMetersComponentModule} from "../../../components/life-area-meters/life-area-meters.module";

@NgModule({
  declarations: [
    BookClubPage,
  ],
  imports: [
    IonicPageModule.forChild(BookClubPage),
    AppToolbarComponentModule,
    LifeAreaMetersComponentModule
  ],
  exports: [
    BookClubPage
  ]
})
export class BookClubPageModule {}
