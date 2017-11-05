import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const SuggestedActionQuery = gql`
  query {
    suggestedAction
    event: nextEvent {
      id
      name
      start
      end
      imageUrl
      location
      description
    }
    news: latestNews {
      id
      name
      date
      description
      imageUrl 
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  query$;
  loading = true;
  action: string;
  event;
  news;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({query: SuggestedActionQuery});
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.action = data && data.suggestedAction;
      this.event = data && data.event;
      this.news = data && data.news;
    })
  }

  ionViewDidEnter() {
    this.query$.refetch()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  nextStep() {
    this.navCtrl.push('AgendaPage');
  }

}
