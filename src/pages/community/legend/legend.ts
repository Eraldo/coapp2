import {Component} from '@angular/core';
import {
  AlertController,
  IonicPage, LoadingController,
  ModalController,
  NavController,
  NavParams,
  PopoverController,
  ToastController
} from 'ionic-angular';
import {ANONYMOUS_USER} from "../../../models/user";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {Icon} from "../../../models/icon";
import {titleCase} from "../../../utils/utils";
import {UserService} from "../../../services/user/user";
import {OptionsMenuService} from "../../../services/options-menu/options-menu";

const UserQuery = gql`
  query User($id: ID!) {
    viewer {
      id
    }
    user(id: $id) {
      id
      username
      name
      title
      avatar(size: LARGE)
      gender
      purpose
      status
      dateJoined
      level
      isPremium
      roles {
        edges {
          node {
            id
            icon
          }
        }
      }
      hero {
        id
        avatar
        name
      }
      demon {
        id
        avatar
        name
      }
    }
  }
`;

const UpdateUsernameMutation = gql`
  mutation UpdateUsername($username: String!) {
    updateUser(input: {username: $username}) {
      user {
        id
        username
      }
    }
  }
`;

const UpdateNameMutation = gql`
  mutation UpdateName($name: String!) {
    updateUser(input: {name: $name}) {
      user {
        id
        name
      }
    }
  }
`;

export const UpdateAvatarMutation = gql`
  mutation UpdateAvatar($avatar: Upload) {
    updateUser(input: {avatar: $avatar}) {
      user {
        id
        avatar
        largeAvatar: avatar(size: LARGE)
      }
    }
  }
`;

const UpdateGenderMutation = gql`
  mutation UpdateGender($gender: String!) {
    updateUser(input: {gender: $gender}) {
      user {
        id
        gender
      }
    }
  }
`;

export const UpdatePurposeMutation = gql`
  mutation UpdatePurpose($purpose: String!) {
    updateUser(input: {purpose: $purpose}) {
      user {
        id
        purpose
      }
    }
  }
`;

const UpdateStatusMutation = gql`
  mutation UpdateStatus($status: String!) {
    updateUser(input: {status: $status}) {
      user {
        id
        status
      }
    }
  }
`;

const ContactUserMutation = gql`
  mutation ContactUser($id: ID!, $subject: String, $message: String) {
    contactUser(input: {id: $id, subject: $subject, message: $message}) {
      success
    }
  }
`;

interface User {
  id
  username
  name
  title
  avatar
  gender
  purpose
  status
  dateJoined
  level
}

interface UserResponse {
  user: User
  loading
}


@IonicPage({
  segment: 'legend/:id'
})
@Component({
  selector: 'page-legend',
  templateUrl: 'legend.html',
})
export class LegendPage {
  icons;
  loading = true;
  query$;
  viewer;
  user;
  default_image = ANONYMOUS_USER.avatar;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    private apollo: Apollo,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public userService: UserService,
    public optionsMenuService: OptionsMenuService,
  ) {
    this.icons = Icon;
  }

  ngOnInit(): void {
    const id = this.navParams.get('id');
    this.query$ = this.apollo.watchQuery({
      query: UserQuery,
      variables: {id}
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.viewer = data.viewer;
      this.user = data.user;
    });
  }

  refresh() {
    this.query$.refetch();
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
        text: 'Logout',
        handler: () => {
          this.userService.logout().then(() => this.navCtrl.setRoot('WelcomePage'));
        }
      },
      {
        text: 'Show tutorial',
        handler: () => {
          this.navCtrl.push('TutorialPage', {name: 'Legend'})
        }
      },
    ];
    this.optionsMenuService.showOptions(options, event);
  }

  updateName() {
    if (this.user.id == this.viewer.id) {
      let prompt = this.alertCtrl.create({
        title: 'Name',
        inputs: [
          {
            name: 'name',
            placeholder: 'Name',
            value: this.user.name
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
              if (name && name != this.user.name) {
                this.apollo.mutate({
                  mutation: UpdateNameMutation,
                  variables: {name}
                }).subscribe();
              }
            }
          }
        ]
      });
      prompt.present();
    }
  }

  updateUsername() {
    if (this.user.id == this.viewer.id) {
      let prompt = this.alertCtrl.create({
        title: 'Username',
        inputs: [
          {
            name: 'username',
            placeholder: 'Username',
            value: this.user.username
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: data => {
              const username = data.username;
              if (username && username.length >= 4) {
                this.apollo.mutate({
                  mutation: UpdateUsernameMutation,
                  variables: {
                    username: username
                  }
                }).subscribe();
              } else {
                // TODO: Show error message: "Username has to be at least 4 characters long."
              }
            }
          }
        ]
      });
      prompt.present();
    }
  }

  updatePurpose() {
    if (this.user.id == this.viewer.id) {
      let prompt = this.alertCtrl.create({
        title: 'Purpose',
        inputs: [
          {
            name: 'purpose',
            placeholder: 'Purpose',
            value: this.user.purpose
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
              if (purpose && purpose != this.user.purpose) {
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
  }

  updateStatus() {
    if (this.user.id == this.viewer.id) {
      let prompt = this.alertCtrl.create({
        title: 'Status',
        inputs: [
          {
            name: 'status',
            placeholder: 'My status...',
            value: this.user.status
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: data => {
              const status = data.status;
              if (status && status.length >= 4) {
                this.apollo.mutate({
                  mutation: UpdateStatusMutation,
                  variables: {
                    status: status
                  }
                }).subscribe();
              } else {
                // TODO: Show error message: "Status has to be at least 4 characters long."
              }
            }
          }
        ]
      });
      prompt.present();
    }
  }

  updateGender() {
    if (this.user.id == this.viewer.id) {
      let prompt = this.alertCtrl.create({
        title: 'Gender',
        inputs: [
          {
            type: 'radio',
            label: 'Male',
            value: 'M',
            checked: this.user.gender == 'M'
          },
          {
            type: 'radio',
            label: 'Female',
            value: 'F',
            checked: this.user.gender == 'F'
          },
          {
            type: 'radio',
            label: 'Neutral',
            value: 'N',
            checked: this.user.gender == 'N'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: data => {
              const gender = data;
              this.apollo.mutate({
                mutation: UpdateGenderMutation,
                variables: {
                  gender: gender
                }
              }).subscribe();
            }
          }
        ]
      });
      prompt.present();
    }
  }

  updateAvatar() {
    if (this.user.id == this.viewer.id) {
      let loading = this.loadingCtrl.create({
        content: "Opening image editor...",
      });
      loading.present();

      const title = 'Avatar Image';
      const image = this.user.avatar;
      let imageModal = this.modalCtrl.create('ImageModalPage', {image, title}, {enableBackdropDismiss: false});
      imageModal.onDidDismiss(data => {
        if (data && data.image != image) {
          this.apollo.mutate({
            mutation: UpdateAvatarMutation,
            variables: {avatar: data.image}
          }).subscribe();
        }
      });
      imageModal.present().then(() => loading.dismiss());
    }
  }

  contact() {
    let prompt = this.alertCtrl.create({
      title: 'Message',
      message: `To: ${this.user.name || this.user.username}`,
      inputs: [
        {
          name: 'message',
          placeholder: 'My message...',
          value: ''
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            const message = data.message;
            this.apollo.mutate({
              mutation: ContactUserMutation,
              variables: {id: this.user.id, message}
            }).subscribe();
          }
        }
      ]
    });
    prompt.present();
  }

  showPremiumMessage() {
    let toast = this.toastCtrl.create({
      message: `Premium Legend! :D`,
      duration: 2000
    });
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LegendPage');
  }

}
