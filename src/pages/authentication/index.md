---
title: Authentication
description: Page for Authentication
contributors:
  - https://github.com/khound
---

## Authentication
In order to authenticate your request you will need to authorization token along with your api key. You can generate your token in adobe io console by following the steps below.
Please note that token expires every 24 hours and you will have generate a new one after it expires. See [Automating your JWT token](/authentication/#automating-your-jwt-token) for information on how to automate this process for your application.

## Generating a Token

1. If you haven't signed up and generated credentials please follow this link and follow the steps on the confirmation modal: https://www.adobe-prerelease.com/sign-up/
2. If you have already signed up and need a new key, Go to https://console.adobe.io/home and sign in to the Admin Console.
3. Click on "Create a new project" under the "Quick Start" section on the middle of your screen
4. Click on "Add API"
5. Select the "Adobe Photoshop APIs (Trial)" and click on "Next"
6. You should see a zip file named "Config" in your downloads
7. Open the contents of the zip and locate the file name "private.key"
8. Open the file named "private.key" in a text editor like Atom or Sublime
9. Copy the entire contents of the file and paste it in your project page in the section labeled "Generate access token" and click on "Generate token" on the bottom right hand corner.
10. Congrats! You have just created a JWT token.

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


## Internal Adobe Users Only

1. You can create your client id and client secret in  https://imss.corp.adobe.com .
2. Once you have your client id, you can go to https://admin.adobe.io/ and subscribe to our services.
Currently available services are : "PIE in the Sky", "Lightroom" and "Sensei Server".   
3. Test out your credentials.
- Browse to https://ps-prerelease-us-east-1.cloud.adobe.io
- Enter the client id and secret
- Follow through the login process
- If your credentials work you should see an authorization token appear on your screen.
