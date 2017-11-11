import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityMetaPage } from './community-meta';

@NgModule({
  declarations: [
    CommunityMetaPage,
  ],
  imports: [
    IonicPageModule.forChild(CommunityMetaPage),
  ],
})
export class CommunityMetaPageModule {}
