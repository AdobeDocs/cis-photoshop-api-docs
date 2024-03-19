---
title: Authentication
description: Page for Authentication
contributors:
  - https://github.com/khound
---
# Getting started with Photoshop

The first step in accessing the Photoshop API is making sure your organization is provisioned with access to Firefly Services. Once you have confirmed your have access you will need to create a project in the Adobe Developer Console and obtain a set of credentials. Follow the guide below create a project and make your first `Hello World` call.

## Get access

Here are the steps to get started with the Photoshop APIs.

### Getting started from Developer Console

After you have confirmed you have access to Firefly Services you will need to create a project in developer console. If you have already obtained a set of credentials you can skip these steps.

1. Go to https://developer.adobe.com/console/home and **sign in to the Developer Console**.
2. Select **Create new project** under the **Quick start** section on the middle of your screen:
![Screenshot](images/CreateNewProjectConsole.png)
3. Choose **Add API**:
![Screenshot](images/AddAPIConsole.png)
4. Select the **Photoshop - Firefly and Creative Cloud Automation** and click on **Next**:
![Screenshot](images/AddAPIConsolePSFF.png)
5. Select **Save configured API**:
![Screenshot](images/ServicePrincipalConsole.png)
Default selection for type of Authentication is made for **OAuth Server-to-Server** and you should keep it. Service Account(JWT) authentication will be deprecated soon.
6. Repeat step 4 and select **Remove Background - Firefly and Creative Cloud Automation** and click on **Next**:
![Screenshot](images/AddAPIConsoleRBFF.png)
Repeat step 5
7. Select **Generate access token**:
![Screenshot](images/GenerateAccessTokenFromConsole.png)
8. Congratulations! You have just created a token. You can **copy** the token :
![Screenshot](images/AccessTokenCurlConsole.png)
9. Once you’ve created your token, you can follow the steps below to make your first API call.
   - Open your terminal and paste the code below.
   - Replace the variables "YOUR_ACCESS_TOKEN" with the token you generated on Adobe I/O Console.
   - Replace <YOUR_CLIENT_ID>. You can find this on the same page you generated your token on.
   - Once all variables have been replaced you can run the command.

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
Congratulations! You just made your first request to the Photoshop API.

## Build something cool#
You have now Access Token and Client Id. You can use that to build your application using Photoshop API.
Check out this SDK and API Reference for that.
- [Firefly Services SDK](https://github.com/Firefly-Services)
- [Photoshop API Reference](../api/)
