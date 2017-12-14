import { OnInit, Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import { DefaultApi } from '../../providers/api/DefaultApi';

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
  SECERET_KEY: string = '12345';

  userInfo: {secretKey: string} = 
            {secretKey: ''};



  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
  	public formBuilder: FormBuilder, private api: DefaultApi, private loadingCtrl: LoadingController) {

  }

  ngOnInit(): any {
    this.myForm = this.formBuilder.group({
   
      'secretKey': ['', [Validators.required, this.secretKeyValidator.bind(this)]]
    });

    debugger;
    var ciphertext = CryptoJS.AES.encrypt('pwd111', this.SECERET_KEY);
    console.log(ciphertext.toString());

    var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), this.SECERET_KEY);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    console.log(plaintext);
    var shaString = SHA256(ciphertext.toString());
    console.log(shaString.toString());
  }

  onSubmit() {
    this.showLoading();   
    // var request: models.ActivateUserRequest = {} as models.ActivateUserRequest;
    // request.activateCode = this.userInfo.activateCode;

    // this.api.activatePost(request).subscribe(response => {
    //     console.log(response);
    //     this.navCtrl.push('HomePage');
    //   },
    //     error => {
    //       this.showError(error);
        
    //   });
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

    debugger;
    this.loading.dismiss();
    
    var object = JSON.parse(text._body);
    console.log(object);
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: object.errorMessage,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
  
}
