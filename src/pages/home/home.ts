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

  QUERY_STR: string = '';
  LIMIT: string = '15'
  CURSOR: string = undefined;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: DefaultApi,
              private storage: Storage, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    
  }

  ngOnInit(): any {

    this.storage.get('user').then((val) => {      
      this.QUERY_STR = 'userId:' + val.item.id;      
      this.getSecrets();
    });    
  }

  getSecrets() {
    this.api.secretsSearchGet(this.QUERY_STR, this.LIMIT, this.CURSOR).subscribe(response => {        
        if (response != null) {
          for (let i in response.items) {              
             this.items.push(response.items[i]);
          }
          this.CURSOR = response.nextPageToken;
        }
      },
        error => {
          this.showError(error);
        
      });
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      if (this.CURSOR !== undefined) {
        this.getSecrets();
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }


  itemTapped(event, secret) {
    this.navCtrl.push(SecretDetailsPage, { 'secret': secret });
  }

  deleteItem(event, secret) {  
  debugger;  
    this.api.secretsIdDelete(secret.id).subscribe(response => {        
        //if (response != null) {
          let index: number = this.items.indexOf(secret);
          if (index !== -1) {
              this.items.splice(index, 1);
          } 
        //}
      },
        error => {
          this.showError(error);
        
      });
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
   
    let errorMsg = this.getErrorMessage(text)
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: errorMsg,
      buttons: ['OK']
    });
    alert.present();
  }  

  getErrorMessage(text): string {
    try {
      var object = JSON.parse(text._body);
      return object.errorMessage;
    } catch (e){
      return text;
    }
  }

}

