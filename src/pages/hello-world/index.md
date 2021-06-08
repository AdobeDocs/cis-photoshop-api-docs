---
title: Hello World
description: Hello World
contributors:
  - https://github.com/khound
---

## Hello World

`NOTE: Free Trial users will not have access to assets stored in the Creative Cloud. So you must use an external storage source when making calls to the API. All free trial users will have 5,000 API calls to test their use case and provide feedback.
`
Once you have created your token you can follow the steps below to make your first call. If you have not created a token please see [Authentication](../authentication/)

1. Open your terminal and paste the code below. Make sure to replace the variables "YOUR_ACCESS_TOKEN"  with the token you generated on adobe io console. If you haven’t completed this step you can go to [generating a token](../authentication/#generating-a-token) and follow the steps there to create one.
2. You are also going to need your  "YOUR_CLIENT_ID" variable with your api key which can be found in your adobe io console.
3. Once all variables have been replaced you can run the command.

``` shell
curl --request GET \
  --url https://image.adobe.io/pie/psdService/hello \
  --header "Authorization: Bearer <YOUR_ACCESS_TOKEN>" \
  --header "x-api-key: <YOUR_CLIENT_ID>"
  ```
Congrats! You just made your first request to the Photoshop API.

`NOTE: Your token will expire every 24 hours and will need to be refreshed after it expires.`

### Internal Adobe Users Only
If you are generating OAuth token, use the generated token from https://www.adobe.com/go/photoshopapi_signup and your api key in the curl command above.
