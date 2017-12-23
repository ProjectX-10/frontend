import { OnInit, Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import { DefaultApi } from '../../providers/api/DefaultApi';
import { Storage } from '@ionic/storage';

import * as models  from '../../providers/model/models';
import * as CryptoJS from 'crypto-js/crypto-js';
import * as SHA256 from 'crypto-js/sha256';

/**
 * Generated class for the ActivatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-secret-key',
  templateUrl: 'secret-key.html',
})
export class SecretKeyPage implements OnInit{

  loading: Loading;
  myForm: FormGroup;
  SECERET_KEY: string = '';
  hasKey: boolean = false; 

  userInfo: {secretKey: string, userId: string, passcode: string} = 
            {secretKey: '', userId: '', passcode: ''};



  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
  	public formBuilder: FormBuilder, private api: DefaultApi, private loadingCtrl: LoadingController,
    private storage: Storage) {

  }

  ngOnInit(): any {
    this.storage.get('user').then((value) => {
      let user: models.User = value.item;
      this.userInfo.userId = user.id;
      if (user.secretKey !== undefined && user.secretKey !== null) {
        this.hasKey = true;
        this.SECERET_KEY = user.secretKey;
      }    
    });

    this.storage.get('passcode').then((value) => {
      this.userInfo.passcode = value;
    });

    this.myForm = this.formBuilder.group({
      'secretKey': ['', [Validators.required, this.secretKeyValidator.bind(this)]]
    });
  }

  onSubmit() {
    this.showLoading();   
    if (this.SECERET_KEY === undefined || this.SECERET_KEY === null || this.SECERET_KEY === '') {
      this.setupSecretkey();
    } else {
      this.validateSecretKey();
    }
  }

  setupSecretkey() {    
    var request: models.UpdateSecretKeyRequest = {} as models.UpdateSecretKeyRequest;    
    request.userId = this.userInfo.userId;    
    let shaString = SHA256(this.userInfo.secretKey.toString());
    request.secretKey = shaString.toString();
    console.log(shaString.toString());

    this.api.usersUpdatesecretkeyPost(request).subscribe(response => {        
        this.navCtrl.push('HomePage');
      },
        error => {
          this.showError(error);
        
      });
  }

  validateSecretKey() {
    

    let shaString = SHA256(this.userInfo.secretKey.toString());
    let secretKey: string = shaString.toString();
    console.log(secretKey);

    if (secretKey === this.SECERET_KEY) {
      this.storage.set('secretKey', this.userInfo.secretKey); 
      this.navCtrl.push('HomePage');
    } else {
      this.showError("Secret Key incorrect!")
    }
  }

  isValid(field: string) {
    //let formField = this.myForm.find(field);
    //return formField.valid || formField.pristine;
    return true;
  }

  secretKeyValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value !== '') {      
    	return {invalidSecretKey: true};
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