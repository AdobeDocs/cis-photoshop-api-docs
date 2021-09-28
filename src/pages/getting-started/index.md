---
title: Authentication
description: Page for Authentication
contributors:
  - https://github.com/khound
---
# Getting started with Photoshop API

The first step in accessing the Photoshop APIs is getting authenticated. For that you will need an Authorization Token and an API Key. With the steps below, we'll show you how to gain access and make your first `hello world` call.

## Get access
Here are the steps to start with our API

1. If you **haven't signed up** and generated credentials please follow this link and follow the steps on the confirmation modal: https://www.adobe.com/go/photoshopapi_signup

1. If you **have** already signed up and need a new key, Go to https://developer.adobe.com/console/home and **sign in to the IO Console.**
1. Click on **Create a new project** under the **Quick Start** section on the middle of your screen
1. Click on **Add API**
1. Select the **Adobe Photoshop APIs (Trial)** and click on **Next**
1. You should see a zip file named **Config** in your downloads
1. Open the contents of the zip and locate the file name **private.key**
1. Open the file named **private.key** in a text editor like Atom or Sublime
1. Copy the entire contents of the file and paste it in your project page in the section labeled **Generate access token** and click on **Generate token** on the bottom right hand corner.
1. Congrats! You have just created a JWT token.

Please note that token expires every 24 hours and you will have generate a new one after it expires. See [Automating your JWT token](/authentication/#automating-your-jwt-token) for information on how to automate this process for your application.

You’ll automatically get an API key when you create your project in Adobe I/O Console. Copy **API KEY (CLIENT ID)** from **Project Overview** page.

## Hello World

Once you have created your token you can follow the steps below to make your first API call.

1. Open your terminal and paste the code below. Make sure to replace the variables "YOUR_ACCESS_TOKEN"  with the token you generated on adobe io console.
1. You are also going to need your  **API KEY (CLIENT ID)** which can be found in your adobe io console.You will need to pass in your API key in the **x-api-key** field.
1. Once all variables have been replaced you can run the command.

``` shell
curl --request GET \
  --url https://image.adobe.io/pie/psdService/hello \
  --header "Authorization: Bearer <YOUR_ACCESS_TOKEN>" \
  --header "x-api-key: <YOUR_CLIENT_ID>"
  ```
Congrats! You just made your first request to the Photoshop API.

`NOTE: Your token will expire every 24 hours and will need to be refreshed after it expires.`

## Automating your JWT token#

Check out these modules for a quick path to automating your token retrieval:

- [JWT Instructions for Python](https://www.datanalyst.info/python/adobe-io-user-management/adobe-io-jwt-authentication-with-python/)
- [JWT Instructions for Node](https://www.npmjs.com/package/@adobe/jwt-auth)

## Additional Service Token and JWT Information

You can find details on interacting with Adobe IMS API’s and authentication in general
1. [General Authentication Information](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/AuthenticationOverview/AuthenticationGuide.md)
2. [JWT/Service Token Authentication](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/JWT/JWT.md)
3. [IMS API’s](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/Resources/IMS.md)
4. [JWT Sample Code](https://github.com/AdobeDocs/cis-photoshop-api-docs/tree/main/sample-code/jwt-sample-app)
