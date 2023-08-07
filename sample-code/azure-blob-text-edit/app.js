const storage = require("@azure/storage-blob")
const fs = require("fs")
const request = require('request')
const endpoint = "https://image.adobe.io/pie/psdService/text"

/**********************************************************************/
/**********************************************************************/
/*************** FILL IN THE FOLLOWING INFORMATION **********************/
/**********************************************************************/
/**********************************************************************/
// FILL OUT INFORMATION ABOUT YOUR ADOBE CREDENTIALS
// VISIT https://developer.adobe.com/console/projects to obtain the following information
const imsConfig = {
  clientId: "YOUR_ADOBE_CLIENT_ID",
  clientSecret: "YOUR_ADOBE_CLIENT_SECRET",
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

/**********************************************************************/
/**********************************************************************/
/**********************************************************************/

async function generateIMSToken() {
  const url = 'https://ims-na1.adobelogin.com/ims/token/v3';
  const options = {
    method: 'POST',
    url: url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      grant_type: 'client_credentials',
      client_id: imsConfig.clientId,
      client_secret: imsConfig.clientSecret,
      scope: 'openid,AdobeID,read_organizations'
    }
  };

  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if(err || res.statusCode >= 400) {
        reject( err || body )
      }else{
        resolve( body )
      }
    })
  })
}

async function generateSASUrl(accountname, key, containerName, blobName){
  const cerds = new storage.StorageSharedKeyCredential(accountname,key);
  const blobServiceClient = new storage.BlobServiceClient(`https://${accountname}.blob.core.windows.net`,cerds);
  const client =blobServiceClient.getContainerClient(containerName)
  const blobClient = client.getBlobClient(blobName);

  const blobSAS = storage.generateBlobSASQueryParameters({
    containerName,
    blobName,
    permissions: storage.BlobSASPermissions.parse("racwd"),
    startsOn: new Date(),
    expiresOn: new Date(new Date().valueOf() + 86400)
  },
  cerds
  ).toString();

  const sasUrl= blobClient.url+"?"+blobSAS;
  return sasUrl;
}

async function postPhotoshopAPI(endpoint, apiKey, token, requestBody){
  let options = {
    url: endpoint,
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`,
      "x-api-key": apiKey
    },
    json: true,
    body: requestBody
  }
  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if(err || res.statusCode >= 400) {
        reject( err || body )
      }else{
        resolve( body )
      }
    })
  })
}

async function pollStatus(responseBody, apiKey, token){
  let options = {
    url: responseBody._links.self.href,
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`,
      "x-api-key": apiKey
    },
    json: true
  }

  return new Promise((resolve, reject) => {
    let pollFunction = () => {
      request(options, (err, res, body) => {
        console.log(body.jobId, body.outputs[0].status)
        if(err || res.statusCode >= 400) {
          clearInterval(intervalId)
          reject(err || res.statusCode)
        }else if(body.outputs[0].status == 'succeeded' || body.outputs[0].status == 'failed'){
          clearInterval(intervalId)
          resolve( body )
        }
      })
    }
    let intervalId = setInterval(pollFunction, 1000)
  })
}


async function main(){
  let authDetails = await generateIMSToken();
  let creds = JSON.parse(authDetails);
  let inputSASUrl = await generateSASUrl(azureStorageAccountName, azureAccountAccessKey, azureContainerName, azureInputPath)
  let outputSASUrl = await generateSASUrl(azureStorageAccountName, azureAccountAccessKey, azureContainerName, azureOutputPath)

  let requestBody = {
    "inputs":[
      {
        "href": inputSASUrl,
        "storage": "azure"
      }
    ],
    "options":{
      "layers":[
        {
          "name": textLayerName,
          "text": {
              "content": textLayerContent,
              "orientation": "horizontal",
              "characterStyles": [{
                  "size": 15,
                  "color": {
                    "red":255,
                    "green":0,
                    "blue":0
                  }
              }],
              "paragraphStyles": [{
                "alignment": "right"
              }]
          }
        }
      ]
    },
    "outputs":[
      {
        "href": outputSASUrl,
        "storage": "azure",
        "type": "image/jpeg"
      }
    ]
  }

  try{
    let response = await postPhotoshopAPI(endpoint, imsConfig.clientId, creds.access_token, requestBody)
    let status = await pollStatus(response, imsConfig.clientId, creds.access_token)
    console.log(JSON.stringify(status, null, 2))
  }catch(e){
    console.error(e)
  }

}

main();
