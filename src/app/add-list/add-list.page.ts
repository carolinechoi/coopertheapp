import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

// Firebase imports
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase';

// Model import
import { List } from '../../models/list.interface';


@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.page.html',
  styleUrls: ['./add-list.page.scss'],
})
export class AddListPage implements OnInit {

  list = {} as List;
  newListRef$: AngularFireList<List>;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    private router: Router) { }

  ngOnInit() {}

  createNewList1(list: List) {
      this.afAuth.authState.subscribe(data => {
        this.newListRef$ = this.db.list(data.uid + '/lists');
        this.newListRef$.push({
          name: this.list.name,
          color: this.list.color
        });
        this.router.navigateByUrl('/home/:' + data.uid);
      });
  }

  goHome() {
    this.afAuth.authState.subscribe(data => {
      this.router.navigateByUrl('/home/:' + data.uid);
    });
  }
}
