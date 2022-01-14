/*************************************************
# install aws-sdk
npm install aws-sdk
# executescript
REGION=<AWS_REGION_YOU_BUCKET_IS_IN> BUCKET=<YOUR_BUCKET_NAME> OBJECT_KEY=<ANYTHING_YOU_WANT> OPERATION=<getObject | putObject> node presignedURLs.js
# example of GET pre-signed url
REGION=us-east-1 BUCKET=john-bucket OBJECT_KEY=some/path/to/image.psd OPERATION=getObject node presignedURLs.js
# example of PUT pre-signed url
REGION=us-east-1 BUCKET=john-bucket OBJECT_KEY=some/path/to/where/you/want/the/ouptut.jpg OPERATION=putObject node presignedURLs.js
************************************************/
var AWS = require('aws-sdk')
var bucket = process.env.BUCKET
var object_key = process.env.OBJECT_KEY
var operation =  process.env.OPERATION || 'putObject'
var region = process.env.REGION
AWS.config.update({"region": region});


let params = {Bucket: bucket, Key: object_key, Expires: 3600 * 24};
let s3 = new AWS.S3({apiVersion: '2006-03-01', signatureVersion: 'v4'});
s3.getSignedUrl(operation, params, function (err, url) {
  if(err){
    console.log(err)
  }else{
    console.log(url)
  }
});
