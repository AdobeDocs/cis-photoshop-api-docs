---
title: Features in Photoshop Service
description: Learn about the available features in Photoshop Service.
---
## General Workflow

The typical workflow involves making one or more calls to `/documentOperations`, `/smartObject` to optionally edit an input PSD, and/or create new image renditions. Both endpoints are asynchronous so the response will contain the `/status` endpoint to poll for job status and results.

Optionally, another call can be made to retrieve the manifest file (a JSON representation of the documents layer tree) for this PSD document via the `/documentManifest` API.

## Input and Output file storage

Clients can use assets stored on one of the following storage types:
External:
AWS S3: By using a presigned GET/PUT URL
Azure: By generating a SAS (Shared Access Signature) for upload/download
Dropbox: Generate temporary upload/download links using https://dropbox.github.io/dropbox-api-v2-explorer/

Internal Adobe Employees can use Adobe Creative Cloud Storage by referencing the path to the files in Creative Cloud.

## Tracking document changes

If you are making multiple edits to a PSD during the course of a user session it is your decision on how you want to track and store changes from one version of a PSD to another. Some clients will choose to refresh the document's JSON manifest by calling `/documentManifest` again after each call to `/documentOperations`. Other clients may choose to cache the changes locally and then make one final call to `/documentOperations` with the original PSD and the accumulated changes requested by the user.

## Sample Code

The [sample_code](https://github.com/AdobeDocs/cis-photoshop-api-docs-pre-release/tree/main/sample-code) contains sample code for calling the Photoshop APIs.

Note that the sample code is covered by the MIT license.

## Current Limitations
There are a few limitations to the APIs you should be aware of ahead of time.  
- Multi-part uploads and downloads are not yet supported
- The `/documentOperations` , `/documentManifest`, `/renditionCreate` and `/smartObject` endpoints only support a single PSD input
- Error handling is a work in progress. Sometimes you may not see the most helpful of messages

The file Example.psd is included in this repository if you'd like to experiment with these example calls on your own.
