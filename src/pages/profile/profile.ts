import { OnInit, Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import * as models  from '../../providers/model/models';

//import { ToastService } from '../../../providers/util/toast.service';
//import { AlertService } from '../../../providers/util/alert.service';
//import { Component } from '@angular/core';
//import { Camera } from '@ionic-native/camera';
//import { IonicPage } from 'ionic-angular';

/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit {

	user:models.User = {} as models.User;

  placeholderPicture = 'assets/avatar/unknown.png';

  languages = ['English'];

  constructor(private storage: Storage
    
  ) { }

  ngOnInit() {
    this.storage.get('user').then((val) => {
      if (val !== null) {
        let loginUser: models.LoginUserResponse = val;
        this.user = loginUser.item;
        this.user.imageUrl = this.placeholderPicture;
      }
    });
  }

}
