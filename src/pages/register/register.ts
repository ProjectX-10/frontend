import { OnInit, Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
//import { IonicPage } from 'ionic-angular';
//import {OnInit, Component} from "@angular/core";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import { DefaultApi } from '../../providers/api/DefaultApi';

import * as models  from '../../providers/model/models';


/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {

  loading: Loading;
  myForm: FormGroup;
  userInfo: {name: string, email: string, password: string, confirmPassword: string, secretKey: string} = 
            {name: '', email: '', password: '', confirmPassword: '', secretKey: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
  	public formBuilder: FormBuilder, private api: DefaultApi, private loadingCtrl: LoadingController) {

  }

  ngOnInit(): any {
    this.myForm = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.minLength(3), this.nameValidator.bind(this)]],      
      'email': ['', [Validators.required, this.emailValidator.bind(this)]],
      'password': ['', [Validators.required, this.passwordValidator.bind(this)]],
      'confirmPassword': ['', [Validators.required, this.passwordValidator.bind(this)]],
      'secretKey': ['', [Validators.required, this.passwordValidator.bind(this)]]
    });
  }

  onSubmit() {
    console.log('submitting form');
    var request: models.RegisterUserRequest = {} as models.RegisterUserRequest;
    request.password = this.userInfo.password;
    request.displayName = this.userInfo.name;
    request.email = this.userInfo.email;    
    request.secretKey = this.userInfo.secretKey;
    request.imageUrl = 'imageUrl';

    console.log(request);
    debugger;
    this.api.registerPost(request).subscribe(response => {
        console.log(response);
      },
        error => {
          this.showError(error);
        
      });
  }

  isValid(field: string) {
    //let formField = this.myForm.find(field);
    //return formField.valid || formField.pristine;
    return true;
  }

  nameValidator(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match("^[a-zA-Z ,.'-]+$")) {
      return {invalidName: true};
    }
  }

  phoneValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value !== '') {
      if (!control.value.match('\\(?\\d{3}\\)?-? *\\d{3}-? *-?\\d{4}')) {
        return {invalidPhone: true};
      }
    }
  }

  passwordValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value !== '') {
      //if (!control.value.match('\\(?\\d{3}\\)?-? *\\d{3}-? *-?\\d{4}')) {
        return {invalidPassword: true};
      //}
    }
  }

  emailValidator(control: FormControl): {[s: string]: boolean} {
    if (!(control.value.toLowerCase().match('^[a-zA-Z]\\w*@gmail\\.com$') || control.value.toLowerCase().match('^[a-zA-Z]\\w*@yahoo\\.com$'))) {
      return {invalidEmail: true};
    }
  }

  confirmEmailValidator(email: FormControl, confirmEmail: FormControl): {[s: string]: boolean} {
    if (!(email.value.toLowerCase() == confirmEmail.value.toLowerCase())) {
      return {invalidConfirmEmail: true};
    }

  }

  showError(text) {
    debugger;
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
  
}