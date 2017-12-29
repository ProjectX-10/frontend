import { Injectable } from "@angular/core";
import * as models  from '../providers/model/models';
import { Configuration } from '../providers/configuration';
import {XHRBackend, Http, RequestOptions} from "@angular/http";
import {HttpInterceptor} from "../providers/http/http-interceptor";

@Injectable()
export class Utils {
    static getConfiguration(loginUser: models.LoginUserResponse) : Configuration {
	    let configuration:Configuration = new Configuration();
	    configuration.apiKey = loginUser.token;
	    configuration.accessToken = loginUser.auth.token;
	    configuration.username = loginUser.item.email;
	    configuration.withCredentials = true;
	    return configuration;
	  }	
	 static httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
	    return new HttpInterceptor(xhrBackend, requestOptions);
	}
}