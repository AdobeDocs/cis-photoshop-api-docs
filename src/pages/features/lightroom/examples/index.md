---
title: Examples of Lightroom API use
description: Learn how to use Lightroom APIs.
---

# How to use the API's

The API's are documented at [https://adobedocs.github.io/photoshop-api-docs-pre-release/#api-Lightroom](https://adobedocs.github.io/photoshop-api-docs-pre-release/#api-Lightroom)

## Using Webhooks through Adobe I/O Events
Adobe I/O Events offers the possibility to build an event-driven application, based on events originating from Photoshop and Lightroom API's. To start listening for events, your application needs to register a webhook URL, specifying the Event Types to receive. Whenever a matching event gets triggered, your application is notified through an HTTP POST request to the webhook URL.
The Event Provider for Photoshop and Lightroom API's is `Imaging API Events`.
This event provider has two event types:
1. `Photoshop API events`
2. `Lightroom API events`

As the names indicate, these event types represent events triggered by the individual APIs.
### Registering your application to our Event Provider
*Prerequisites needed to use the Event Provider **
1. Only supported for a `Service Integration`: You will have to create your own Service Integration, please refer to [this](../../getting-started/#free-trial-users-jwt-authentication) section of the document for details on how to create a Service Integration.
2. Make sure that the integration is created under your own Organization Role in https://console.adobe.io and this will ensure that you have a unique `Organization ID`. A typical ID would look something like this: `ABCDEF123B6CCB7B0A495E2E@AdobeOrg` and can be found in the overview section of the details of the integration.
3. Create a Webhook application. [This](https://www.adobe.io/apis/experienceplatform/events/docs.html#!adobedocs/adobeio-events/master/intro/webhooks_intro.md) page gives all the details of what the skeleton of a basic application would look like. You can find a sample NodeJS application [here](https://github.com/AdobeDocs/cis-photoshop-api-docs-pre-release/tree/main/sample-code/webhook-sample-app)

### Registering the Webhook
Once the above prerequisites are met, you can now proceed to register the webhook to the service integration. The steps to do that can be found  [here](https://www.adobe.io/apis/experienceplatform/events/docs.html#!adobedocs/adobeio-events/master/intro/webhooks_intro.md#your-first-webhook).
After the webhook has been successfully registered, you will start to receive the events for any submitted job that either succeeded or failed, from the Event Types selected. This eliminates the need for your application to poll for the status of the job using the jobID.

### Triggering an Event from the API's
In order to start receiving the events in your Webhook Application, the additional thing that needs to be done is to pass in your IMS ORG ID in a header: `x-gw-ims-org-id: <YOUR_IMS_ORG_ID>`, when you make an API call to initiate a job. Please have a look at the examples below that demonstrates the usage of the new header and a sample event received for that job.

### Example 1: /documentManifest (Retrieving a PSD manifest from the Photoshop API)

#### Step 1: Initiate a job to retrieve a PSD's JSON manifest

The `/documentManifest` api can take one or more input PSD's to generate JSON manifest files from. The JSON manifest is the tree representation of all of the layer objects contained in the PSD document. Using Example.psd, with the use case of a document stored in your external storage, a typical curl call might look like this:

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/documentManifest \
  -H 'Authorization: Bearer <auth_token>' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <YOUR_API_KEY>' \
  -H 'x-gw-ims-org-id: <YOUR_IMS_ORG_ID>' \
  -d '{
  "inputs": [
    {
      "href":"<SIGNED_GET_URL>",
      "storage":"external"
    }
  ]
}'
```

This initiates an asynchronous job and returns a response containing the href to poll for job status and the JSON manifest.
```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/pie/psdService/status/63c6e812-6cb8-43de-8a60-3681a9ec6feb"
        }
    }
}
```
#### Step 2: Receive the Job's status on the Webhook application when the job is complete
The value in the key `body` inside the event JSON contains the result of the job. Here is a sample event received from the job initiated above:
```json
{
  "event_id": "b412a90e-8bc0-4f0d-931e-9e9b8d24993d",
  "event": {
    "header": {
      "msgType": "JOB_COMPLETION_STATUS",
      "msgId": "8afa1a46-2733-406c-a646-e1c1acdee333",
      "imsOrgId": "<YOUR_IMS_ORG_ID>",
      "eventCode": "photoshop-job-status",
      "_pipelineMeta": {
        "pipelineMessageId": "1586288145511:631472:VA7_A1:142:0"
      },
      "_smarts": {
        "definitionId": "3ee6c9056a9d72fc40e09ddf5fdbb0af752e8e49",
        "runningSmartId": "psmart-yw6wosjksniuuathenny"
      },
      "_adobeio": {
        "imsOrgId": "<YOUR_IMS_ORG_ID>",
        "providerMetadata": "di_event_code",
        "eventCode": "photoshop-job-status"
      }
    },
    "body": {
      "jobId": "63c6e812-6cb8-43de-8a60-3681a9ec6feb",
      "outputs": [
        {
          "status": "succeeded",
          "layers": [
            {
              "id": 2,
              "index": 0,
              "type": "layer",
              "name": "Layer",
              "locked": false,
              "visible": true,
              "bounds": {
                "top": 0,
                "left": 0,
                "width": 100,
                "height": 100
              },
              "blendOptions": {
                "opacity": 100,
                "mode": "normal"
              }
            }
          ],
          "document": {
            "name": "test.psd",
            "width": 1000,
            "height": 1000,
            "bitDepth": 8,
            "imageMode": "rgb",
            "photoshopBuild": "Adobe Creative Imaging Service"
          }
        }
      ],
      "_links":{
        "self":{
          "href":"https://image.adobe.io/pie/psdService/status/8ec6e4f5-b580-41ac-b693-a72f150fec59"
        }
      }
    }
  }
}
```
### Example 2: /autoTone (Auto tone an image through the Lightroom API)

#### Step 1: Initiate a job to auto tone an image
```shell
curl -X POST \
  https://image.adobe.io/lrService/autoTone \
  -H "Authorization: Bearer $token" \
  -H "Content-Type: application/json" \
  -H "x-api-key: <YOUR_API_KEY>" \
  -H 'x-gw-ims-org-id: <YOUR_IMS_ORG_ID>' \
  -d '{
    "inputs": {
      "href": "<SIGNED_GET_URL>",
      "storage": "external"
    },
    "outputs": [
    {
      "href": "<SIGNED_PUT_URL>",
      "type": "<type>",
      "storage": "external",
      "overwrite": <boolean>
    }
  ]
}'
```

This initiates an asynchronous job and returns a request body containing the href to poll for job status.

```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/lrService/status/eb4a9211-eb8a-4e88-b853-b9c08ba47427"
        }
    }
}
```
#### Step 2: Receive the Job's status on the Webhook application when the job is complete
The value in the key `body` inside the event JSON contains the result of the job. Here is a sample event received from the job initiated above:
```json
{
  "event_id": "7b59cc70-88d7-4895-b204-87f5350a0cce",
  "event": {
    "header": {
      "msgType": "JOB_COMPLETION_STATUS",
      "msgId": "eb4a9211-eb8a-4e88-b853-b9c08ba47427",
      "imsOrgId": "<YOUR_IMS_ORG_ID>",
      "eventCode": "lightroom-job-status",
      "_pipelineMeta": {
        "pipelineMessageId": "1586290300876:944289:VA7_A1:149:0"
      },
      "_smarts": {
        "definitionId": "3ee6c9056a9d72fc40e09ddf5fdbb0af752e8e49",
        "runningSmartId": "psmart-yw6wosjksniuuathenny"
      },
      "_adobeio": {
        "imsOrgId": "<YOUR_IMS_ORG_ID>",
        "providerMetadata": "di_event_code",
        "eventCode": "lightroom-job-status"
      }
    },
    "body": {
      "jobId": "eb4a9211-eb8a-4e88-b853-b9c08ba47427",
      "outputs": [
        {
          "input": "<SIGNED_GET_URL>",
          "status": "succeeded",
          "_links": {
            "self": [
              {
                "href": "<SIGNED_PUT_URL>",
                "storage": "external"
              }
            ]
          }
        }
      ],
      "_links": {
        "self": {
          "href": "https://image.adobe.io/lrService/status/eb4a9211-eb8a-4e88-b853-b9c08ba47427"
        }
      }
    }
  }
}
```
