import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

// Firebase imports
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase';

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

  list = {} as List;
  newListRef$: AngularFireList<List>;

  bullet = {} as Bullet;
  newBulletRef$: AngularFireList<Bullet>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
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

        // Pushing a new list
        this.newListRef$ = this.db.list(user.uid + '/lists');
        this.newListRef$.push({
          name: 'Swipe me right to delete!',
          color: '#f55f7c'
        });

        // Pushing an example bullet
        this.newBulletRef$ = this.db.list(user.uid + '/listsItemsof-/Swipe me right to delete!');
        this.newBulletRef$.push({
          description: 'Tap me to check me off!',
          checked: false
        });
        this.newBulletRef$.push({
          description: 'Press and hold to delete me!',
          checked: false
        });
        this.newBulletRef$.push({
          description: 'That little round button down there? Use it to add more tasks!',
          checked: false
        });
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
