import { Http, XHRBackend, RequestOptions, HttpModule } from '@angular/http';
import { AuthService } from './../providers/auth-service';
import { DefaultApi } from './../providers/api/DefaultApi';
import { Utils } from './../utils/utils';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { SecretDetailsPage } from '../pages/secret-details/secret-details';
import { EditSecretPage } from '../pages/edit-secret/edit-secret';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { ProfilePage } from '../pages/profile/profile';

import { InterceptorHttp } from '../providers/http/interceptor-http';
import { IonicStorageModule } from '@ionic/storage';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    SecretDetailsPage,
    EditSecretPage,
    ListPage,
    LoginPage,
    LogoutPage,
    ProfilePage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    SecretDetailsPage,
    EditSecretPage,
    ListPage,
    LoginPage,
    LogoutPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    DefaultApi,
    Utils
  ]
})
export class AppModule {}
