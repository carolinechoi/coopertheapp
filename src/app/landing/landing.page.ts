import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private afAuth: AngularFireAuth
  ) { }

  // goLogin () {
  //   console.log('clicked');
  //   this.router.navigateByUrl('login');
  // }

  // goSignup () {
  //   this.router.navigateByUrl('signup');
  // }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user: firebase.User) => {
      if (user) {
        this.router.navigateByUrl('/home/:' + user.uid);
      } else { }
    });
  }

}
