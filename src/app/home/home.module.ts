import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    firebase.auth().onAuthStateChanged((user: firebase.User) => {
      if (user) {
      } else {
        this.router.navigateByUrl('/landing');
      }
    });
  }
}
