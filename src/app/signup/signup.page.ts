import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

// Firebase imports
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

// Model import
import { User } from '../../models/user.interface';
import { List } from '../../models/list.interface';
import { Bullet } from '../../models/bullet.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  newUser = {} as User;

  constructor(
    private afAuth: AngularFireAuth,
    private toast: ToastController,
    private router: Router) {
  }

  ngOnInit() {
  }

  async addUser(newUser) {
    console.log('starting auth');
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password);
      console.log(result);
      if (result) {
        const user = this.afAuth.auth.currentUser;
        this.router.navigateByUrl('home/:' + user.uid);
        const toastie = await this.toast.create({
          message: `We're all given the same hours in a day. Are you ready to maximise yours?`,
          duration: 3000
        });
        toastie.present();
      }
    } catch (e) {
      const toastie = await this.toast.create({
        color: 'primary',
        message:   `Let's try again: ` + `${e}`.substr(7),
        duration: 2000
      });
      toastie.present();
    }
  }
}
