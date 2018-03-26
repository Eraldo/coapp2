import {Component, Renderer, ViewChild} from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Hotkey, HotkeysService} from "angular2-hotkeys";
import {Icon} from "../../../models/icon";

@IonicPage()
@Component({
  selector: 'page-text-modal',
  templateUrl: 'text-modal.html',
})
export class TextModalPage {
  @ViewChild('editor') editor;
  private form: FormGroup;
  title: string;
  content: string;
  required: boolean;
  fullScreen = false;
  options = {};  // https://github.com/sparksuite/simplemde-markdown-editor
  icons;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, private formBuilder: FormBuilder, private hotkeysService: HotkeysService, public renderer: Renderer) {
    this.icons = Icon;
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

  toggleFullScreen() {
    this.fullScreen = !this.fullScreen;
    this.editor.simplemde.toggleFullScreen();
    this.renderer.setElementClass(this.viewCtrl.pageRef().nativeElement, 'modal-fullscreen', this.fullScreen);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TextModalPage');
  }

}
