# azure-blob-text-edit
The following code demostrates how to use <a href="https://developer.adobe.com/photoshop/photoshop-api-docs/api/#operation/text">Photoshop Text API</a>

# Instructions
* Open app.js
* fill in the following information
```node
// FILL OUT INFORMATION ABOUT YOUR ADOBE CREDENTIALS
// VISIT https://developer.adobe.com/console/projects to obtain the following information
const imsConfig = {
  clientId: "YOUR_ADOBE_CLIENT_ID",
  clientSecret: "YOUR_ADOBE_CLIENT_SECRET"
};

// FILL OUT INFORMATION ABOUT YOUR AZURE BLOB STORAGE
const azureStorageAccountName = "YOUR_AZURE_STORAGE_ACCOUNT_NAME";
const azureAccountAccessKey = "YOUR_AZURE_ACCOUNT_ACCESS_KEY"
const azureInputPath = "PATH/TO/INPUT/FILE/IN/YOUR/AZURE/account.psd";
const azureOutputPath = "PATH/TO/WHERE/YOUR/WANT/THE/output.jpg";
const azureContainerName= "YOUR_AZURE_COTAINER_NAME";

// FILL OUT INFORMATION ABOUT THE PSD AND TEXTLAYER
const textLayerName = "NAME_OF_THE_LAYER";
const textLayerContent = "YOUR_CONTENT";
```
* Run the script
```bash
npm install
node app.js
```
NOTE: This script should work with node.js >= 10
