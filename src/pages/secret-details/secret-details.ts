import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import * as CryptoJS from 'crypto-js/crypto-js';

@Component({
  selector: 'page-secret-details',
  templateUrl: 'secret-details.html'
})
export class SecretDetailsPage {
  selectedItem: any;
  SECERET_KEY: string = '12345';
  decryptedPassword: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = this.navParams.get('secret');
    //this.decryptedPassword =  CryptoJS.AES.decrypt(this.selectedItem.password, this.SECERET_KEY);
    let bytes = CryptoJS.AES.decrypt(this.selectedItem.password.toString(), this.SECERET_KEY);
    let plaintext = bytes.toString(CryptoJS.enc.Utf8);
    this.decryptedPassword = plaintext;
    console.log(this.selectedItem);

    console.log(this.decryptedPassword);
    debugger;
  }

  openEdit() {
  	
  }
  
}
