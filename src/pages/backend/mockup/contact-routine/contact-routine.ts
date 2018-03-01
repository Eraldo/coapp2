import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Status} from "../../../../models/status";

@IonicPage()
@Component({
  selector: 'page-contact-routine',
  templateUrl: 'contact-routine.html',
})
export class ContactRoutinePage {
  phase = 1;
  people = [];  // name, email, subject, message
  private form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      contacts: this.formBuilder.array([this.createContact()]),
    });
  }

  createContact() {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    })
  }

  addContact(): void {
    const control = <FormArray>this.form.controls['contacts'];
    control.push(this.createContact())
  }

  deleteContact(index: number) {
    const control = <FormArray>this.form.controls['contacts'];
    control.removeAt(index);
  }

  contactPerson(index: number) {
    const control = <FormArray>this.form.controls['contacts'];
    const contact = control.at(index).value;
    console.log(contact);
    window.open(`mailto:${contact.email}?subject=${contact.subject}&body=${contact.message}`);
  }

  next() {
    switch (this.phase) {
      case 1: {
        console.log('>> phase 1-2');
        this.phase = 2;
        // this._completed$.next(false);
        return;
      }
      case 2: {
        console.log('>> phase 2-3');
        this.phase = 3;
        // this._completed$.next(true);
        return;
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactRoutinePage');
  }

}
