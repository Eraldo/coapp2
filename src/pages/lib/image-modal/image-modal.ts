import {Component} from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Hotkey, HotkeysService} from "angular2-hotkeys";
import {Icon} from "../../../models/icon";

@IonicPage()
@Component({
  selector: 'page-image-modal',
  templateUrl: 'image-modal.html',
})
export class ImageModalPage {
  private form: FormGroup;
  title: string;
  image: string;
  file;
  required: boolean;
  icons;
  shortcuts;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, private formBuilder: FormBuilder, private hotkeysService: HotkeysService) {
    this.icons = Icon;
    this.title = this.navParams.get('title') || 'Image Editor';
    this.image = this.navParams.get('image') || '';
    this.required = this.navParams.get('required') || false;
    this.form = this.formBuilder.group({
      image: [undefined, this.required ? Validators.required : []],
    });

  }

  ngOnInit() {
    this.setShortcuts();
  }

  setShortcuts() {
    this.hotkeysService.add(new Hotkey('mod+s', (event: KeyboardEvent): boolean => {
      this.save();
      return false; // Prevent bubbling
    }, ['INPUT'], 'save'));
  }

  onFileChange(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file = file;

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image = reader.result;
      };
    }
  }

  save() {
    const image = this.file;
    this.viewCtrl.dismiss({image});
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageModalPage');
  }

  removeShortcuts() {
    for (const combo of ['mod+s']) {
      const shortcut = this.hotkeysService.get(combo);
      if (shortcut) {
        this.hotkeysService.remove(shortcut);
      }
    }
  }

  ngOnDestroy() {
    this.removeShortcuts();
  }

}
