import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
// Firebase imports
import * as firebase from 'firebase';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

// Observable
import { Observable } from 'rxjs';
import { Bullet } from '../../models/bullet.interface';

@Component({
  selector: 'app-add-bullet',
  templateUrl: './add-bullet.page.html',
  styleUrls: ['./add-bullet.page.scss'],
})
export class AddBulletPage implements OnInit {
  name: any;
  color: any;
  colorP: any;
  bullet = {} as Bullet;
  newBulletRef$: AngularFireList<Bullet>;
  path: any;
  userId: any;
  constructor(
    private route: ActivatedRoute,
    public nav: NavController,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
  }

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
    this.color = this.route.snapshot.paramMap.get('color');
    this.colorP = this.color.replace('#', '%');
  }

  createBullet(bullet: Bullet) {
    this.afAuth.authState.subscribe(data => {
      this.newBulletRef$ = this.db.list(data.uid + '/listsItemsof-/' + this.name);
      this.newBulletRef$.push({
        description: this.bullet.description,
        checked: false
      });
      this.nav.goBack();
    });
  }

  goBack() {
    this.nav.goBack();
  }

}
