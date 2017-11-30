import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MarkdownService} from "angular2-markdown";
import {Apollo} from "apollo-angular";

@IonicPage()
@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {
  query$;
  loading = true;
  book;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private markdownService: MarkdownService) {
    this.markdownService.setMarkedOptions({gfm: true, breaks: true});
  }

  ngOnInit() {
    this.book = {
      name: 'The 7 Habits',
      author: 'Stephen Covey',
      description: 'Book on Personal Development',
      content: '# Headline\nSome **bold** content\nSecond line.'
    }
    // const id = this.navParams.get('id');
    // this.query$ = this.apollo.watchQuery({
    //   query: EventQuery,
    //   variables: {id}
    // });
    // this.query$.subscribe(({data, loading}) => {
    //   this.loading = loading;
    //   this.event = data && data.event;
    // })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookPage');
  }

}
