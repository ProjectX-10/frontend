import { OnInit, Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

import { SecretDetailsPage } from '../secret-details/secret-details';
import { DefaultApi } from '../../providers/api/DefaultApi';
import * as models  from '../../providers/model/models';
import { Storage } from '@ionic/storage';
import { Utils } from '../../utils/utils';

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

  searchInput: string = '';

  QUERY_STR: string = '';
  LIMIT: string = '15'
  CURSOR: string = undefined;
  SEARCH_TEXT: string = undefined;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: DefaultApi,
              private storage: Storage, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];
    this.items = [];    
  }

  ngOnInit(): any {

    this.storage.get('user').then((val) => {  
      if (val === undefined || val === null) {
        this.navCtrl.setRoot('LoginPage');
      } else {
        let loginUser: models.LoginUserResponse = val; 
        this.QUERY_STR = 'userId:' + loginUser.item.id;   
        this.api.configuration = Utils.getConfiguration(loginUser);  
        this.getSecrets(this.QUERY_STR);  
      }        
    });    
  }  

  getSecrets(query:string) {
    this.api.secretsSearchGet(query, this.LIMIT, this.CURSOR).subscribe(response => {       
        if (response != null && response.items.length > 0) {
          for (let i in response.items) {              
             this.items.push(response.items[i]);
          }
          this.CURSOR = response.nextPageToken;
        } else {
          this.CURSOR = undefined;
        }
      },
        error => {
          this.showError(error);
        
      });
  }

  doInfinite(infiniteScroll) {
    if (this.CURSOR !== undefined) {
      setTimeout(() => {
        if (this.SEARCH_TEXT !== undefined) {
          this.getSecrets(this.SEARCH_TEXT);
        } else {
          this.getSecrets(this.QUERY_STR);
        }
        
        infiniteScroll.complete();
      }, 250);
    }
  }


  itemTapped(event, secret) {
    console.log("itemTapped");
    console.log(secret)
    this.navCtrl.push(SecretDetailsPage, { 'secret': secret });
  }

  onInput(event) {
    if (this.searchInput.length >= 3) {
      this.items = [];
      this.CURSOR = undefined;
      console.log(this.searchInput);
      this.SEARCH_TEXT = this.QUERY_STR + '&searchText:' + this.searchInput;
      this.getSecrets(this.SEARCH_TEXT);
    } else if (this.searchInput.length == 0) {
      this.SEARCH_TEXT = undefined;
      this.CURSOR = undefined;
      this.items = [];
      this.getSecrets(this.QUERY_STR);
    } 
    
  }

  onCancel(event) {

  }

  deleteItem(event, secret) {  
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

