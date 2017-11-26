import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityOptionsPage } from './community-options';

@NgModule({
  declarations: [
    CommunityOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(CommunityOptionsPage),
  ],
})
export class CommunityOptionsPageModule {}
