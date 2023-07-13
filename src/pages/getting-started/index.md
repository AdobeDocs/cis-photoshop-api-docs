---
title: Authentication
description: Page for Authentication
contributors:
  - https://github.com/khound
---
# Getting started with Photoshop API

The first step in accessing the Photoshop APIs is getting authenticated. For that you will need an Authorization Token and an API Key. With the steps below, we'll show you how to gain access and make your first `hello world` call.

## Get access
Here are the steps to get started with the Photoshop APIs.

1. Go to https://developer.adobe.com/photoshop/api/signup/?ref=signup.
1. Sign in to your adobe developer account.
1. Click on the blue "Sign up" button.
![Screenshot](images/Step2.png)

1. Fill the "Sign up for free trial" Form and Submit.
![Screenshot](images/TrialForm.png)

1. Enter a new project name and check the box to agree to the Adobe developer terms.
1. Click on the blue “Create credentials” button and keep an eye out for the *config.zip* file that will automatically download.
![Screenshot](images/CreateCredential.png)

1. Click on the blue “Generate access token in I/O console” button.
![Screenshot](images/GenerateAccess.png)

1. You should end up on a screen similar to the picture below. Click on the “Generate access token” button.
![Screenshot](images/GenerateAccessConsole.png)

1. Scroll down on this page to find "Generate Custom JWT" box.
![Screenshot](images/Jwt.png)

1. Now its time to grab that config.zip file we mentioned earlier. Unzip the file and open the private.key documents.
![Screenshot](images/PrivateKey.png)

1. Copy the entire contents of the file including “-----BEGIN PRIVATE KEY-----” and “-----END PRIVATE KEY-----” portions. Paste them into “Generate Custom JWT” section and click on “Generate token”
1. You will see a screen like below. Copy the "Sample cURL command" and run it in your terminal.
![Screenshot](images/Token.png)

1. Congrats! You have just created a Bearer token. You can copy the token from **access_token**:
![Screenshot](images/TokenTerminal.png)

Please note that token expires every 24 hours and you will have to generate a new one after it expires. See [Automating your JWT token](/authentication/#automating-your-jwt-token) for information on how to automate this process for your application.

## Hello World

Once you have created your token you can follow the steps below to make your first API call.

1. Open your terminal and paste the code below.
1. Replace the variables "YOUR_ACCESS_TOKEN"  with the token you generated on Adobe I/O Console.
1. Replace <YOUR_CLIENT_ID>. You can find this on the same page you generated your token on.
1. Once all variables have been replaced you can run the command.

``` shell
curl --request GET \
  --url https://image.adobe.io/pie/psdService/hello \
  --header "Authorization: Bearer <YOUR_ACCESS_TOKEN>" \
  --header "x-api-key: <YOUR_CLIENT_ID>"
  ```

If you are using Windows machine don't use the backslash for the curl commands. e.g
``` shell
curl --request GET --url https://image.adobe.io/pie/psdService/hello --header "Authorization: Bearer <YOUR_ACCESS_TOKEN>" --header "x-api-key: <YOUR_CLIENT_ID>"
```


Congrats! You just made your first request to the Photoshop API.

`NOTE: Your token will expire every 24 hours and will need to be refreshed after it expires. We recommend using our SDK to automate this process. See the next section for more information on your automation options.`

## Getting started from Adobe I/O Console
You can also directly go to Adobe I/O Console to signup. This section is alternative to [Get access](#get-access), if you **have** already signed up.
1. Go to https://developer.adobe.com/console/home and **sign in to the IO Console.**
1. Click on **Create new project** under the **Quick start** section on the middle of your screen:
![Screenshot](images/Step3.png)
1. Click on **Add API**:
![Screenshot](images/Step4.png)
1. Select the **Adobe Photoshop APIs (Trial)** and click on **Next**:
![Screenshot](images/Step5.png)
1. Select **OPTION1 Generate a key pair** and click **Generate keypair**:
![Screenshot](images/Step6.png)
You should see a zip file named **config.zip** in your Downloads folder.
1. Click on the “Generate access token” button on your project page.
![Screenshot](images/GenerateAccessConsole.png)
1. Scroll down on this page to find "Generate Custom JWT" box.
![Screenshot](images/Jwt.png)
1. Now its time to grab that config.zip file we mentioned earlier. Unzip the file and open the private.key documents.
![Screenshot](images/PrivateKey.png)
1. Copy the entire contents of the file including “-----BEGIN PRIVATE KEY-----” and “-----END PRIVATE KEY-----” portions. Paste them into “Generate Custom JWT” section and click on “Generate token”
1. You will see a screen like below. Copy the "Sample cURL command" and run it in your terminal.
![Screenshot](images/Token.png)
1. Congrats! You have just created a Bearer token. You can copy the token from **access_token**:
![Screenshot](images/TokenTerminal.png)

## Automating your JWT token#

Check out these modules for a quick path to automating your token retrieval:
- [Photoshop API SDK](https://github.com/adobe/adobe-photoshop-api-sdk)
- [JWT Instructions for Python](https://www.datanalyst.info/python/adobe-io-user-management/adobe-io-jwt-authentication-with-python/)
- [JWT Instructions for Node](https://www.npmjs.com/package/@adobe/jwt-auth)

## Additional Service Token and JWT Information

You can find details on interacting with Adobe IMS API’s and authentication in general
1. [General Authentication Information](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/AuthenticationOverview/AuthenticationGuide.md)
2. [JWT/Service Token Authentication](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/JWT/JWT.md)
3. [IMS API’s](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/Resources/IMS.md)
4. [JWT Sample Code](https://github.com/AdobeDocs/cis-photoshop-api-docs/tree/main/sample-code/jwt-sample-app)
