// WARNING: DO NOT EDIT. This file is Auto-Generated by AWS Mobile Hub. It will be overwritten.

// Copyright 2017 Amazon.com, Inc. or its affiliates (Amazon). All Rights Reserved.
// Code generated by AWS Mobile Hub. Amazon gives unlimited permission to
// copy, distribute and modify it.

// AWS Mobile Hub Project Constants
const aws_app_analytics = 'enable';
const aws_cognito_identity_pool_id = 'us-east-1:f9e05f70-fb05-4f92-a44b-e388c26f948c';
const aws_cognito_region = 'us-east-1';
const aws_content_delivery = 'enable';
const aws_content_delivery_bucket = 'secretx-hosting-mobilehub-1283110391';
const aws_content_delivery_bucket_region = 'us-east-1';
const aws_content_delivery_cloudfront = 'enable';
const aws_content_delivery_cloudfront_domain = 'd3ljtr2ruuckta.cloudfront.net';
const aws_mobile_analytics_app_id = 'e1e8d219b3c140529ef2e76355911d05';
const aws_project_id = '6105febe-95ad-4549-8ff6-e5e9ea556202';
const aws_project_name = 'secretX';
const aws_project_region = 'us-east-1';
const aws_resource_name_prefix = 'secretx-mobilehub-1283110391';

AWS.config.region = aws_project_region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: aws_cognito_identity_pool_id
  }, {
    region: aws_cognito_region
});
AWS.config.update({customUserAgent: 'MobileHub v0.1'});