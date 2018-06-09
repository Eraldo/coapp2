import {Component} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import {Icon} from "../../../../models/icon";
import gql from "graphql-tag";

const DeckQuery = gql`
  query Deck($id: ID!) {
    deck(id: $id) {
      id
      name
      image
      content
      cards {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            name
            image
          }
        }
      }
    }
  }
`;

@IonicPage({
  segment: 'deck/:id'
})
@Component({
  selector: 'page-deck',
  templateUrl: 'deck.html',
})
export class DeckPage {
  icons;
  loading = true;
  query$;
  deck;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public alertCtrl: AlertController, public modalCtrl: ModalController) {
    this.icons = Icon;
  }

  ngOnInit() {
    const id = this.navParams.get('id');
    this.query$ = this.apollo.watchQuery({
      query: DeckQuery,
      variables: {id}
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.deck = data && data.deck;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeckPage');
  }

}
