import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeckPage } from './deck';

@NgModule({
  declarations: [
    DeckPage,
  ],
  imports: [
    IonicPageModule.forChild(DeckPage),
  ],
})
export class DeckPageModule {}
