import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScopeComponent } from './scope';

@NgModule({
  declarations: [
    ScopeComponent,
  ],
  imports: [
    IonicPageModule.forChild(ScopeComponent),
  ],
  exports: [
    ScopeComponent
  ]
})
export class ScopeComponentModule {}
