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
        values
        powers
        skills
        habits
        principles
        wishes
        goals
        people
        resources
        achievements
        questions
        experiments
        projects
        bucket
        content
        modified
      }
    }
  }
`;

const updateHero = gql`
  mutation updateHero($values: String, $powers: String, $skills: String, $habits: String, $principles: String, $wishes: String, $goals: String, $people: String, $resources: String, $achievements: String, $questions: String, $experiments: String, $projects: String, $bucket: String, $content: String) {
    updateHero(input: {values: $values, powers: $powers, skills: $skills, habits: $habits, principles: $principles, wishes: $wishes, goals: $goals, people: $people, resources: $resources, achievements: $achievements, questions: $questions, experiments: $experiments, projects: $projects, bucket: $bucket, content: $content}) {
      hero {
        id
        values
        powers
        skills
        habits
        principles
        wishes
        goals
        people
        resources
        achievements
        questions
        experiments
        projects
        bucket
        content
        modified
      }
    }
  }
`;


// interface QueryResponse {
//   viewer: {
//     hero: {
//       content: string,
//       modified: string
//     }
//   }
//   loading
// }

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
      values: ['', Validators.required],
      powers: ['', Validators.required],
      skills: ['', Validators.required],
      habits: ['', Validators.required],
      principles: ['', Validators.required],
      wishes: ['', Validators.required],
      goals: ['', Validators.required],
      people: ['', Validators.required],
      resources: ['', Validators.required],
      achievements: ['', Validators.required],
      questions: ['', Validators.required],
      experiments: ['', Validators.required],
      projects: ['', Validators.required],
      bucket: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery<any>({query: ViewerHero});
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      const hero = data && data.viewer && data.viewer.hero;
      if (hero) {
        this.form.patchValue(hero);
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
    console.log('ionViewDidLoad HeroPage');
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('JourneyOptionsPage');
    popover.present({ev: source});
  }
}
