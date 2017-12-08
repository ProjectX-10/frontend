import { OnInit, Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import { DefaultApi } from '../../providers/api/DefaultApi';
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
  //cryptoJS: CryptoJS = null;
  SECERET_KEY: string = '12345';
  secret: {domain: string, username: string, password: string, confirmPassword: string, note: string, secretKey: string} = 
            {domain: 'yahoo.com', username: 'uyphu@yahoo.com', password: '12345', confirmPassword: '12345', note: '12345', secretKey: '12345'};

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
  	public formBuilder: FormBuilder, private api: DefaultApi, private loadingCtrl: LoadingController) {
  	//this.cryptoJS = require("crypto-js");

  }

  ngOnInit(): any {

    this.myForm = this.formBuilder.group({
      'domain': ['', [Validators.required, Validators.minLength(3), this.domainValidator.bind(this)]],
      'username': ['', [Validators.required, this.usernameValidator.bind(this)]],
      'password': ['', [Validators.required, this.passwordValidator.bind(this)]],
      'confirmPassword': ['', [Validators.required, this.passwordValidator.bind(this)]],
      'note': ['', [Validators.required, this.noteValidator.bind(this)]]
    });
  }

  onSubmit() {
  //   this.showLoading();
  //   //var request: models.RegisterUserRequest = {} as models.RegisterUserRequest;
  //   // request.password = this.secret.password;
  //   // request.displayName = this.secret.name;
  //   // request.email = this.secret.email;    
  //   // request.secretKey = this.secret.secretKey;
  //   // request.imageUrl = 'imageUrl';

  //   // this.api.registerPost(request).subscribe(response => {
  //   //     this.navCtrl.push('ActivatePage');
  //   //   },
  //   //     error => {
  //   //       this.showError(error);
        
  //   //   });
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
    console.log(this.getPasswordEcrypted(this.secret.confirmPassword));
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
    this.secret.confirmPassword = ciphertext;
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
    //alert.present(prompt);
  }
}