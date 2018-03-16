import { Component } from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Hotkey, HotkeysService} from "angular2-hotkeys";

@IonicPage()
@Component({
  selector: 'page-text-modal',
  templateUrl: 'text-modal.html',
})
export class TextModalPage {
  private form: FormGroup;
  title: string;
  content: string;
  required: boolean;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, private formBuilder: FormBuilder, private hotkeysService: HotkeysService) {
    this.title = this.navParams.get('title') || 'Text Editor';
    this.content = this.navParams.get('content') || '';
    this.required = this.navParams.get('required') || false;
    this.form = this.formBuilder.group({
      content: [this.content, this.required ? Validators.required : []],
    });

    this.hotkeysService.add(new Hotkey('mod+s', (event: KeyboardEvent): boolean => {
      this.save();
      return false; // Prevent bubbling
    }, ['INPUT', "TEXTAREA"], 'save'));
  }

  save() {
    let content = this.form.value.content;
    this.viewCtrl.dismiss({content});
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TextModalPage');
  }

}
