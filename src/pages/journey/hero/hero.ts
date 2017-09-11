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
        modified
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
        modified
      }
    }
  }
`;


interface QueryResponse {
  myUser: {
    hero: {
      content: string,
      modified: string
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
  query$;
  loading$: Observable<boolean>;
  content$: Observable<string>;
  lastUpdated$: Observable<string>;
  editing = false;
  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private formBuilder: FormBuilder, private markdownService: MarkdownService) {
    // Workaround: https://github.com/dimpu/angular2-markdown/issues/65
    // this.markdownService.setMarkedOptions({gfm: true, breaks: true, sanitize: true});
    this.markdownService.setMarkedOptions({gfm: true, breaks: true});

    this.form = this.formBuilder.group({
      content: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery<QueryResponse>({query: MyUserHero});
    this.loading$ = this.query$.map(({data}) => data.loading);
    this.lastUpdated$ = this.query$.map(({data}) => data.myUser.hero.modified);
    this.content$ = this.query$.map(({data}) => {
      if (data) {
        return data.myUser.hero.content
      } else {
        return ''
      }
    });
  }

  ionViewDidEnter() {
    this.query$.refetch()
  }

  edit() {
    this.editing = true;
  }

  update(content) {
    this.form.setValue({content});
  }

  save() {
    const content = this.form.value.content;
    this.editing = false;

    this.content$.first().subscribe(originalContent => {
      if (content && content != originalContent) {
        this.updateHero(content)
      }
    });
  }

  updateHero(content) {
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
