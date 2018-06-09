import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DecksPage } from './decks';

@NgModule({
  declarations: [
    DecksPage,
  ],
  imports: [
    IonicPageModule.forChild(DecksPage),
  ],
})
export class DecksPageModule {}
