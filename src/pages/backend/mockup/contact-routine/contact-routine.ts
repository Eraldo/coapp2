import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Icon} from "../../../../models/icon";

@IonicPage()
@Component({
  selector: 'page-contact-routine',
  templateUrl: 'contact-routine.html',
})
export class ContactRoutinePage {
  icons = Icon;
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

  private emailOrEmpty(control: AbstractControl): ValidationErrors | null {
    return control.value === '' ? null : Validators.email(control);
  }

  createContact() {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [this.emailOrEmpty]],
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
    // console.log(contact);
    const message = `${contact.message}\n\n--\nPowered by the www.coLegend.org contact facilitator.`;
    window.open(`mailto:${contact.email}?subject=${contact.subject}&body=${message.replace(/\n/g, '%0D%0A')}`);
  }

  next() {
    switch (this.phase) {
      case 1: {
        this.phase = 2;
        // this._completed$.next(false);
        return;
      }
      case 2: {
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
