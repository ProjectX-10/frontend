webpackJsonp([10],{

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register__ = __webpack_require__(288);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterModule", function() { return RegisterModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RegisterModule = (function () {
    function RegisterModule() {
    }
    return RegisterModule;
}());
RegisterModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */]
        ]
    })
], RegisterModule);

//# sourceMappingURL=register.module.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_api_DefaultApi__ = __webpack_require__(48);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { IonicPage } from 'ionic-angular';
//import {OnInit, Component} from "@angular/core";


/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var RegisterPage = (function () {
    function RegisterPage(navCtrl, navParams, alertCtrl, formBuilder, api, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.api = api;
        this.loadingCtrl = loadingCtrl;
        this.userInfo = { name: '', email: '', password: '', confirmPassword: '' };
    }
    RegisterPage.prototype.ngOnInit = function () {
        this.myForm = this.formBuilder.group({
            'name': ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].minLength(3), this.nameValidator.bind(this)]],
            'email': ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].required, this.emailValidator.bind(this)]],
            'password': ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].required, this.passwordValidator.bind(this)]],
            'confirmPassword': ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].required, this.passwordValidator.bind(this)]]
        });
    };
    RegisterPage.prototype.onSubmit = function () {
        var _this = this;
        this.showLoading();
        var request = {};
        request.password = this.userInfo.password;
        request.displayName = this.userInfo.name;
        request.email = this.userInfo.email;
        //request.imageUrl = 'imageUrl';
        debugger;
        this.api.registerPost(request).subscribe(function (response) {
            _this.navCtrl.push('ActivatePage');
        }, function (error) {
            _this.showError(error);
        });
    };
    RegisterPage.prototype.isValid = function (field) {
        //let formField = this.myForm.find(field);
        //return formField.valid || formField.pristine;
        return true;
    };
    RegisterPage.prototype.nameValidator = function (control) {
        if (!control.value.match("^[a-zA-Z ,.'-]+$")) {
            return { invalidName: true };
        }
    };
    RegisterPage.prototype.phoneValidator = function (control) {
        if (control.value !== '') {
            if (!control.value.match('\\(?\\d{3}\\)?-? *\\d{3}-? *-?\\d{4}')) {
                return { invalidPhone: true };
            }
        }
    };
    RegisterPage.prototype.passwordValidator = function (control) {
        if (control.value !== '') {
            //if (!control.value.match('\\(?\\d{3}\\)?-? *\\d{3}-? *-?\\d{4}')) {
            return { invalidPassword: true };
            //}
        }
    };
    RegisterPage.prototype.emailValidator = function (control) {
        if (!(control.value.toLowerCase().match('^[a-zA-Z]\\w*@gmail\\.com$') || control.value.toLowerCase().match('^[a-zA-Z]\\w*@yahoo\\.com$'))) {
            return { invalidEmail: true };
        }
    };
    RegisterPage.prototype.confirmEmailValidator = function (email, confirmEmail) {
        if (!(email.value.toLowerCase() == confirmEmail.value.toLowerCase())) {
            return { invalidConfirmEmail: true };
        }
    };
    RegisterPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    RegisterPage.prototype.showError = function (text) {
        this.loading.dismiss();
        var object = JSON.parse(text._body);
        console.log(object);
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: object.errorMessage,
            buttons: ['OK']
        });
        alert.present();
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'page-register',template:/*ion-inline-start:"C:\Users\FPT LA\samples\projectX\frontend\src\pages\register\register.html"*/'<!--\n\n  Generated template for the Register page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<!--<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>register</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>-->\n\n\n\n<ion-header>\n\n  <ion-navbar>\n\n    <button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Register</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <form [formGroup]="myForm" (ngSubmit)="onSubmit()">\n\n    <ion-list>    \n\n        <ion-item>\n\n          <ion-label floating primary>Name</ion-label>\n\n          <ion-input [(ngModel)]="userInfo.name" formControlName="name" type="text"\n\n                     id="name" spellcheck="false" autocapitalize="off">\n\n          </ion-input>\n\n        </ion-item>\n\n        <p *ngIf="!isValid(\'name\')" danger padding-left>Invalid Name</p>\n\n        <ion-item>\n\n          <ion-label floating primary>Email</ion-label>\n\n          <ion-input type="text" [(ngModel)]="userInfo.email" formControlName="email"\n\n                     id="email" spellcheck="false" autocapitalize="off">\n\n          </ion-input>\n\n        </ion-item>\n\n        <p *ngIf="!isValid(\'email\')" danger padding-left>Invalid Email</p>\n\n        <ion-item>\n\n          <ion-label floating primary>Password</ion-label>\n\n          <ion-input type="password" [(ngModel)]="userInfo.password" formControlName="password"\n\n                     id="password" spellcheck="false" autocapitalize="off">\n\n          </ion-input>\n\n        </ion-item>\n\n        <p *ngIf="!isValid(\'password\')" danger padding-left>Invalid Email</p>\n\n        <ion-item>\n\n          <ion-label floating primary>Confirm Password</ion-label>\n\n          <ion-input type="confirmPassword" [(ngModel)]="userInfo.confirmPassword" formControlName="confirmPassword"\n\n                     type="password" id="confirmPassword" spellcheck="false" autocapitalize="off">\n\n          </ion-input>\n\n        </ion-item>\n\n        <p *ngIf="!isValid(\'confirmPassword\')" danger padding-left>Invalid Password</p>        \n\n    </ion-list>\n\n\n\n    <div padding>\n\n      <button ion-button color="primary" block>Create Account</button>\n\n    </div>\n\n  </form>\n\n\n\n</ion-content>\n\n\n\n\n\n\n\n\n\n'/*ion-inline-end:"C:\Users\FPT LA\samples\projectX\frontend\src\pages\register\register.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__providers_api_DefaultApi__["a" /* DefaultApi */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */]])
], RegisterPage);

//# sourceMappingURL=register.js.map

/***/ })

});
//# sourceMappingURL=10.main.js.map