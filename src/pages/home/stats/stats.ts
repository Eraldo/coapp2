import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import gql from "graphql-tag";
import moment from "moment";

const Query = gql`
  query Query($date: String!) {
    viewer {
      id
      scans(date: $date) {
        edges {
          node {
            id
            date
            area1
            area2
            area3
            area4
            area5
            area6
            area7
          }
        }
      }
    }
  }
`;

const CreateScanMutation = gql`
  mutation CreateScan($area1: Int, $area2: Int, $area3: Int, $area4: Int, $area5: Int, $area6: Int, $area7: Int) {
    createScan(input: {area1: $area1, area2: $area2, area3: $area3, area4: $area4, area5: $area5, area6: $area6, area7: $area7}) {
      scan {
        id
        date
        area3
        area2
        area3
        area4
        area5
        area6
        area7
      }
    }
  }
`;

const UpdateScanMutation = gql`
  mutation UpdateScan($id: ID!, $area1: Int, $area2: Int, $area3: Int, $area4: Int, $area5: Int, $area6: Int, $area7: Int) {
    updateScan(input: {id: $id, area1: $area1, area2: $area2, area3: $area3, area4: $area4, area5: $area5, area6: $area6, area7: $area7}) {
      scan {
        id
        date
        area3
        area2
        area3
        area4
        area5
        area6
        area7
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {
  loading = true;
  query$;
  scan;
  private form: FormGroup;

  get today() {
    return moment().format('YYYY-MM-DD');
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private formBuilder: FormBuilder, public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatsPage');
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [],
      date: [this.today],
      area1: [,Validators.required],
      area2: [, Validators.required],
      area3: [, Validators.required],
      area4: [, Validators.required],
      area5: [, Validators.required],
      area6: [, Validators.required],
      area7: [, Validators.required],
    });

    this.query$ = this.apollo.watchQuery({
      query: Query,
      variables: {date: this.today}
    });
    this.query$.subscribe(data => this.processQuery(data))
  }

  ionViewDidEnter() {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.query$.refetch(this.today).then(data => this.processQuery(data));
  }

  processQuery({data, loading}) {
    this.loading = loading;
    this.scan = data && data.viewer && data.viewer.scans && data.viewer.scans.edges[0] && data.viewer.scans.edges[0].node;
    if (this.scan) {
      this.form.patchValue(this.scan);
    } else {
      this.form.reset();
    }
  }

  save() {
    if (this.form.valid) {
      const scan = this.form.value;
      // console.log(scan);
      this.loading = true;
      if (!scan.id) {
        this.apollo.mutate({
          mutation: CreateScanMutation,
          variables: scan,
          refetchQueries: [
            {query: Query, variables: {date: this.today}},
          ]
        })
      } else {
        this.apollo.mutate({
          mutation: UpdateScanMutation,
          variables: scan,
          refetchQueries: [
            {query: Query, variables: {date: this.today}},
          ]
        })
      }
    }
  }

  showTutorial(name) {
    this.navCtrl.push('TutorialPage', {name})
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('HomeOptionsPage');
    popover.present({ev: source});
  }
}
