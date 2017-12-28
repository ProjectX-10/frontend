webpackJsonp([2],{

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddSecretModule", function() { return AddSecretModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_secret__ = __webpack_require__(300);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddSecretModule = (function () {
    function AddSecretModule() {
    }
    AddSecretModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__add_secret__["a" /* AddSecret */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__add_secret__["a" /* AddSecret */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__add_secret__["a" /* AddSecret */]
            ]
        })
    ], AddSecretModule);
    return AddSecretModule;
}());

//# sourceMappingURL=add-secret.module.js.map

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddSecret; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_api_DefaultApi__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_utils__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_crypto_js_crypto_js__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_crypto_js_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_crypto_js_crypto_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { Configuration } from '../../providers/configuration';


/**
 * Generated class for the AddSecret page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AddSecret = (function () {
    function AddSecret(navCtrl, navParams, alertCtrl, formBuilder, api, loadingCtrl, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.api = api;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.SECERET_KEY = '';
        this.secret = { userId: '', domain: '', username: '', password: '', encryptedPassword: '', note: '', secretKey: '' };
    }
    AddSecret.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('user').then(function (val) {
            var loginUser = val;
            _this.SECERET_KEY = loginUser.item.secretKey;
            _this.secret.userId = loginUser.item.id;
            _this.api.configuration = __WEBPACK_IMPORTED_MODULE_5__utils_utils__["a" /* Utils */].getConfiguration(loginUser);
            debugger;
            _this.api.secretsIdGet('fee26f8d-5f51-46d1-ba2d-e6424785c9f3').subscribe(function (response) {
                //this.navCtrl.push('HomePage');
                debugger;
                console.log(response.item);
            }, function (error) {
                debugger;
                _this.showError(error);
            });
        });
        this.myForm = this.formBuilder.group({
            'domain': ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(3), this.domainValidator.bind(this)]],
            'username': ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, this.usernameValidator.bind(this)]],
            'password': ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, this.passwordValidator.bind(this)]],
            'encryptedPassword': ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, this.passwordValidator.bind(this)]],
            'note': ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, this.noteValidator.bind(this)]]
        });
    };
    AddSecret.prototype.onSubmit = function () {
        var _this = this;
        this.showLoading();
        var request = {};
        request.userId = this.secret.userId;
        request.domain = this.secret.domain;
        request.username = this.secret.username;
        request.password = this.secret.encryptedPassword;
        request.note = this.secret.note;
        debugger;
        this.api.secretsPost(request).subscribe(function (response) {
            _this.navCtrl.push('HomePage');
        }, function (error) {
            _this.showError(error);
        });
    };
    AddSecret.prototype.inputTestData = function () {
        var _this = this;
        var request = {};
        for (var i = 0; i < 40; i++) {
            request.userId = this.secret.userId;
            request.domain = 'domain' + i;
            request.username = 'username' + i;
            var ciphertext = __WEBPACK_IMPORTED_MODULE_6_crypto_js_crypto_js__["AES"].encrypt('password' + i, this.SECERET_KEY);
            request.password = ciphertext.toString();
            request.note = 'note' + i;
            this.api.secretsPost(request).subscribe(function (response) {
                //this.navCtrl.push('HomePage');
                //console.log(response);
            }, function (error) {
                _this.showError(error);
            });
        }
    };
    AddSecret.prototype.isValid = function (field) {
        //let formField = this.myForm.find(field);
        //return formField.valid || formField.pristine;
        return true;
    };
    AddSecret.prototype.domainValidator = function (control) {
        if (control.value !== '') {
            return { invalidDomain: true };
        }
    };
    AddSecret.prototype.usernameValidator = function (control) {
        if (control.value !== '') {
            return { invalidUsername: true };
        }
    };
    AddSecret.prototype.passwordValidator = function (control) {
        if (control.value !== '') {
            return { invalidPassword: true };
        }
    };
    AddSecret.prototype.noteValidator = function (control) {
        return { invalidNote: true };
    };
    AddSecret.prototype.onInputTime = function (password) {
        this.setPasswordEncrypted(password);
        //console.log(this.getPasswordEcrypted(this.secret.encryptedPassword));
    };
    AddSecret.prototype.getPasswordEcrypted = function (pwd) {
        // Decrypt 
        var bytes = __WEBPACK_IMPORTED_MODULE_6_crypto_js_crypto_js__["AES"].decrypt(pwd.toString(), this.SECERET_KEY);
        var plaintext = bytes.toString(__WEBPACK_IMPORTED_MODULE_6_crypto_js_crypto_js__["enc"].Utf8);
        return plaintext;
    };
    AddSecret.prototype.setPasswordEncrypted = function (pwd) {
        // Encrypt 
        var ciphertext = __WEBPACK_IMPORTED_MODULE_6_crypto_js_crypto_js__["AES"].encrypt(pwd, this.SECERET_KEY);
        this.secret.encryptedPassword = ciphertext.toString();
    };
    AddSecret.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    AddSecret.prototype.showError = function (text) {
        this.loading.dismiss();
        var errorMsg = this.getErrorMessage(text);
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: errorMsg,
            buttons: ['OK']
        });
        alert.present();
    };
    AddSecret.prototype.getErrorMessage = function (text) {
        try {
            var object = JSON.parse(text._body);
            return object.errorMessage;
        }
        catch (e) {
            return text;
        }
    };
    AddSecret = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-add-secret',template:/*ion-inline-start:"/home/phultu/Phu/Samples/projectX/frontend/src/pages/add-secret/add-secret.html"*/'<!--\n  Generated template for the AddSecret page.\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>addSecret</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n	<form [formGroup]="myForm" (ngSubmit)="onSubmit()">\n		<ion-list>\n			<ion-item>\n				<ion-label floating primary>Domain</ion-label>\n				<ion-input [(ngModel)]="secret.domain" formControlName="domain" type="text"\n                     id="domain" spellcheck="false" autocapitalize="off">\n          		</ion-input>\n			</ion-item>\n			<p *ngIf="!isValid(\'domain\')" danger padding-left>Invalid Domain</p>\n			<ion-item>\n	          <ion-label floating primary>Username</ion-label>\n	          <ion-input type="text" [(ngModel)]="secret.username" formControlName="username"\n	                     id="username" spellcheck="false" autocapitalize="off">\n	          </ion-input>\n	        </ion-item>\n	        <p *ngIf="!isValid(\'username\')" danger padding-left>Invalid Username</p>\n	        <ion-item>\n	          <ion-label floating primary>Password</ion-label>\n	          <ion-input type="password" [(ngModel)]="secret.password" (input)=\'onInputTime($event.target.value)\' formControlName="password"\n	                     id="password" spellcheck="false" autocapitalize="off">\n	          </ion-input>\n	        </ion-item>\n	        <p *ngIf="!isValid(\'password\')" danger padding-left>Invalid Password</p>\n	        <ion-item>\n	          <ion-label floating primary>Generate Password</ion-label>\n	          <ion-input type="encryptedPassword" [(ngModel)]="secret.encryptedPassword" formControlName="encryptedPassword" disabled="true"\n	                     type="text" id="encryptedPassword" spellcheck="false" autocapitalize="off">\n	          </ion-input>\n	        </ion-item>\n	        <p *ngIf="!isValid(\'confirmPassword\')" danger padding-left>Invalid Password</p>\n	        <ion-item>\n	          <ion-label floating primary>Note</ion-label>\n	          <ion-input type="note" [(ngModel)]="secret.note" formControlName="note"\n	                     type="text" id="note" spellcheck="false" autocapitalize="off">\n	          </ion-input>\n	        </ion-item>\n	        <p *ngIf="!isValid(\'note\')" danger padding-left>Invalid Note</p>\n		</ion-list>\n		<div padding>\n	      <button ion-button color="primary" block>Add</button>\n	    </div>\n	</form>\n</ion-content>'/*ion-inline-end:"/home/phultu/Phu/Samples/projectX/frontend/src/pages/add-secret/add-secret.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__providers_api_DefaultApi__["a" /* DefaultApi */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_api_DefaultApi__["a" /* DefaultApi */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]) === "function" && _g || Object])
    ], AddSecret);
    return AddSecret;
    var _a, _b, _c, _d, _e, _f, _g;
}());

//# sourceMappingURL=add-secret.js.map

/***/ })

});
//# sourceMappingURL=2.js.map