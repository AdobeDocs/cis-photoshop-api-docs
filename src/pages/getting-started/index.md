---
title: Getting started with the Photoshop API
description: Learn the first steps that you can take to start using the Photoshop API.
---

# Getting started with the Photoshop API

There are few steps to take before using the Photoshop APIs.
* **Overview**: Configure permissions for the developer in the Adobe Admin Console.
* **Free trial users (JWT Authentication)**: Create a client configuration in the Adobe I/O Console.
* **Automating the JWT Token**: Obtain the necessary credentials to send data to Adobe.
* **API Keys**: Obtain the necessary credentials to send data to Adobe.
* **Retries**: Obtain the necessary credentials to send data to Adobe.
* **Rate Limiting**: Obtain the necessary credentials to send data to Adobe.
* **Quota Limits**: Obtain the necessary credentials to send data to Adobe.

## Overview

The Photoshop API uses client id’s (also known as api keys) and authentication tokens to authenticate requests. There are two different kinds of authorization tokens available:
Internal Adobe user access (OAuth 2.0 access token)
Free trial user (Service token using JSON Web Token/JWT)
In order to use the Photoshop API's you’ll need to get an API key (also known as a CLIENT ID) and a Client Secret. Once you have those you can use them to programmatically get an access token to authenticate your requests. We’ll walk you through the steps below.


## Internal Adobe Users Only
1. Get your client id and client secret from the CIS team.
2. Test out your credentials.
  - Browse to https://ps-prerelease-us-east-1.cloud.adobe.io
  - Enter the client id and secret
  - Follow through the login process
  - If your credentials work you should see an authorization token appear on your screen
3. Make an authenticated call to ensure you can round trip successfully with the API’s
```shell
curl --request GET \
  --url https://image.adobe.io/pie/psdService/hello  \
  --header "Authorization: Bearer <YOUR_OAUTH_TOKEN>" \
  --header "x-api-key: <YOUR_CLIENT_ID>" \
```
  Congrats! You just made your first request to the Photoshop API.

4. Make a Photoshop API call with real assets
  Now that you can successfully authenticate and talk to the API’s it’s time to make “real” calls…
```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/documentManifest \
  -H 'Authorization: Bearer <auth_token>' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <YOUR_API_KEY>' \
  -d '{
  "inputs": [
    {
      "href":"files/Example.psd",
      "storage":"adobe"
    }
  ]
}'
```

5. Notes on token retrieval
The access token must never be transmitted as a URI parameter. Doing so would expose it to being captured in-the-clear by intermediaries such as proxy server logs. The API does not allow you to send an access token anywhere except the Authorization header field.

Your access token will expire typically in 24 hours. You will receive a ‘refresh_token’ when you initially obtain the access token that you can use to get a new access token. Be aware that refreshing your token might require a new login event. Please reference the OAuth documentation for additional instructions.
Please contact psdservices@adobe.com for more information on how you can automate token generation for your workflow.

#### Additional OAuth 2.0 and IMS Information

You can find details on interacting with Adobe IMS API’s and authentication in general
1. [General Authentication Information](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/AuthenticationOverview/AuthenticationGuide.md)
2. [OAuth Authentication](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/OAuth/OAuth.md)
3. [IMS API’s](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/Resources/IMS.md)
4. [OAuth Sample Code](sample_code/oauth-sample-app)

## Free trial users (JWT authentication)

``NOTE: Free Trial users will not have access to assets stored in the Creative Cloud so you must use an external storage source when making calls to the API. All free trial users will have 5,000 API calls to test their use case and provide feedback. Please see [Quota Limits](#quota-limits) for more information.``

1. If you haven't signed up and generated credentials please follow this link and follow the steps on the confirmation modal:
https://www.adobe-prerelease.com/sign-up/
2. If you have already signed up and need a new keyGo to https://console.adobe.io/home and sign in to the Admin Console.
3. Click on "Create a new project" under the "Quick Start" section on the middle of your screen
4. Click on "Add API"
5. Select the "Adobe Photoshop APIs (Trial)" and click on "Next"
6. You should see a zip file named "Config" in your downloads
7. Open the contents of the zip and locate the file name "private.key"
8. Open the file named "private.key" in a text editor like Atom or Sublime
9. Copy the entire contents of the file and paste it in your project page in the section labeled "Generate access token" and click on "Generate token" on the bottom right hand corner.
10. Congrats! You have just created a JWT token. Now copy your token and Client ID from this screen into a secure document. You are going to need them for the next step.
11. Open your terminal and paste the code below. Make sure to replace the variables "YOUR_ACCESS_TOKEN" and "YOUR_CLIENT_ID" with the information you copied from the last step and run the command.

``` shell
curl --request GET \
  --url https://image.adobe.io/pie/psdService/hello \
  --header "Authorization: Bearer <YOUR_ACCESS_TOKEN>" \
  --header "x-api-key: <YOUR_CLIENT_ID>"
```

  Congrats! You just made your first request to the Photoshop API.

``NOTE: Your token will expire every 24 hours and will need to be refreshed after it expires. See the next section for more information on retrieving your token programmatically.``


12. Make a Photoshop API call with real assets

Now that you can successfully authenticate and communicate with the API it’s time to make “real” calls. In order to make a call using your own assets you will need to have them stored in any of the accepted external storage solutions(S3, Azure or Dropbox). For more information on storage please refer to the [File Storage](https://github.com/AdobeDocs/photoshop-api-docs-pre-release#input-and-output-file-storage).If you dont have any assets and want to start testing you can download some of our [sample files](https://github.com/AdobeDocs/photoshop-api-docs-pre-release/tree/master/sample_files) and upload them to your supported external solution of choice.

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/documentManifest \
  -H 'Authorization: Bearer <auth_token>' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <YOUR_API_KEY>' \
  -d '{
  "inputs": [
    {
      "href":"<SIGNED_GET_URL>",
      "storage":"external"
    }
  ]
}'
```

## Automating your JWT token

Check out these modules for a quick path to automating your token retrieval:

- [JWT Instructions for Python](https://www.datanalyst.info/python/adobe-io-user-management/adobe-io-jwt-authentication-with-python/)
- [JWT Instructions for Node](https://www.npmjs.com/package/@adobe/jwt-auth)

## Additional Service Token and JWT Information

You can find details on interacting with Adobe IMS API’s and authentication in general
1. [General Authentication Information](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/AuthenticationOverview/AuthenticationGuide.md)
2. [JWT/Service Token Authentication](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/JWT/JWT.md)
3. [IMS API’s](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/Resources/IMS.md)
4. [JWT Sample Code](sample_code/jwt-sample-app)  

## API Keys

Also known as the `client_id`. You must additionally pass in your Adobe API key in the `x-api-key` header field. You’ll automatically get a developer API key when you create your Adobe I/O Console Integration.  After you've created your integration you can find your API key in the `Overview` tab of your Integration

## Retries

- The service will retry status codes of 429, 502, 503, 504 three times.
- You should only retry requests that have a 5xx response code. A 5xx error response indicates there was a problem processing the request on the server.
- You should implement an exponential back-off retry strategy with 3 retry attempts.
- You should not retry requests for any other response code.

## Rate Limiting

We have not put a throttle limit on requests to the API at this time.

## Quota Limits

All free trial users will have 5,000 API calls in order to test and evaluate the API in a non production environment. If for any reason you reach your limit and need to extend your quota please reach out psdservices@adobe.com for more information.
