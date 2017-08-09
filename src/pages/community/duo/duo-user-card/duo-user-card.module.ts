import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DuoUserCardComponent } from './duo-user-card';
import {UserItemComponentModule} from "../../../../components/user-item/user-item.module";
import {FocusComponentModule} from "../../../../components/focus/focus.module";

@NgModule({
  declarations: [
    DuoUserCardComponent,
  ],
  imports: [
    IonicModule,
    UserItemComponentModule,
    FocusComponentModule,
  ],
  exports: [
    DuoUserCardComponent
  ]
})
export class DuoUserCardComponentModule {}
