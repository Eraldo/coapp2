import {Component} from '@angular/core';
import {
  AlertController, IonicPage, ModalController, NavController, NavParams,
  PopoverController
} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {titleCase} from "../../../utils/utils";
import {Icon} from "../../../models/icon";
import {OptionsMenuService} from "../../../services/options-menu/options-menu";

const DemonFragment = gql`
  fragment Demon on DemonNode {
    id
    name
    avatar
    tensions
    fears
    content
    modified
  }
`;

const TensionFragment = gql`
  fragment Tension on TensionNode {
    id
    name
    content
  }
`;

const ViewerDemonQuery = gql`
  query {
    viewer {
      id
      tensions {
        totalCount
        edges {
          node {
            ...Tension
          }
        }
      }
      demon {
        ...Demon
      }
    }
  }
  ${TensionFragment}
  ${DemonFragment}
`;

export const CreateTensionMutation = gql`
  mutation CreateTension($name: String!, $content: String) {
    createTension(input: {name: $name, content: $content}) {
      tension {
        id
        name
        content
      }
    }
  }
`;

const UpdateDemonMutation = gql`
  mutation updateDemon($name: String, $avatar: String, $tensions: String, $fears: String, $content: String) {
    updateDemon(input: {name: $name, avatar: $avatar, tensions: $tensions, fears: $fears, content: $content}) {
      demon {
        ...Demon
      }
    }
  }

`;

const DeleteTensionMutation = gql`
  mutation DeleteTension($id: ID!) {
    deleteTension(input: {id: $id}) {
      success
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-demon',
  templateUrl: 'demon.html',
})
export class DemonPage {
  query$;
  loading = true;
  demon;
  tensions;
  icons;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apollo: Apollo,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public optionsMenuService: OptionsMenuService,
  ) {
    this.icons = Icon;
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({query: ViewerDemonQuery});
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.demon = data && data.viewer && data.viewer.demon;
      this.tensions = data && data.viewer && data.viewer.tensions;
    });
  }

  refresh() {
    this.query$.refetch();
  }

  ionViewDidEnter() {
    this.refresh();
  }

  updateAvatar() {
    let prompt = this.alertCtrl.create({
      title: 'Avatar',
      inputs: [
        {
          name: 'avatar',
          placeholder: 'Image url',
          value: this.demon.avatar,
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
            if (avatar && avatar != this.demon.avatar) {
              this.apollo.mutate({
                mutation: UpdateDemonMutation,
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
          value: this.demon.name
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
            if (name && name != this.demon.name) {
              this.apollo.mutate({
                mutation: UpdateDemonMutation,
                variables: {name}
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
    const content = this.demon[field];
    let textModal = this.modalCtrl.create('TextModalPage', {content, title}, {enableBackdropDismiss: false});
    textModal.onDidDismiss(data => {
      if (data && data.content != content) {
        let variables = {};
        variables[field] = data.content;
        this.apollo.mutate({
          mutation: UpdateDemonMutation,
          variables
        }).subscribe();
      }
    });
    textModal.present();
  }

  public addTension(name = '') {

    let prompt = this.alertCtrl.create({
      title: 'Tension',
      inputs: [
        {
          name: 'tension',
          placeholder: 'My tension...',
          value: name
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
            const name = data.tension;
            if (name && name.length >= 4) {
              this.apollo.mutate({
                mutation: CreateTensionMutation,
                variables: {
                  name: name,
                  content: ''
                }
              }).subscribe(() => this.query$.refetch());
            } else {
              // TODO: Show error message: "Note has to be at least 4 characters long."
              this.addTension(name)
            }
          }
        }
      ]
    });
    prompt.present();
  }

  deleteTension(id) {
    this.apollo.mutate({
      mutation: DeleteTensionMutation,
      variables: {id},
    }).subscribe(() => this.query$.refetch());
  }

  processTensions() {
    console.log('Tension processing under construction.')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DemonPage');
  }

  showOptions(event) {
    let options = [
      {
        text: 'Refresh',
        handler: () => {
          this.refresh();
        }
      },
      {
        text: 'Show tutorial',
        handler: () => {
          this.navCtrl.push('TutorialPage', {name: 'Demon'})
        }
      },
    ];
    this.optionsMenuService.showOptions(options, event);
  }
}
