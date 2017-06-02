import {Component, OnInit} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {
  loaded = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    setTimeout(() => {
      this.loaded = true;
    }, 4000)
  }

  exitSplash() {
    this.loaded = true;
  }

  alert() {
    alert('test')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
