import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { DefaultApi } from '../../providers/api/DefaultApi';

import { Storage } from '@ionic/storage';

import * as models  from '../../providers/model/models';
import { Configuration } from '../../providers/configuration';
import { UserToken } from '../../providers/user-token';

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

  public login() {
    this.showLoading();
    if (this.registerCredentials.email === null || this.registerCredentials.password === null) {
      return this.showError("Please insert credentials");
    } else {
      let request: models.LoginUserRequest = {} as models.LoginUserRequest;
      request.email = this.registerCredentials.email;
      request.password = this.registerCredentials.password;
      this.api.loginPost(request).subscribe(response => {
        if (response.token !== null) {                    
          debugger;
          //response.item = this.registerCredentials.password;          
          this.storage.set('user', response);          
          this.storage.set('passcode', this.registerCredentials.password);          
          this.nav.setRoot('SecretKeyPage');
        } else {
          this.showError("Access Denied");
        }
      },
        error => {
          this.showError(error);
        
      });
    }          
  }

  getConfiguration(login: models.LoginUserResponse): Configuration {
    let configuration:Configuration = new Configuration();
    configuration.apiKey = login.token;
    configuration.accessToken = login.auth.token;
    configuration.username = login.item.email;
    configuration.withCredentials = true;
    return configuration;
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