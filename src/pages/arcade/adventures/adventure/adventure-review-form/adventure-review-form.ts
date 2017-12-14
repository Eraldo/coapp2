import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdventureQuery} from "../adventure";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
// import {AdventuresQuery} from "../../adventures";

const CreateAdventureReviewMutation = gql`
  mutation CreateAdventureReview($adventure: ID!, $rating: Int!, $content: String!, $imageUrl: String) {
    createAdventureReview(input: {adventure: $adventure, rating: $rating, content: $content, imageUrl: $imageUrl}) {
      review {
        id
        rating
        content
        imageUrl
        adventure {
          id
          imageUrl
          rating
          completed
          reviews: adventureReviews {
            edges {
              node {
                id
                rating
                content
                imageUrl
                owner {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-adventure-review-form',
  templateUrl: 'adventure-review-form.html',
})
export class AdventureReviewFormPage {
  loading = true;
  query$;
  form: FormGroup;
  adventure;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    const id = this.navParams.get('id');
    if (!id) {
      this.navCtrl.pop();
    }
    this.form = this.formBuilder.group({
      adventure: [],
      rating: [, [Validators.required, Validators.min(1), Validators.max(5)]],
      imageUrl: [],
      content: ['', [Validators.required]],
    });
    this.apollo.watchQuery<any>({
      query: AdventureQuery,
      variables: {id}
    }).subscribe(({data, loading}) => {
      this.loading = loading;
      this.form.patchValue({adventure: data.adventure.id});
      this.adventure = data.adventure;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdventureReviewFormPage');
  }

  save() {
    if (this.form.valid) {
      const review = this.form.value;
      if (review.adventure) {
        this.apollo.mutate({
          mutation: CreateAdventureReviewMutation,
          variables: review,
          // refetchQueries: [
          //   {query: AdventuresQuery, variables: {completed: true}},
          //   {query: AdventuresQuery, variables: {completed: false}}
          // ]
        }).subscribe();
        this.navCtrl.pop();
      }
    }
  }

}
