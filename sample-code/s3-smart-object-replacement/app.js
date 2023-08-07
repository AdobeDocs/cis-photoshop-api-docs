let URL = require('url')
let AWS = require('aws-sdk')
const fs = require("fs")
const request = require('request')
const endpoint = "https://image.adobe.io/pie/psdService/smartObject"

/**********************************************************************/
/**********************************************************************/
/*************** FILL IN THE FOLLOWING INFORMATION **********************/
/**********************************************************************/
/**********************************************************************/
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

async function getSignedURL(bucket, destKey, region, op){
  let s3 = new AWS.S3({ region: region, apiVersion: '2006-03-01', signatureVersion: 'v4' })
  let params = {Bucket: bucket, Key: destKey};
  return new Promise((resolve, reject) => {
    s3.getSignedUrl(op, params, (err, url)=>{
      if(err){
        reject(err)
      }else{
        resolve(url)
      }
    });
  })
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
  let inputUrl = await getSignedURL(s3BucketName, s3InputPath, awsRegion, 'getObject')
  let replacementImageUrl = await getSignedURL(s3BucketName, s3ReplacementImagePath, awsRegion, 'getObject')
  let outputUrl = await getSignedURL(s3BucketName, s3OutputPath, awsRegion, 'putObject')

  let requestBody = {
    "inputs":[
      {
        "href": inputUrl,
        "storage": "external"
      }
    ],
    "options":{
      "layers":[
        {
          "name": smartObjectLayerName,
          "input": {
            "href": replacementImageUrl,
            "storage": "external"
          }
        }
      ]
    },
    "outputs":[
      {
        "href": outputUrl,
        "storage": "external",
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
