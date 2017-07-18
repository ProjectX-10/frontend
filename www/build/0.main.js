webpackJsonp([0],{

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register__ = __webpack_require__(280);
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

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_api_DefaultApi__ = __webpack_require__(102);
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
        this.userInfo = { name: '', email: '', password: '', confirmPassword: '', secretKey: '' };
    }
    RegisterPage.prototype.ngOnInit = function () {
        this.myForm = this.formBuilder.group({
            'name': ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].minLength(3), this.nameValidator.bind(this)]],
            'email': ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].required, this.emailValidator.bind(this)]],
            'password': ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].required, this.passwordValidator.bind(this)]],
            'confirmPassword': ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].required, this.passwordValidator.bind(this)]],
            'secretKey': ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* Validators */].required, this.passwordValidator.bind(this)]]
        });
    };
    RegisterPage.prototype.onSubmit = function () {
        var _this = this;
        console.log('submitting form');
        var request = {};
        request.password = this.userInfo.password;
        request.displayName = this.userInfo.name;
        request.email = this.userInfo.email;
        request.secretKey = this.userInfo.secretKey;
        request.imageUrl = 'imageUrl';
        console.log(request);
        debugger;
        this.api.registerPost(request).subscribe(function (response) {
            console.log(response);
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
    RegisterPage.prototype.showError = function (text) {
        debugger;
        this.loading.dismiss();
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'page-register',template:/*ion-inline-start:"/home/phultu/Phu/Samples/projectX/frontend/src/pages/register/register.html"*/'<!--\n  Generated template for the Register page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!--<ion-header>\n\n  <ion-navbar>\n    <ion-title>register</ion-title>\n  </ion-navbar>\n\n</ion-header>-->\n\n<ion-header>\n  <ion-navbar>\n    <button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Register</ion-title>\n    \n    <!--<ion-buttons end>\n    <button (click)="openModal()">\n    +\n    </button>\n    </ion-buttons>-->\n  </ion-navbar>\n</ion-header>\n<!--<ion-content>\n  <ion-list>\n    <form [formGroup]="myForm" (ngSubmit)="onSubmit()">\n      <ion-item>\n        <ion-label floating primary>Name</ion-label>\n        <ion-input [(ngModel)]="userInfo.name" formControlName="name" type="text"\n                   id="name" spellcheck="false" autocapitalize="off">\n        </ion-input>\n      </ion-item>\n      <p *ngIf="!isValid(\'name\')" danger padding-left>Invalid Name</p>\n      <ion-item>\n        <ion-label floating primary>Email</ion-label>\n        <ion-input [(ngModel)]="userInfo.email" formControlName="email"\n                   type="text" id="email" spellcheck="false" autocapitalize="off">\n        </ion-input>\n      </ion-item>\n      <p *ngIf="!isValid(\'email\')" danger padding-left>Invalid Email</p>\n      <ion-item>\n        <ion-label floating primary>Phone</ion-label>\n        <ion-input [(ngModel)]="userInfo.phone" formControlName="phone" type="text" id="phone">\n        </ion-input>\n      </ion-item>\n      <p *ngIf="!isValid(\'phone\')" danger padding-left>Invalid Phone</p>\n      <button type="submit" block primary [disabled]="!myForm.valid">Submit</button>\n    </form>\n  </ion-list>\n</ion-content>-->\n<ion-content>\n  <form [formGroup]="myForm" (ngSubmit)="onSubmit()">\n    <ion-list>    \n        <ion-item>\n          <ion-label floating primary>Name</ion-label>\n          <ion-input [(ngModel)]="userInfo.name" formControlName="name" type="text"\n                     id="name" spellcheck="false" autocapitalize="off">\n          </ion-input>\n        </ion-item>\n        <p *ngIf="!isValid(\'name\')" danger padding-left>Invalid Name</p>\n        <ion-item>\n          <ion-label floating primary>Email</ion-label>\n          <ion-input type="text" [(ngModel)]="userInfo.email" formControlName="email"\n                     id="email" spellcheck="false" autocapitalize="off">\n          </ion-input>\n        </ion-item>\n        <p *ngIf="!isValid(\'email\')" danger padding-left>Invalid Email</p>\n        <ion-item>\n          <ion-label floating primary>Password</ion-label>\n          <ion-input type="password" [(ngModel)]="userInfo.password" formControlName="password"\n                     id="password" spellcheck="false" autocapitalize="off">\n          </ion-input>\n        </ion-item>\n        <p *ngIf="!isValid(\'password\')" danger padding-left>Invalid Email</p>\n        <ion-item>\n          <ion-label floating primary>Confirm Password</ion-label>\n          <ion-input type="confirmPassword" [(ngModel)]="userInfo.confirmPassword" formControlName="confirmPassword"\n                     type="text" id="confirmPassword" spellcheck="false" autocapitalize="off">\n          </ion-input>\n        </ion-item>\n        <p *ngIf="!isValid(\'confirmPassword\')" danger padding-left>Invalid Password</p>\n        <ion-item>\n          <ion-label floating primary>Secret Key</ion-label>\n          <ion-input type="secretKey" [(ngModel)]="userInfo.secretKey" formControlName="secretKey"\n                     type="text" id="secretKey" spellcheck="false" autocapitalize="off">\n          </ion-input>\n        </ion-item>\n        <p *ngIf="!isValid(\'secretKey\')" danger padding-left>Invalid Key</p>\n    </ion-list>\n\n    <div padding>\n      <button ion-button color="primary" block>Create Account</button>\n    </div>\n  </form>\n\n</ion-content>\n\n\n\n\n'/*ion-inline-end:"/home/phultu/Phu/Samples/projectX/frontend/src/pages/register/register.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* AlertController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormBuilder */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__providers_api_DefaultApi__["a" /* DefaultApi */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_api_DefaultApi__["a" /* DefaultApi */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */]) === "function" && _f || Object])
], RegisterPage);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=register.js.map

/***/ })

});
//# sourceMappingURL=0.main.js.map