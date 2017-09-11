import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {MarkdownService} from "angular2-markdown";
import {Observable} from "rxjs/Observable";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

const MyUserHero = gql`
  query {
    myUser {
      hero {
        id
        content
      }
    }
  }
`;

const updateHero = gql`
  mutation updateHero($content: String!) {
    updateHero(input: {content: $content}) {
      hero {
        id
        content
      }
    }
  }
`;


interface QueryResponse {
  myUser: {
    hero: {
      content: string
    }
  }
  loading
}

@IonicPage()
@Component({
  selector: 'page-hero',
  templateUrl: 'hero.html',
})
export class HeroPage {
  data$;
  loading$: Observable<boolean>;
  content$: Observable<string>;
  editing = false;
  private form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private formBuilder: FormBuilder, private markdownService: MarkdownService) {
    // Workaround: https://github.com/dimpu/angular2-markdown/issues/65
    // this.markdownService.setMarkedOptions({gfm: true, breaks: true, sanitize: true});
    this.markdownService.setMarkedOptions({gfm: true, breaks: true});

    this.form = this.formBuilder.group({
      content: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.data$ = this.apollo.watchQuery<QueryResponse>({query: MyUserHero});
    this.loading$ = this.data$.map(({data}) => data.loading);
    this.content$ = this.data$.map(({data}) => {
      if (data) {
        return data.myUser.hero.content
      } else {
        return ''
      }
    });
    this.content$.subscribe(content => this.form.setValue({content}))
  }

  ionViewDidEnter() {
    this.data$.refetch()
  }

  edit() {
    this.editing = true;
  }

  save() {
    const content = this.form.value.content;
    console.log(content);
    this.editing = false;

    this.apollo.mutate({
      mutation: updateHero,
      variables: {
        content: content
      }
    }).subscribe(({data}) => {
      console.log('got data', data);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HeroPage');
  }

}
