import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {MarkdownService} from "angular2-markdown";
import {Observable} from "rxjs/Observable";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

const ViewerDemon = gql`
  query {
    viewer {
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
  viewer: {
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
    this.query$ = this.apollo.watchQuery<QueryResponse>({query: ViewerDemon});
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      const demon = data && data.viewer && data.viewer.demon;
      if (demon) {
        const content = demon.content;
        if (content) {
          this.form.patchValue({content});
        }
        this.lastUpdated = demon.modified
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
      this.updateDemon(content);
    }
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

  showOptions(source) {
    let popover = this.popoverCtrl.create('JourneyOptionsPage');
    popover.present({ev: source});
  }
}
