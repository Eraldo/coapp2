import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactRoutinePage } from './contact-routine';

@NgModule({
  declarations: [
    ContactRoutinePage,
  ],
  imports: [
    IonicPageModule.forChild(ContactRoutinePage),
  ],
})
export class ContactRoutinePageModule {}
