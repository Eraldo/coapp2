import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ScopeService} from "../../../services/scope/scope";
import gql from "graphql-tag";
import moment from "moment";

const Query = gql`
  query Query($date: String!) {
    viewer {
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private formBuilder: FormBuilder, private scopeService: ScopeService, public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatsPage');
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      // scope: [scope.toUpperCase(), Validators.required],
      // start: [],
      id: [],
      date: [moment().subtract(1, 'day').format('YYYY-MM-DD')],
      area1: [50, Validators.required],
      area2: [50, Validators.required],
      area3: [50, Validators.required],
      area4: [50, Validators.required],
      area5: [50, Validators.required],
      area6: [50, Validators.required],
      area7: [50, Validators.required],
    });

    this.query$ = this.apollo.watchQuery({
      query: Query,
      variables: {date: moment().format('YYYY-MM-DD')}
      // variables: {date: moment().subtract(1, 'day').format('YYYY-MM-DD')}
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.scan = data && data.viewer && data.viewer.scans && data.viewer.scans.edges[0] && data.viewer.scans.edges[0].node;
      if (this.scan) {
        this.form.patchValue(this.scan);
      }
      console.log(this.scan);
    })

  }

  save() {
    if (this.form.valid) {
      const scan = this.form.value;
      console.log(scan);
      if (!scan.id) {
        this.apollo.mutate({
          mutation: CreateScanMutation,
          variables: scan,
        });
      } else {
        this.apollo.mutate({
          mutation: UpdateScanMutation,
          variables: scan
        });
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
