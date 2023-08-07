# s3-smart-object-replacement
The following code demostrates how to use <a href="https://developer.adobe.com/photoshop/photoshop-api-docs/api/#operation/smartObject">Photoshop SmartObject Replacement API</a>

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
const s3BucketName = "YOUR_BUCKET_NAME";
const awsRegion = "YOUR_BUCKET_REGION"
const s3InputPath = "PATH/TO/input.psd"
const s3ReplacementImagePath = "PATH/TO/REPLACEMENT/image.png"
const s3OutputPath = "PATH/TO/WHERE/YOU/WANT/THE/output.jpg";

// FILL OUT INFORMATION ABOUT THE PSD AND TEXTLAYER
const smartObjectLayerName = "NAME_OF_THE_SMARTOBJECT_LAYER";
```
* Run the script
```bash
npm install
node app.js
```
NOTE: This script should work with node.js >= 14
