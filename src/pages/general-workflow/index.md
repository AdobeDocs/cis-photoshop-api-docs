---
title: General Workflow of Photoshop API
description: General Workflow of Photoshop API
---
# General Workflow for our API

The typical workflow involves making one or more calls to our API, to edit PSD or other image files, and to create new image renditions.

As you begin integrating the Ps APIs into your workflow, there are a few considerations to keep in mind which we've outlined below:

## Input and Output file storage

We have compiled a list of storage services that work well with our API but any public url or pre-signed url should work. If you aren't familiar with pre-signed urls you can learn more about them here.

You can use any of the following services for input and output storage.
- AWS S3: By using a presigned GET/PUT URL. More info [here](https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html).
  Here are some code samples for getting presigned urls.
  - [Example](https://github.com/AdobeDocs/cis-photoshop-api-docs/tree/main/sample-code/storage-app/aws-s3/presignedURLs.js) in Node.js. <br />Please note that creating presigned urls for AWS S3 requires signature version S3V4, as demonstrated in the sample code.
  - [Example](https://github.com/AdobeDocs/cis-photoshop-api-docs/tree/main/sample-code/storage-app/aws-s3/presignedURLs.py) in Python
  - You can find a sample NodeJS application [here](https://github.com/AdobeDocs/cis-photoshop-api-docs/tree/main/sample-code/storage-app/aws-s3/example.py)
- Azure: By generating a SAS (Shared Access Signature) for upload/download. More info [here](https://azuresdkdocs.blob.core.windows.net/$web/python/azure-storage-blob/12.9.0/index.html).
  Here are some code samples for getting presigned urls.
  - [Example](https://github.com/AdobeDocs/cis-photoshop-api-docs/tree/main/sample-code/storage-app/azure/presignedURLs.js) in Node.js
  - [Example](https://github.com/AdobeDocs/cis-photoshop-api-docs/tree/main/sample-code/storage-app/azure/presignedURLs.py) in Python
- Dropbox: Generate temporary upload/download URLs. More info [here](https://www.dropbox.com/developers/documentation).
  You can create file upload link for dropbox [here](https://www.dropbox.com/developers/documentation/http/documentation#files-get_temporary_upload_link)
- Google Drive: By generating a public url for upload/download. More info [here](https://www.labnol.org/google-api-service-account-220404).
  Here are some code samples for getting presigned urls.
  - [Example](https://github.com/AdobeDocs/cis-photoshop-api-docs/tree/main/sample-code/storage-app/googledrive/presignedURLs.js) in Node.js  


**Note :** You can test to see if your public url or presigned url is working.

Run the curl command below to see if your input file path is working
  ```
  curl -X GET <Your file path> --output <some-file.jpg>
  ```
  If you are using a presigned url, put your file path within ""
  ```  
  curl -X GET "<Your file path>" --output <some-file.jpg>
  ```
Run the curl command below to see if your output file path is working
  ```
  curl -X PUT <Your file path> -d <some-file.txt>
  ```
  If you are using a presigned url, put your file path within ""
  ```
  curl -X PUT "<Your file path>" -d <some-file.txt>
  ```  


## Current Limitations
There are a few limitations to the APIs you should be aware of ahead of time.  
- Multi-part uploads and downloads are not yet supported.
- All the endpoints only support a single file input.
- Error handling is a work in progress. Sometimes you may not see the most helpful of messages.

## Retries
For increased reliability and stability we have added a retry mechanism for all API calls, and have some recommendations on how to handle these:
- The service will retry status codes of 429, 502, 503, 504 three times.
- You should only retry requests that have a 5xx response code. A 5xx error response indicates there was a problem processing the request on the server.
- You should implement an exponential back-off retry strategy with 3 retry attempts.
- You should not retry requests for any other response code.

## Compatibility with Photoshop versions

- The APIs will open any PSD created with Photoshop 1.0 or later.
- When saving as PSD, the APIs will create PSDs compatible with the current shipping Photoshop.
- In regards to "maximize compatibility" referenced in https://helpx.adobe.com/photoshop/using/file-formats.html#maximize_compatibility_for_psd_and_psb_files  the API's default to “yes”
