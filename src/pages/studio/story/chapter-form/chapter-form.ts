import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ExperienceQuery} from "../../../../components/app-toolbar/app-toolbar";
import {Icon} from "../../../../models/icon";

const Query = gql`
  query Query($id: ID!) {
    chapter(id: $id) {
      id
      name
      content
      created
    }
  }
`;

const CreateChapterMutation = gql`
  mutation CreateChapter($name: String!, $content: String!) {
    addChapter(input: {name: $name, content: $content}) {
      chapter {
        id
        name
        content
        created
      }
    }
  }
`;

const UpdateChapterMutation = gql`
  mutation UpdateChapter($id: ID!, $name: String!, $content: String) {
    updateChapter(input: {id: $id, name: $name, content: $content}) {
      chapter {
        id
        name
        content
      }
    }
  }
`;

const DeleteChapterMutation = gql`
  mutation DeleteChapter($id: ID!) {
    deleteChapter(input: {id: $id}) {
      success
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-chapter-form',
  templateUrl: 'chapter-form.html',
})
export class ChapterFormPage {
  icons = Icon;
  query$;
  loading = true;
  chapter;
  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    const id = this.navParams.get('id');

    this.form = this.formBuilder.group({
      id: [''],
      name: [''],
      content: [''],
    });

    if (id) {
      this.query$ = this.apollo.watchQuery({
        query: Query,
        variables: {id}
      });
      this.query$.valueChanges.subscribe(({data, loading}) => {
        this.loading = loading;
        this.chapter = data && data.chapter;
        this.form.patchValue(this.chapter)
      })
    } else {
      this.loading = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChapterFormPage');
  }

  save() {
    if (this.form.valid) {
      const chapter = this.form.value;
      if (!chapter.id) {
        this.apollo.mutate({
          mutation: CreateChapterMutation,
          variables: {
            name: chapter.name,
            content: chapter.content,
          },
          refetchQueries: [{query: ExperienceQuery}]
        }).subscribe();
        this.navCtrl.pop();
      } else {
        this.apollo.mutate({
          mutation: UpdateChapterMutation,
          variables: {
            id: chapter.id,
            name: chapter.name,
            content: chapter.content,
          }
        }).subscribe();
        this.navCtrl.pop();
      }
    }
  }

  delete() {
    const id = this.form.value.id;
    this.apollo.mutate({
      mutation: DeleteChapterMutation,
      variables: {
        id
      }
    }).subscribe();
    this.navCtrl.pop();
  }
}
