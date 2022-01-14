---
title: General Workflow of Photoshop API
description: General Workflow of Photoshop API
---
# General Workflow for our API

The typical workflow involves making one or more calls to our API, to edit PSD or other image files, and to create new image renditions.

As you begin integrating the Ps APIs into your workflow, there are a few considerations to keep in mind which we've outlined below:

## Input and Output file storage

We currently do not support Cloud docs. You can use any of the following services for input and output storage.
- AWS S3: By using a presigned GET/PUT URL. More Info [here](https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html).
  Here are some code samples for getting presigned urls
  - [Example](https://github.com/AdobeDocs/cis-photoshop-api-docs/tree/main/sample-code/storage-app/aws-s3/presignedURLs.js) in Node.JS
  - [Example](https://github.com/AdobeDocs/cis-photoshop-api-docs/tree/main/sample-code/storage-app/aws-s3/presignedURLs.js) in Python
  - You can find a sample NodeJS application [here](https://github.com/AdobeDocs/cis-photoshop-api-docs/tree/main/sample-code/storage-app/aws-s3/example.js)
- Azure: By generating a SAS (Shared Access Signature) for upload/download. More Info [here](https://azuresdkdocs.blob.core.windows.net/$web/python/azure-storage-blob/12.9.0/index.html).
  Here are some code samples for getting presigned urls
  - [Example](https://github.com/AdobeDocs/cis-photoshop-api-docs/tree/main/sample-code/storage-app/azure/presignedURLs.js) in Node.JS
  - [Example](https://github.com/AdobeDocs/cis-photoshop-api-docs/tree/main/sample-code/storage-app/azure/presignedURLs.js) in Python
- Dropbox: Generate temporary upload/download. More Info [here](https://www.dropbox.com/developers/documentation).
  You can create file upload link for dropbox [here](https://www.dropbox.com/developers/documentation/http/documentation#files-get_temporary_upload_link)

## Current Limitations
There are a few limitations to the APIs you should be aware of ahead of time.  
- Multi-part uploads and downloads are not yet supported
- All the endpoints only support a single file input
- Error handling is a work in progress. Sometimes you may not see the most helpful of messages

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
