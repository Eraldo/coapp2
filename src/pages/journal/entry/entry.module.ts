import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EntryPage } from './entry';
import {MomentModule} from "angular2-moment";

@NgModule({
  declarations: [
    EntryPage,
  ],
  imports: [
    IonicPageModule.forChild(EntryPage),
    MomentModule,
  ],
  exports: [
    EntryPage
  ]
})
export class EntryPageModule {}
