---
title: General Workflow of Photoshop API
description: General Workflow of Photoshop API
---
# General Workflow for our API

The typical workflow involves making one or more calls to our API, to edit PSD or other image files, and to create new image renditions.

## Input and Output file storage

Clients can use assets stored on one of the following storage types:
- AWS S3: By using a presigned GET/PUT URL
- Azure: By generating a SAS (Shared Access Signature) for upload/download
- Dropbox: Generate temporary upload/download links using https://dropbox.github.io/dropbox-api-v2-explorer/

## Current Limitations
There are a few limitations to the APIs you should be aware of ahead of time.  
- Multi-part uploads and downloads are not yet supported
- All the endpoints only support a single file input
- Error handling is a work in progress. Sometimes you may not see the most helpful of messages

## Retries
For increased reliability and stability we have added retry mechanism for our API calls.
- The service will retry status codes of 429, 502, 503, 504 three times.
- You should only retry requests that have a 5xx response code. A 5xx error response indicates there was a problem processing the request on the server.
- You should implement an exponential back-off retry strategy with 3 retry attempts.
- You should not retry requests for any other response code.

## Compatibility with Photoshop versions

- The API’s will open any PSD created with Photoshop 1.0 through the current release and this will always be true.
- When saving as PSD, the APIs will create PSDs compatible with the current shipping Photoshop.
- In regards to "maximize compatibility" referenced in https://helpx.adobe.com/photoshop/using/file-formats.html#maximize_compatibility_for_psd_and_psb_files  the API's default to “yes”
