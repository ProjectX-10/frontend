/**
 * fm
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 2017-02-05T01:28:32Z
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as models from './models';

export interface LoginUserResponse {
    item?: models.InlineResponse200Item;

    type?: string;

    token?: string;

    expires?: number;

    auth?: models.InlineResponse2001Auth;

}
