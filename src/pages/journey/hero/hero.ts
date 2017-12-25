import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {MarkdownService} from "ngx-md";
import {Observable} from "rxjs/Observable";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

const ViewerHero = gql`
  query {
    viewer {
      id
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
  viewer: {
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
  loading = true;
  lastUpdated: string;
  editing = false;
  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private formBuilder: FormBuilder, private markdownService: MarkdownService, public popoverCtrl: PopoverController) {
    // Workaround: https://github.com/dimpu/angular2-markdown/issues/65
    // this.markdownService.setMarkedOptions({gfm: true, breaks: true, sanitize: true});
    this.markdownService.setMarkedOptions({gfm: true, breaks: true});

    this.form = this.formBuilder.group({
      content: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery<QueryResponse>({query: ViewerHero});
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      const hero = data && data.viewer && data.viewer.hero;
      if (hero) {
        const content = hero.content;
        if (content) {
          this.form.patchValue({content});
        }
        this.lastUpdated = hero.modified
      }
    });
  }

  ionViewDidEnter() {
    this.query$.refetch()
  }

  edit() {
    this.editing = true;
  }

  save() {
    const content = this.form.value.content;
    this.editing = false;
    if (this.form.dirty) {
      this.form.markAsPristine();
      this.updateHero(content);
    }
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

  showOptions(source) {
    let popover = this.popoverCtrl.create('JourneyOptionsPage');
    popover.present({ev: source});
  }
}
