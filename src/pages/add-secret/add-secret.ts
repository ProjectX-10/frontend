import { OnInit, Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import { Storage } from '@ionic/storage';
import { DefaultApi } from '../../providers/api/DefaultApi';
//import { Configuration } from '../../providers/configuration';
import { Utils } from '../../utils/utils';

import * as models  from '../../providers/model/models';
import * as CryptoJS from 'crypto-js/crypto-js';
/**
 * Generated class for the AddSecret page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-secret',
  templateUrl: 'add-secret.html',
})
export class AddSecret implements OnInit {

  loading: Loading;
  myForm: FormGroup;
  SECERET_KEY: string = '';

  secret: {userId: string, domain: string, username: string, password: string, encryptedPassword: string, note: string, secretKey: string} = 
          {userId: '', domain: '', username: '', password: '', encryptedPassword: '', note: '', secretKey: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
  	public formBuilder: FormBuilder, private api: DefaultApi, private loadingCtrl: LoadingController, private storage: Storage
    ) {

  }

  ngOnInit(): any {

    this.storage.get('user').then((val) => {
      let loginUser: models.LoginUserResponse = val;
      this.SECERET_KEY = loginUser.item.secretKey;
      this.secret.userId = loginUser.item.id;      
      this.api.configuration = Utils.getConfiguration(loginUser);     
      debugger
      this.api.secretsIdGet('fee26f8d-5f51-46d1-ba2d-e6424785c9f3').subscribe(response => {        
        //this.navCtrl.push('HomePage');
        debugger;
        console.log(response.item);
      },
        error => {
          this.showError(error);
        
      }); 
    });
    
    this.myForm = this.formBuilder.group({
      'domain': ['', [Validators.required, Validators.minLength(3), this.domainValidator.bind(this)]],
      'username': ['', [Validators.required, this.usernameValidator.bind(this)]],
      'password': ['', [Validators.required, this.passwordValidator.bind(this)]],
      'encryptedPassword': ['', [Validators.required, this.passwordValidator.bind(this)]],
      'note': ['', [Validators.required, this.noteValidator.bind(this)]]
    });
    
  }

  onSubmit() {
    this.showLoading();
    var request: models.InsertSecretRequest = {} as models.InsertSecretRequest;
    request.userId = this.secret.userId;
    request.domain = this.secret.domain;
    request.username = this.secret.username;
    request.password = this.secret.encryptedPassword;    
    request.note = this.secret.note;
    debugger;
    this.api.secretsPost(request).subscribe(response => {        
        this.navCtrl.push('HomePage');
      },
        error => {
          this.showError(error);
        
      });
  }

  inputTestData() {
    var request: models.InsertSecretRequest = {} as models.InsertSecretRequest;
    for (var i = 0; i < 40; i++) {
      request.userId = this.secret.userId;
      request.domain = 'domain' + i;
      request.username = 'username' + i;
      var ciphertext = CryptoJS.AES.encrypt('password' + i, this.SECERET_KEY);
      request.password = ciphertext.toString();   
      request.note = 'note' + i;

      this.api.secretsPost(request).subscribe(response => {        
          //this.navCtrl.push('HomePage');
          //console.log(response);
        },
          error => {
            this.showError(error);
          
        });
    }
  }

  isValid(field: string) {
    //let formField = this.myForm.find(field);
    //return formField.valid || formField.pristine;
    return true;
  }

  domainValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value !== '') {
      return {invalidDomain: true};
    }
  }

  usernameValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value !== '') {
      return {invalidUsername: true};
    }
  }

  passwordValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value !== '') {      
        return {invalidPassword: true};      
    }
  }

  noteValidator(control: FormControl): {[s: string]: boolean} {
        return {invalidNote: true};
  }

  onInputTime(password: string){
  	this.setPasswordEncrypted(password);
    //console.log(this.getPasswordEcrypted(this.secret.encryptedPassword));
  }

  getPasswordEcrypted(pwd: string): string {
    // Decrypt 
    var bytes = CryptoJS.AES.decrypt(pwd.toString(), this.SECERET_KEY);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
  }

  setPasswordEncrypted(pwd: string): void {
    // Encrypt 
    var ciphertext = CryptoJS.AES.encrypt(pwd, this.SECERET_KEY);
    this.secret.encryptedPassword = ciphertext.toString();
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