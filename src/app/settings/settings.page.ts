import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

// Firebase imports
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    public alertCtrl: AlertController,
    private afAuth: AngularFireAuth,
    private router: Router,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  async logOut() {
    const confirm = await this.alertCtrl.create({
      header: 'Logging out?',
      message: 'Why are you crying? One cries because one is sad. For example, I cry because others are stupid, and that makes me sad.',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.afAuth.auth.signOut();
            console.log('Signed out');
            this.router.navigateByUrl('/landing');
          }
        },
        {
          text: 'Wait, no',
          handler: () => {
            console.log('Not clicked');
          }
        }
      ]
    });
    return await confirm.present();
  }

  async clearAll() {
    const confirm = await this.alertCtrl.create({
      header: 'Clear all?',
      message: 'Sheldon, dont take this the wrong way, but, you are insane.',
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            const clear = await this.afAuth.authState.subscribe(data => {
              firebase.database().ref(data.uid + '/lists').remove();
              firebase.database().ref(data.uid + '/listsItemsof-/').remove();
            });
            if (clear) {
              const toastie = await this.toastCtrl.create({
                message: `Cleared all lists. It's a clean start.`,
                duration: 3000
              });
              toastie.present();
            }
            console.log('Cleared all lists');
          }
        },
        {
          text: 'No!',
          handler: () => {
            console.log('Not clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  goHome() {
    this.afAuth.authState.subscribe(data => {
      this.router.navigateByUrl('/home/:' + data.uid);
    });
  }

}
