import { Component, OnInit } from '@angular/core';
import { Router, PRIMARY_OUTLET } from '@angular/router';
import { ToastController } from '@ionic/angular';

// Firebase imports
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

// Model import
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  oldUser = {} as User;

  constructor(
    private afAuth: AngularFireAuth,
    private toast: ToastController,
    private router: Router) {
  }

  ngOnInit() {
  }

  async login(oldUser: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(oldUser.email, oldUser.password);
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
