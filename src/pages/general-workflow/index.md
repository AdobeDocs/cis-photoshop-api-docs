---
title: General Workflow of Photoshop API
description: General Workflow of Photoshop API
---
## General Workflow

The typical workflow involves making one or more calls to our API to optionally edit an input PSD or image file and/or create new image renditions. The endpoints are asynchronous so the response will contain the `/status` endpoint to poll for job status and results.

## Input and Output file storage

Clients can use assets stored on one of the following storage types:
- External:
  - AWS S3: By using a presigned GET/PUT URL
  - Azure: By generating a SAS (Shared Access Signature) for upload/download
  - Dropbox: Generate temporary upload/download links using https://dropbox.github.io/dropbox-api-v2-explorer/
- Internal Adobe Employees can use Adobe Creative Cloud Storage by referencing the path to the files in Creative Cloud.

## Current Limitations
There are a few limitations to the APIs you should be aware of ahead of time.  
- Multi-part uploads and downloads are not yet supported
- All the endpoints only support a single PSD input
- Error handling is a work in progress. Sometimes you may not see the most helpful of messages

## Photoshop Service
### Tracking document changes for Photoshop Services

If you are making multiple edits to a PSD during the course of a user session it is your decision on how you want to track and store changes from one version of a PSD to another. Some clients will choose to refresh the document's JSON manifest by calling `/documentManifest` again after each call to `/documentOperations`. Other clients may choose to cache the changes locally and then make one final call to `/documentOperations` with the original PSD and the accumulated changes requested by the user.

### Compatibility with Photoshop versions

1. The API’s will open any PSD created with Photoshop 1.0 through the current release and this will always be true.
2. When saving as PSD, the API’s will create PSD’s compatible with the current shipping Photoshop.
3. In regards to "maximize compatibility" referenced in https://helpx.adobe.com/photoshop/using/file-formats.html#maximize_compatibility_for_psd_and_psb_files  the API's default to “yes”
