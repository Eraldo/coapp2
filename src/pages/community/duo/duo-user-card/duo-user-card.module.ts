import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DuoUserCardComponent } from './duo-user-card';
import {UserItemComponentModule} from "../../../../components/user-item/user-item.module";

@NgModule({
  declarations: [
    DuoUserCardComponent,
  ],
  imports: [
    IonicModule,
    UserItemComponentModule,
  ],
  exports: [
    DuoUserCardComponent
  ]
})
export class DuoUserCardComponentModule {}
