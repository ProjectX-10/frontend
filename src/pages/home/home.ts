import { OnInit, Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

import { SecretDetailsPage } from '../secret-details/secret-details';
import { DefaultApi } from '../../providers/api/DefaultApi';
import * as models  from '../../providers/model/models';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the Home page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {

  loading: Loading;
  icons: string[];
  items: Array<models.Secret>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: DefaultApi,
              private storage: Storage, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    
  }

  ngOnInit(): any {

    this.storage.get('user').then((val) => {      
      let query:string = 'userId:' + val.item.id;
      let limit:string = '10';
      let cursor:string = '';
      this.api.secretsSearchGet(query, limit, cursor).subscribe(response => {        
        if (response != null) {
          for (let i in response.items) {
             console.log(response.items[i]); 
             this.items.push(response.items[i]);
          }
        }
      },
        error => {
          this.showError(error);
        
      });
    });    
  }

  itemTapped(event, secret) {
    this.navCtrl.push(SecretDetailsPage, { 'secret': secret });
  }

  openAdd() {
    this.navCtrl.push('AddSecret');
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();
    
    var object = JSON.parse(text._body);
    console.log(object);
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: object.errorMessage,
      buttons: ['OK']
    });
    alert.present();
  }

}

