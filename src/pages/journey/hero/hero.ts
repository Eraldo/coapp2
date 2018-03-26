import {Component} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, PopoverController} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {MarkdownService} from "ngx-md";
import {Icon} from "../../../models/icon";
import {titleCase} from "../../../utils/utils";
import {UpdatePurposeMutation} from "../../community/legend/legend";

const ViewerHeroQuery = gql`
  query {
    viewer {
      id
      purpose
      hero {
        id
        name
        avatar
        mission
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
        inspirations
        modified
      }
    }
  }
`;

const UpdateHeroMutation = gql`
  mutation update($name: String, $avatar: String, $mission: String, $values: String, $powers: String, $skills: String, $habits: String, $principles: String, $wishes: String, $goals: String, $people: String, $resources: String, $achievements: String, $questions: String, $experiments: String, $projects: String, $bucket: String, $inspirations: String, $content: String) {
    updateHero(input: {name: $name, avatar: $avatar, mission: $mission, values: $values, powers: $powers, skills: $skills, habits: $habits, principles: $principles, wishes: $wishes, goals: $goals, people: $people, resources: $resources, achievements: $achievements, questions: $questions, experiments: $experiments, projects: $projects, bucket: $bucket, inspirations: $inspirations, content: $content}) {
      hero {
        id
        name
        avatar
        mission
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
        inspirations
        content
        modified
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-hero',
  templateUrl: 'hero.html',
})
export class HeroPage {
  query$;
  loading = true;
  hero;
  purpose;
  icons;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private markdownService: MarkdownService, public popoverCtrl: PopoverController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    // Workaround: https://github.com/dimpu/angular2-markdown/issues/65
    // this.markdownService.setMarkedOptions({gfm: true, breaks: true, sanitize: true});
    this.markdownService.setMarkedOptions({gfm: true, breaks: true});
    this.icons = Icon;
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery<any>({query: ViewerHeroQuery});
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.purpose = data && data.viewer && data.viewer.purpose;
      const hero = data && data.viewer && data.viewer.hero;
      if (hero) {
        this.hero = hero;
      }
    });
  }

  ionViewDidEnter() {
    this.query$.refetch()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HeroPage');
  }

  updateAvatar() {
    let prompt = this.alertCtrl.create({
      title: 'Avatar',
      inputs: [
        {
          name: 'avatar',
          placeholder: 'Image url',
          value: this.hero.avatar,
          type: 'url'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: data => {
            const avatar = data.avatar;
            if (avatar && avatar != this.hero.avatar) {
              this.apollo.mutate({
                mutation: UpdateHeroMutation,
                variables: {avatar}
              }).subscribe();
            }
          }
        }
      ]
    });
    prompt.present();
  }

  updateName() {
    let prompt = this.alertCtrl.create({
      title: 'Name',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: this.hero.name
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: data => {
            const name = data.name;
            if (name && name != this.hero.name) {
              this.apollo.mutate({
                mutation: UpdateHeroMutation,
                variables: {name}
              }).subscribe();
            }
          }
        }
      ]
    });
    prompt.present();
  }

  updatePurpose() {
    let prompt = this.alertCtrl.create({
      title: 'Purpose',
      inputs: [
        {
          name: 'purpose',
          placeholder: 'Purpose',
          value: this.purpose
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: data => {
            const purpose = data.purpose;
            if (purpose && purpose != this.purpose) {
              // this.userService.updateUser({purpose});
              this.apollo.mutate({
                mutation: UpdatePurposeMutation,
                variables: {purpose}
              }).subscribe();
            }
          }
        }
      ]
    });
    prompt.present();
  }

  update(field, label = '') {
    const title = titleCase(label || field);
    const content = this.hero[field];
    let textModal = this.modalCtrl.create('TextModalPage', {content, title}, {enableBackdropDismiss: false});
    textModal.onDidDismiss(data => {
      if (data && data.content != content) {
        let variables = {};
        variables[field] = data.content;
        this.apollo.mutate({
          mutation: UpdateHeroMutation,
          variables
        }).subscribe();
      }
    });
    textModal.present();
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('JourneyOptionsPage');
    popover.present({ev: source});
  }
}
