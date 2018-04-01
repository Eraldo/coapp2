import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import gql from "graphql-tag";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Apollo} from "apollo-angular";
import {BookQuery} from "../book";

const CreateBookReviewMutation = gql`
  mutation CreateBookReview($book: ID!, $rating: Int!, $area1: Int!, $area2: Int!, $area3: Int!, $area4: Int!, $area5: Int!, $area6: Int!, $area7: Int!, $content: String!) {
    createBookReview(input: {book: $book, rating: $rating, area1: $area1, area2: $area2, area3: $area3, area4: $area4, area5: $area5, area6: $area6, area7: $area7, content: $content}) {
      review {
        id
        rating
        area1
        area2
        area3
        area4
        area5
        area6
        area7
        content
        owner {
          id
          name
        }
        book {
          id
          name
          author
          imageUrl
          url
          content
          rating
          areaRatings
          reviewed
          reviews: bookReviews {
            edges {
              node {
                id
                rating
                area1
                area2
                area3
                area4
                area5
                area6
                area7
                content
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
  selector: 'page-book-review-form',
  templateUrl: 'book-review-form.html',
})
export class BookReviewFormPage {
  loading = true;
  query$;
  form: FormGroup;
  book;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    const id = this.navParams.get('id');
    if (!id) {
      this.navCtrl.pop();
    }
    this.form = this.formBuilder.group({
      book: [],
      rating: [, [Validators.required, Validators.min(1), Validators.max(5)]],
      area1: [, [Validators.required, Validators.min(0), Validators.max(100)]],
      area2: [, [Validators.required, Validators.min(0), Validators.max(100)]],
      area3: [, [Validators.required, Validators.min(0), Validators.max(100)]],
      area4: [, [Validators.required, Validators.min(0), Validators.max(100)]],
      area5: [, [Validators.required, Validators.min(0), Validators.max(100)]],
      area6: [, [Validators.required, Validators.min(0), Validators.max(100)]],
      area7: [, [Validators.required, Validators.min(0), Validators.max(100)]],
      content: ['', [Validators.required]],
    });
    this.apollo.watchQuery<any>({
      query: BookQuery,
      variables: {id}
    }).valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.form.patchValue({book: data.book.id});
      this.book = data.book;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookReviewFormPage');
  }

  save() {
    if (this.form.valid) {
      const review = this.form.value;
      if (review.book) {
        this.apollo.mutate({
          mutation: CreateBookReviewMutation,
          variables: review,
        }).subscribe();
        this.navCtrl.pop();
      }
    }
  }

  showTutorial(name) {
    this.navCtrl.push('TutorialPage', {name: 'Academy'});
  }

}
