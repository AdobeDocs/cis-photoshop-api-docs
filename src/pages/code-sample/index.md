---
title: Code Examples
description: Code Examples.
---
# Sample Code

## Lightroom

### Autotone an image

```shell
curl -X POST \
  https://image.adobe.io/lrService/autoTone \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json" \
  -d '{
    "inputs": {
        "href": "<SIGNED_GET_URL>",
        "storage": "<storage>"
    },
    "outputs": [
        {
            "href": "<SIGNED_POST_URL>",
            "type": "<type>",
            "storage": "<storage>"
        }
    ]
}'
```
This initiates an asynchronous job and returns a request body containing the href to poll for job status.

```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/lrService/status/<:jobId>"
        }
    }
}
```
To check the status of the job completion, use the `/status` API. An example usage of the API can be found [here](/code-sample/#example-6-poll-for-status-and-results).

### Autostraighten an image

```shell
curl -X POST \
  https://image.adobe.io/lrService/autoStraighten \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json" \
  -d '{
    "inputs": {
        "href": "<SIGNED_GET_URL>",
        "storage": "<storage>"
    },
    "outputs": [
        {
            "href": "<SIGNED_POST_URL>",
            "type": "<type>",
            "storage": "<storage>"
        }
    ]
}'
```

This initiates an asynchronous job and returns a request body containing the href to poll for job status.

```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/lrService/status/<:jobId>"
        }
    }
}
```

To check the status of the job completion, use the `/status` API. An example usage of the API can be found [here](/code-sample/#example-6-poll-for-status-and-results).

### Apply presets to an image

```shell
curl -X POST \
  https://image.adobe.io/lrService/presets \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json" \
  -d '{
    "inputs": {
        "source": {
            "href": "<SIGNED_GET_URL>",
            "storage": "<storage>"
        },
        "presets": [
            {
                "href": "<SIGNED_GET_URL>",
                "storage": "<storage>"
            },
            {
                "href": "<SIGNED_GET_URL>",
                "storage": "<storage>"
            }
        ]
    },
    "outputs": [
        {
            "href": "<SIGNED_POST_URL>",
            "type": "<type>",
            "storage": "<storage>"
        }
    ]
}'
```
This initiates an asynchronous job and returns a request body containing the href to poll for job status.
```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/lrService/status/<:jobId>"
        }
    }
}
```
To check the status of the job completion, use the `/status` API. An example usage of the API can be found [here](https://github.com/AdobeDocs/lightroom-api-docs#job-status).

### Apply edits to an image

```shell
curl -X POST \
  https://image.adobe.io/lrService/edit \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json" \
  -d '{
    "inputs": {
        "source": {
            "href": "<SIGNED_GET_URL>",
            "storage": "<storage>"
        }
    },
    "options": {
        "Exposure": -5.00 to 5.00,
        "Contrast": -100 to 100,
        "Sharpness": 0 10 150,
        "WhiteBalance": <"As Shot", "Auto", "Cloudy", "Custom", "Daylight", "Flash", "Fluorescent", "Shade", "Tungsten">
        "Saturation": -100 to 100,
        "ColorNoiseReduction": 0 to 100,
        "NoiseReduction": 0 to 100,
        "VignetteAmount": -100 to 100,
        "Vibrance": -100 to 100,
        "Highlights": -100 to 100,
        "Shadows": -100 to 100,
        "Whites": -100 to 100,
        "Blacks": -100 to 100,
        "Clarity": -100 to 100,
        "Dehaze": -100 to +100,
        "SharpenRadius": 0.5 to 3.0,
        "SharpenDetail": 0 to 100,
        "SharpenEdgeMasking": 0 to 100,
        "Texture": -100 t0 100
    },
    "outputs": [
        {
            "href": "<SIGNED_POST_URL>",
            "type": "<type>",
            "storage": "<storage>"
        }
    ]
}'
```
This initiates an asynchronous job and returns a request body containing the href to poll for job status.
```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/lrService/status/<:jobId>"
        }
    }
}
```

To check the status of the job completion, use the `/status` API. An example usage of the API can be found [here](/code-sample/#example-6-poll-for-status-and-results).

### Apply xmp to an image

```shell
curl -X POST \
  https://image.adobe.io/lrService/xmp \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json" \
  -d '{
    "inputs": {
        "href": "<SIGNED_GET_URL>",
        "storage": "<storage>"
    },
    "options": {
        "xmp": "<xmp>",
        "orientation": "<orientation>"
    },
    "outputs": [
        {
            "href": "<SIGNED_POST_URL>",
            "storage": "<storage>",
            "type": "<type>"
        }
    ]
}'
```
This initiates an asynchronous job and returns a request body containing the href to poll for job status.

```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/lrService/status/<:jobId>"
        }
    }
}
```

To check the status of the job completion, use the `/status` API. An example usage of the API can be found [here](/code-sample/#example-6-poll-for-status-and-results).

### Poll for status and results

Use the JobID to poll on the href that is returned in the response from one of the Lightroom APIs.
1. Upon successful job completion, the output file will be available at the specified output href.
2. If the job failed due to an error, the `errorDetails` field in the response will contain the details of the failure.

```shell
curl -X GET \
  https://image.adobe.io/lrService/status/<jobId> \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json" \
```

And this will return a request body containing the job status for each requested output and eventually either errors or the hrefs to the requested outputs

```json
{
  "jobId":"<jobId>",
  "created":"2018-01-04T12:57:15.12345:Z",
  "modified":"2018-01-04T12:58:36.12345:Z",
  "outputs":[
  {
      "input":"<input_file_href>",
      "status":"succeeded",
      "_links":{
        "self":
        {
          "href":"<output_file_href>",
          "storage":"<storage>"
        }
      }
    }
  ],
  "_links":{
    "self":{
      "href":"https://image.adobe.io/lrService/status/<jobId>"
    }
  }
}
```

## Customized Workflow
### Generate Remove Background result as Photoshop path
This workflow is ONLY for users who'd like to generate remove background result as Photoshop path instead of regular mask or remove background in above [example 1](/code-sample/#example-1-image-cutout) and [example 2](/code-sample/#example-2-image-mask). You will need to chain API calls to Remove Background service and Photoshop Service to achieve this goal.

#### Sample Input/Output
Sample input from [here](https://github.com/AdobeDocs/cis-photoshop-api-docs/blob/main/sample_files/ic_customized_workflow/input.jpg).
Sample output from [here](https://github.com/AdobeDocs/cis-photoshop-api-docs/blob/main/sample_files/ic_customized_workflow/result_with_path.jpg) (Note: you will need to open result in Photoshop Desktop application so that you will see the path in path panel)

#### Instructions

1. Download the make-file.atn file from [here](https://github.com/AdobeDocs/cis-photoshop-api-docs/blob/main/sample_files/ic_customized_workflow/make-path.atn) (this file will be used in the Photoshop action API call)
2. Make the first API call to Remove Background service to generate intermediate result as RGBA remove background
3. Make the second API call to Photoshop action service to use above intermediate result as well as the make-file.atn file to generate final JPEG format result with desired PS path embedded
4. Open the final result with Photoshop Desktop app to check generated path in path panel


#### Sample Code
You can download the sample end-to-end bash script [here](https://github.com/AdobeDocs/cis-photoshop-api-docs/tree/main/sample-code/ic-customized-workflow-app) and then follow the comments to try it out this customized workflow.

## Triggering an Event from the API's
In order to start receiving the events in your Webhook Application, the additional thing that needs to be done is to pass in your IMS ORG ID in a header: `x-gw-ims-org-id: <YOUR_IMS_ORG_ID>`, when you make an API call to initiate a job. Please have a look at the examples below that demonstrates the usage of the new header and a sample event received for that job.
### Example 1: Retrieving a PSD manifest from the Photoshop API

#### Step 1: Initiate a job to retrieve a PSD's JSON manifest

The `/documentManifest` api can take one or more input PSD's to generate JSON manifest files from. The JSON manifest is the tree representation of all of the layer objects contained in the PSD document. Using Example.psd, with the use case of a document stored in your external storage, a typical curl call might look like this:

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/documentManifest \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json" \
  -H 'x-gw-ims-org-id: <YOUR_IMS_ORG_ID>' \
  -d '{
  "inputs": [
    {
      "href":"<SIGNED_GET_URL>",
      "storage":"<storage>"
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
### Auto tone an image through the Lightroom API

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
      "storage": "<storage>"
    },
    "outputs": [
    {
      "href": "<SIGNED_POST_URL>",
      "type": "<type>",
      "storage": "<storage>"
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
                "href": "<SIGNED_POST_URL>",
                "storage": "<storage>"
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
