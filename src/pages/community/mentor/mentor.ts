import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const MentorQuery = gql`
  query {
    user: myUser {
      id
      mentor {
        id
        name
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-mentor',
  templateUrl: 'mentor.html',
})
export class MentorPage {
  query$;
  loading = true;
  mentor;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
  }

  ngOnInit() {
    const id = this.navParams.get('id');
    this.query$ = this.apollo.watchQuery({
      query: MentorQuery,
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.mentor = data && data.user.mentor;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MentorPage');
  }

}
