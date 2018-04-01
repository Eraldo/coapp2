import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

export const AdventureQuery = gql`
  query Adventure($id: ID!) {
    adventure(id: $id) {
      id
      name
      scope
      imageUrl
      content
      rating
      completed
      reviews: adventureReviews {
        edges {
          node {
            id
            rating
            content
            imageUrl
            owner {
              id
              name
            }
          }
        }
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-adventure',
  templateUrl: 'adventure.html',
})
export class AdventurePage {
  query$;
  loading = true;
  adventure;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public popoverCtrl: PopoverController) {
  }

  ngOnInit() {
    const id = this.navParams.get('id');
    this.query$ = this.apollo.watchQuery({
      query: AdventureQuery,
      variables: {id}
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.adventure = data && data.adventure;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdventurePage');
  }

  review() {
    this.navCtrl.push('AdventureReviewFormPage', {id: this.adventure.id})
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('ArcadeOptionsPage');
    popover.present({ev: source});
  }

}
