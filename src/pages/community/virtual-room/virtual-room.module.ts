import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VirtualRoomPage } from './virtual-room';

@NgModule({
  declarations: [
    VirtualRoomPage,
  ],
  imports: [
    IonicPageModule.forChild(VirtualRoomPage),
  ],
})
export class VirtualRoomPageModule {}
