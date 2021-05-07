---
title: Hello World
description: Hello World
contributors:
  - https://github.com/khound
---

## Hello World

### Free trial users (JWT authentication)

`NOTE: Free Trial users will not have access to assets stored in the Creative Cloud so you must use an external storage source when making calls to the API. All free trial users will have 5,000 API calls to test their use case and provide feedback. Please see [Quota Limits](#quota-limits) for more information.
`
Once you have created your token you can follow the steps below to make your first call. If you have not created a token please see [Authentication]

1. Open your terminal and paste the code below. Make sure to replace the variables "YOUR_ACCESS_TOKEN"  with the token you generated in the adobe io console. If you haven’t completed this step you can go to “generating a token” and follow the steps there to create one.
2. You are also going to need your  "YOUR_CLIENT_ID" variable with your api key which can be found in your adobe io console.
3. Once all variables have been replaced you can run the command.

``` shell
curl --request GET \
  --url https://image.adobe.io/pie/psdService/hello \
  --header "Authorization: Bearer <YOUR_ACCESS_TOKEN>" \
  --header "x-api-key: <YOUR_CLIENT_ID>"
  ```
Congrats! You just made your first request to the Photoshop API.

`NOTE: Your token will expire every 24 hours and will need to be refreshed after it expires. See  https://paper.dropbox.com/doc/API-DOCS--BKRRFkIV_y_ZMnDQPaCj4cu4Ag-7HOkd3u786hMjCnKYfeb1#:h2=Automating-your-JWT-token# for more information on retrieving your token programmatically.`

### Internal Adobe Users Only

Once you have generated a token you can test your credentials to ensure you can communicate with the API.

1. Copy and paste the code below into your terminal
2. Replace <YOUR_OAUTH_TOKEN>. See +API DOCS: Generating-a-token for a walk through on how to create a token.
3. Replace  <YOUR_CLIENT_ID> with your api key which can be found the adobe io console.

``` shell
curl --request GET \
  --url https://image.adobe.io/pie/psdService/hello \
  --header "Authorization: Bearer <YOUR_ACCESS_TOKEN>" \
  --header "x-api-key: <YOUR_CLIENT_ID>"
  ```
Congrats! You just made your first request to the Photoshop API.
