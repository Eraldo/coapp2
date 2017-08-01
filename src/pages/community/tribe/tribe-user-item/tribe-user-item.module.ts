import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TribeUserItemComponent } from './tribe-user-item';
import {UserItemComponentModule} from "../../../../components/user-item/user-item.module";

@NgModule({
  declarations: [
    TribeUserItemComponent,
  ],
  imports: [
    IonicModule,
    UserItemComponentModule,
  ],
  exports: [
    TribeUserItemComponent
  ]
})
export class TribeUserItemComponentModule {}
