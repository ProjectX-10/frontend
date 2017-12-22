import { OnInit, Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { EditSecretPage } from '../edit-secret/edit-secret'

import * as CryptoJS from 'crypto-js/crypto-js';

@Component({
  selector: 'page-secret-details',
  templateUrl: 'secret-details.html'
})
export class SecretDetailsPage implements OnInit {
  selectedItem: any;
  SECERET_KEY: string = '';
  decryptedPassword: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    // If we navigated to this page, we will have an item available as a nav param
    
    this.selectedItem = this.navParams.get('secret');
    
  }

  ngOnInit(): any {
    this.storage.get('secretKey').then((value) => {
        this.SECERET_KEY = value;
        let bytes = CryptoJS.AES.decrypt(this.selectedItem.password.toString(), this.SECERET_KEY);
        let plaintext = bytes.toString(CryptoJS.enc.Utf8);
        this.decryptedPassword = plaintext;
        console.log(this.decryptedPassword);

      });
  }

  openEdit() {
  	this.navCtrl.push(EditSecretPage, { 'secret': this.selectedItem });
  }
  
}
