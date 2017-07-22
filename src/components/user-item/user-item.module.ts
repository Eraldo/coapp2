import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { UserItemComponent } from './user-item';

@NgModule({
  declarations: [
    UserItemComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    UserItemComponent
  ]
})
export class UserItemComponentModule {}
