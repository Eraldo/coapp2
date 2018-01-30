import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {MarkdownService} from "ngx-md";
import {Observable} from "rxjs/Observable";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

const ViewerDemon = gql`
  query {
    viewer {
      id
      demon {
        id
        name
        avatar
        tensions
        fears
        content
        modified
      }
    }
  }
`;

const updateDemon = gql`
  mutation updateDemon($name: String, $avatar: String, $tensions: String, $fears: String, $content: String) {
    updateDemon(input: {name: $name, avatar: $avatar, tensions: $tensions, fears: $fears, content: $content}) {
      demon {
        id
        name
        avatar
        tensions
        fears
        content
        modified
      }
    }
  }
`;


interface QueryResponse {
  viewer: {
    demon: {
      name: string,
      avatar: string,
      tensions: string,
      fears: string,
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
      name: ['', Validators.required],
      avatar: ['', Validators.required],
      tensions: ['', Validators.required],
      fears: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery<QueryResponse>({query: ViewerDemon});
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      const demon = data && data.viewer && data.viewer.demon;
      if (demon) {
        this.form.patchValue(demon);
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
    this.editing = false;
    if (this.form.dirty) {
      this.form.markAsPristine();
      this.updateDemon();
    }
  }

  updateDemon() {
    this.apollo.mutate({
      mutation: updateDemon,
      variables: this.form.value
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
