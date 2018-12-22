import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';

// Firebase imports
import * as firebase from 'firebase';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

// Observable
import { Observable } from 'rxjs';
import { Bullet } from '../../models/bullet.interface';

@Component({
  selector: 'app-clicked-list',
  templateUrl: './clicked-list.page.html',
  styleUrls: ['./clicked-list.page.scss'],
})
export class ClickedListPage implements OnInit {

  name: string;
  color: string;
  bullet = {} as Bullet;
  selectedItem: any;
  public press: 0;


  bulletRef: Observable<any[]>;

  userId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
    this.color = this.route.snapshot.paramMap.get('color');
    this.afAuth.authState.subscribe(data => {
      this.bulletRef = this.db.list(data.uid + '/listsItemsof-/' + this.name).valueChanges();
    });
  }

  presentModal() {
    this.router.navigate(['/add-bullet', this.name, this.color]);
  }

  goBack() {
    this.afAuth.authState.subscribe(data => {
      this.router.navigateByUrl('/home/:' + data.uid);
    });
  }

  updateCucumber($key) {
    console.log($key);
    this.afAuth.authState.subscribe(data => {
      const usersRef = firebase.database().ref(data.uid + '/listsItemsof-/' + this.name);
      const ref = usersRef.orderByChild('description').equalTo($key.description);
      const select = this.name;
      const boolean = $key.checked;

      ref.once('value').then(function(snap) {
        snap.forEach(function (childSnap) {
          const pkey = childSnap.key;
          if (boolean === false) {
          firebase.database().ref(data.uid + '/listsItemsof-/' + select + '/' + pkey).child('checked').set(false);
          console.log('changed state to false');
          } if (boolean === true) {
            firebase.database().ref(data.uid + '/listsItemsof-/' + select + '/' + pkey).child('checked').set(true);
            console.log('changed state to true');
          }
        });
      });
    });

  }

  async pressEvent(e, $key) {
    const confirm = await this.alertCtrl.create({
      header: 'Delete this task?',
      buttons: [
        {
          text: 'Yes',
          handler: (): void => {
            this.afAuth.authState.subscribe(data => {
              const usersRef = firebase.database().ref(data.uid + '/listsItemsof-/' + this.name + '/');
              const ref = usersRef.orderByChild('description').equalTo($key);
              const select = this.name;
              ref.once('value').then(function(snap) {
                snap.forEach(function (childSnap) {
                  const pkey = childSnap.key;
                  firebase.database().ref(data.uid + '/listsItemsof-/' + select + '/' + pkey).remove();
                  console.log('removed list');
                });
              });
            });
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('No delete clicked');
          }
        }
      ]
    });
    console.log(e);
    confirm.present();
  }

}
