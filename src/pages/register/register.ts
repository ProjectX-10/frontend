import { OnInit, Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { IonicPage } from 'ionic-angular';
//import {OnInit, Component} from "@angular/core";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";



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

  myForm: FormGroup;
  userInfo: {name: string, email: string, phone: string} = {name: '', email: '', phone: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  	public formBuilder: FormBuilder) {

  }

  ngOnInit(): any {
    this.myForm = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.minLength(3), this.nameValidator.bind(this)]],
      'phone': ['', this.phoneValidator.bind(this)],
      'email': ['', [Validators.required, this.emailValidator.bind(this)]]
    });
  }

  onSubmit() {
    console.log('submitting form');
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

  emailValidator(control: FormControl): {[s: string]: boolean} {
    if (!(control.value.toLowerCase().match('^[a-zA-Z]\\w*@gmail\\.com$') || control.value.toLowerCase().match('^[a-zA-Z]\\w*@yahoo\\.com$'))) {
      return {invalidEmail: true};
    }
  }

  openModal() {
    
  }
}