webpackJsonp([2],{

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangePaswordModule", function() { return ChangePaswordModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__change_password__ = __webpack_require__(305);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChangePaswordModule = (function () {
    function ChangePaswordModule() {
    }
    ChangePaswordModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__change_password__["a" /* ChangePasswordPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__change_password__["a" /* ChangePasswordPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__change_password__["a" /* ChangePasswordPage */]
            ]
        })
    ], ChangePaswordModule);
    return ChangePaswordModule;
}());

//# sourceMappingURL=change-password.module.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_api_DefaultApi__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_utils__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the AddSecret page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ChangePasswordPage = (function () {
    function ChangePasswordPage(navCtrl, navParams, alertCtrl, formBuilder, api, loadingCtrl, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.api = api;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.SECERET_KEY = '';
        debugger;
        this.secret = this.navParams.get('secret');
        this.secret.confirmPassword = this.secret.password;
        console.log(this.secret);
    }
    ChangePasswordPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('user').then(function (val) {
            var loginUser = val;
            _this.SECERET_KEY = loginUser.item.secretKey;
            _this.secret.userId = loginUser.item.id;
            _this.secret.encryptedPassword = __WEBPACK_IMPORTED_MODULE_5__utils_utils__["a" /* Utils */].getEncryptCode(_this.secret.password, _this.SECERET_KEY);
            _this.api.configuration = __WEBPACK_IMPORTED_MODULE_5__utils_utils__["a" /* Utils */].getConfiguration(loginUser);
        });
        this.chnagePwdFrom = this.formBuilder.group({
            email: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            password: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            confirmPassword: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, this.confirmPasswordValidator.bind(this)]],
            changeKey: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]]
        });
    };
    ChangePasswordPage.prototype.onSubmit = function () {
        var _this = this;
        this.showLoading();
        if (this.chnagePwdFrom.valid == true) {
            var request = {};
            request.id = this.secret.id;
            request.password = this.secret.encryptedPassword;
            request.note = this.secret.note;
            this.api.secretsIdPut(request.id, request).subscribe(function (response) {
                _this.navCtrl.push('HomePage');
            }, function (error) {
                _this.showError(error);
            });
        }
    };
    ChangePasswordPage.prototype.isValid = function (field) {
        var formField = this.chnagePwdFrom.controls[field];
        if (formField !== undefined) {
            return (formField.valid || formField.pristine);
        }
        return true;
    };
    ChangePasswordPage.prototype.domainValidator = function (control) {
        if (control.value !== '') {
            return { invalidDomain: true };
        }
    };
    ChangePasswordPage.prototype.usernameValidator = function (control) {
        if (control.value !== '') {
            return { invalidUsername: true };
        }
    };
    ChangePasswordPage.prototype.passwordValidator = function (control) {
        if (control.value !== '') {
            return { invalidPassword: true };
        }
    };
    ChangePasswordPage.prototype.confirmPasswordValidator = function (control) {
        //debugger;
        if (control !== undefined) {
            if (control.value !== this.secret.password) {
                return { invalidConfirmPassord: true };
            }
        }
    };
    ChangePasswordPage.prototype.noteValidator = function (control) {
        return { invalidNote: true };
    };
    ChangePasswordPage.prototype.onInputTime = function (password) {
        this.secret.encryptedPassword = __WEBPACK_IMPORTED_MODULE_5__utils_utils__["a" /* Utils */].getEncryptCode(this.secret.password, this.SECERET_KEY);
    };
    ChangePasswordPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    ChangePasswordPage.prototype.showError = function (text) {
        this.loading.dismiss();
        var errorMsg = this.getErrorMessage(text);
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: errorMsg,
            buttons: ['OK']
        });
        alert.present();
    };
    ChangePasswordPage.prototype.getErrorMessage = function (text) {
        try {
            var object = JSON.parse(text._body);
            return object.errorMessage;
        }
        catch (e) {
            return text;
        }
    };
    ChangePasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-change-password',template:/*ion-inline-start:"/home/phultu/Phu/Samples/projectX/frontend/src/pages/change-password/change-password.html"*/'<!--\n  Generated template for the AddSecret page.\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Change Password</ion-title>\n    <ion-buttons end>\n		<button (click)="onSubmit()" ion-button [disabled]="!chnagePwdFrom.valid">\n			Save\n		</button>\n	</ion-buttons>\n  </ion-navbar>  \n</ion-header>\n\n<ion-content padding>\n	<form [formGroup]="chnagePwdFrom" (ngSubmit)="onSubmit()">\n		<ion-list>\n			<ion-item>\n	          <ion-label floating primary>Email</ion-label>\n	          <ion-input  [(ngModel)]="secret.email" formControlName="email"\n	                     type="text" id="email" spellcheck="false" autocapitalize="off">\n	          </ion-input>\n	        </ion-item>			\n	        <ion-item>\n	          <ion-label floating primary>Password</ion-label>\n	          <ion-input type="password" [(ngModel)]="secret.password" (input)=\'onInputTime($event.target.value)\' formControlName="password"\n	                     id="password" spellcheck="false" autocapitalize="off">\n	          </ion-input>\n	        </ion-item>\n	        <ion-item>\n	          <ion-label floating primary>Confirm Password</ion-label>\n	          <ion-input type="password" [(ngModel)]="secret.confirmPassword" formControlName="confirmPassword" \n	          			 id="confirmPassword" spellcheck="false" autocapitalize="off">\n	          </ion-input>\n	        </ion-item>\n	        <ion-item>\n	          <ion-label floating primary>Key</ion-label>\n	          <ion-input  [(ngModel)]="secret.changeKey" formControlName="changeKey"\n	                     type="text" id="changeKey" spellcheck="false" autocapitalize="off">\n	          </ion-input>\n	        </ion-item>	        \n		</ion-list>\n		<div padding>\n	      <button ion-button color="primary" block>Save</button>\n	    </div>\n	</form>\n</ion-content>'/*ion-inline-end:"/home/phultu/Phu/Samples/projectX/frontend/src/pages/change-password/change-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4__providers_api_DefaultApi__["a" /* DefaultApi */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], ChangePasswordPage);
    return ChangePasswordPage;
}());

//# sourceMappingURL=change-password.js.map

/***/ })

});
//# sourceMappingURL=2.js.map