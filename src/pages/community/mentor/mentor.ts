import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const MentorQuery = gql`
  query {
    user: viewer {
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public popoverCtrl: PopoverController) {
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

  showOptions(source) {
    let popover = this.popoverCtrl.create('CommunityOptionsPage');
    popover.present({ev: source});
  }
}
