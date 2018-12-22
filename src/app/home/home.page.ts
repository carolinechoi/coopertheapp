import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Firebase imports
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { auth } from 'firebase/app';

// Observable
import { Observable } from 'rxjs';
import { List } from '../../models/list.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  selectedItem: any;
  list = {} as List;
  listRef: Observable<any[]>;
  List: Observable<any[]>;

  userId: any;

  constructor (
  private afAuth: AngularFireAuth,
  private router: Router,
  private db: AngularFireDatabase) {  }

  addList () {
    this.router.navigateByUrl('/add-list');
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(data => {
      this.listRef = this.db.list(data.uid + '/lists/').valueChanges();
    });
  }

  deleteList($key): void {
    this.afAuth.authState.subscribe(data => {
      const usersRef = firebase.database().ref(data.uid + '/lists/');
      usersRef.orderByChild('name').equalTo($key);
      const ref = usersRef.orderByChild('name').equalTo($key);
      ref.once('value').then(function(snap) {
        snap.forEach(function (childSnap) {
          const pkey = childSnap.key;
          firebase.database().ref(data.uid + '/lists/' + pkey).remove();
          firebase.database().ref(data.uid + '/listsItemsof-/' + $key).remove();
          console.log('removed list');
        });
      });
    });
  }

  itemTapped(event, $name, $color) {
    const name = $name;
    const color = $color;
    // That's right, we're pushing to ourselves!
    this.router.navigate(['/clicked-list', name, color]);
  }
}
