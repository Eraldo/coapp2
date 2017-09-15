import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {MarkdownService} from "angular2-markdown";
import {Observable} from "rxjs/Observable";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

const MyUserDemon = gql`
  query {
    myUser {
      id
      demon {
        id
        content
        modified
      }
    }
  }
`;

const updateDemon = gql`
  mutation updateDemon($content: String!) {
    updateDemon(input: {content: $content}) {
      demon {
        id
        content
        modified
      }
    }
  }
`;


interface QueryResponse {
  myUser: {
    demon: {
      content: string,
      modified: string
    }
  }
  loading
}

@IonicPage()
@Component({
  selector: 'page-demon',
  templateUrl: 'demon.html',
})
export class DemonPage {
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
    this.query$ = this.apollo.watchQuery<QueryResponse>({query: MyUserDemon});
    this.loading$ = this.query$.map(({data}) => data.loading);
    this.lastUpdated$ = this.query$.map(({data}) => data.myUser.demon.modified);
    this.content$ = this.query$.map(({data}) => {
      if (data) {
        return data.myUser.demon.content
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
        this.updateDemon(content)
      }
    });
  }

  updateDemon(content) {
    this.apollo.mutate({
      mutation: updateDemon,
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
    console.log('ionViewDidLoad DemonPage');
  }

}
