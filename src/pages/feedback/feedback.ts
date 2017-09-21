import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

const SendFeedbackMutation = gql`
  mutation SendFeedback($subject: String!, $message: String!) {
    sendFeedback(input: {subject: $subject, message: $message}) {
      success
      user {
        id
        name
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  private form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private formBuilder: FormBuilder, public alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      subject: ['I noticed something.', Validators.required],
      message: ['', Validators.required],
    });
  }

  save() {
    if (this.form.valid) {
      const data = this.form.value;
      this.apollo.mutate<any>({
        mutation: SendFeedbackMutation,
        variables: data
      }).subscribe(({data}) => {
        let alert = this.alertCtrl.create({
          title: `Thank you, ${data.sendFeedback.user.name}!`,
          message: 'We will get back to you. :)',
          buttons: ['Ok']
        });
        alert.present();
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

}
