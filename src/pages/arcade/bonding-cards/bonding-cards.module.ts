import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BondingCardsPage } from './bonding-cards';

@NgModule({
  declarations: [
    BondingCardsPage,
  ],
  imports: [
    IonicPageModule.forChild(BondingCardsPage),
  ],
})
export class BondingCardsPageModule {}
