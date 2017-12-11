import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { DefaultApi } from '../../providers/api/DefaultApi';

import { Storage } from '@ionic/storage';

import * as models  from '../../providers/model/models';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };  
 
  constructor(private nav: NavController, private auth: AuthService, 
    private alertCtrl: AlertController, private loadingCtrl: LoadingController,
    private api: DefaultApi, private storage: Storage) { }
 
  public createAccount(event) {
    this.nav.push('RegisterPage');
  }
 
  public login1() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {  
        this.nav.setRoot('HomePage');
      } else {
         this.showError("Access Denied");
      }
    },
      error => {
        this.showError(error);
      });
  }

  public login() {
    this.showLoading();
    if (this.registerCredentials.email === null || this.registerCredentials.password === null) {
      return this.showError("Please insert credentials");
    } else {
      let request: models.LoginUserRequest = {} as models.LoginUserRequest;
      request.email = this.registerCredentials.email;
      request.password = this.registerCredentials.password;
      this.api.loginPost(request).subscribe(response => {
        console.log(response);
        if (response.token !== null) {
          this.nav.setRoot('HomePage');
          //this.$sessionStorage.store('user', response);
          this.storage.set('user', response);
        } else {
          this.showError("Access Denied");
        }
      },
        error => {
          this.showError(error);
        
      });
    }          
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
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}