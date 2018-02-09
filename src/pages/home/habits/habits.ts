import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MarkdownService} from "ngx-md";

const ViewerHero = gql`
  query {
    viewer {
      id
      hero {
        id
        routines
      }
    }
  }
`;

const updateHero = gql`
  mutation updateHero($routines: String) {
    updateHero(input: {routines: $routines}) {
      hero {
        id
        routines
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-habits',
  templateUrl: 'habits.html',
})
export class HabitsPage {
  query$;
  loading = true;
  editing = false;
  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private formBuilder: FormBuilder, private markdownService: MarkdownService, public popoverCtrl: PopoverController) {
    this.markdownService.setMarkedOptions({gfm: true, breaks: true});

    this.form = this.formBuilder.group({
      routines: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery<any>({query: ViewerHero});
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      const hero = data && data.viewer && data.viewer.hero;
      if (hero) {
        this.form.patchValue(hero);
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
      this.updateHero();
    }
  }

  updateHero() {
    this.apollo.mutate({
      mutation: updateHero,
      variables: this.form.value
    }).subscribe(({data}) => {
      console.log('got data', data);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HabitsPage');
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('HomeOptionsPage');
    popover.present({ev: source});
  }

}
