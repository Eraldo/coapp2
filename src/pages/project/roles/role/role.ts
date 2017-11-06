import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {MarkdownService} from "angular2-markdown";

const RoleQuery = gql`
  query RoleQuery($id: ID!) {
    role(id: $id) {
      id
      name
      nickname
      item
      icon
      description
      metrics
      users {
        edges {
          node {
            id
            avatar
          }
        }
      }
    }
  }
`;


@IonicPage()
@Component({
  selector: 'page-role',
  templateUrl: 'role.html',
})
export class RolePage {
  query$;
  loading = true;
  role;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private markdownService: MarkdownService) {
    this.markdownService.setMarkedOptions({gfm: true, breaks: true});
  }

  ngOnInit() {
    const id = this.navParams.get('id');
    this.query$ = this.apollo.watchQuery({
      query: RoleQuery,
      variables: {id}
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.role = data && data.role;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RolePage');
  }

}
