import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ClanUserCardComponent } from './clan-user-card';
import {UserItemComponentModule} from "../../../../components/user-item/user-item.module";

@NgModule({
  declarations: [
    ClanUserCardComponent,
  ],
  imports: [
    IonicModule,
    UserItemComponentModule,
  ],
  exports: [
    ClanUserCardComponent
  ]
})
export class ClanUserCardComponentModule {}
