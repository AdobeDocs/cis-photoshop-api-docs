---
title: Examples of IC API use
description: Learn how to use IC APIs.
---
# How to use the APIs

The API's are documented at [https://adobedocs.github.io/photoshop-api-docs/#api-Sensei](https://adobedocs.github.io/photoshop-api-docs-pre-release/#api-Sensei)

First be sure to follow the instructions in the [Overview](../../../getting-started/#overview) section to get your token.

## Example 1: Initiate a job to create an image cutout

The `/cutout` api takes a single input image to generate your mask or cutout from. Using [Example.jpg](https://github.com/AdobeDocs/cis-photoshop-api-docs-pre-release/blob/main/sample_files/Example.jpg), a typical curl call might look like this:

```shell
curl -X POST \
  https://image.adobe.io/sensei/cutout \
  -H 'Authorization: Bearer <auth_token>' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <YOUR_API_KEY>' \
  -d '{
   "input":{
      "storage":"external",
      "href":"<SIGNED_GET_URL>"
   },
   "output":{
      "storage":"external",
      "href":"<SIGNED_PUT_URL>",
      "mask":{
         "format":"binary"
      }
   }
}'
```

This initiates an asynchronous job and returns a response containing the href to poll for job status and the JSON manifest.
```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/sensei/status/e3a13d81-a462-4b71-9964-28b2ef34aca7"
        }
    }
}
```


Using the job id returned from the previous call you can poll on the returned `/status` href to get the job status

```shell
curl -X GET \
  https://image.adobe.io/sensei/status/e3a13d81-a462-4b71-9964-28b2ef34aca7 \
  -H 'Authorization: Bearer <auth_token>' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <YOUR_API_KEY>'
```

Once the job is complete your successful `/status` response will look similar to the response below; The output will have been placed in your requested location. In the event of failure the errors will be shown instead

```json
{
    "jobID": "e3a13d81-a462-4b71-9964-28b2ef34aca7",
    "status": "succeeded",
    "created": "2020-02-11T21:08:43.789Z",
    "modified": "2020-02-11T21:08:48.492Z",
    "input": "<SIGNED_GET_URL>",
    "_links": {
        "self": {
            "href": "https://image.adobe.io/sensei/status/e3a13d81-a462-4b71-9964-28b2ef34aca7"
        }
    },
    "output": {
        "storage": "external",
        "href": "<SIGNED_PUT_URL>",
        "mask": {
            "format": "binary"
        }
    }
}
```

## Example 2: Initiate a job to create an image mask

The workflow is exactly the same as [creating an image cutout](#example-1-initiate-a-job-to-create-an-image-cutout) except you use the `/mask` endpoint instead of `/cutout`.  

## Customized Workflow
This section will demonstrate how to make a 'customized workflow' by chaining different APIs.

### Example 3: (Generate ImageCutOut result as Photoshop path)
This workflow is ONLY for users who'd like to generate cutout result as Photoshop path instead of regular mask or cutout in above [example 1](#example-1-initiate-a-job-to-create-an-image-cutout) and [example 2](#example-2-initiate-a-job-to-create-an-image-mask). You will need to chain API calls to ImageCutOut service and Photoshop Service to achieve this goal.

#### Sample Input/Output
Sample input from [here](https://github.com/AdobeDocs/cis-photoshop-api-docs-pre-release/blob/main/sample_files/ic_customized_workflow/input.jpg).
Sample output from [here](https://github.com/AdobeDocs/cis-photoshop-api-docs-pre-release/blob/main/sample_files/ic_customized_workflow/result_with_path.jpg) (Note: you will need to open result in Photoshop Desktop application so that you will see the path in path panel)

#### Instructions

1. Download the make-file.atn file from [here](https://github.com/AdobeDocs/cis-photoshop-api-docs-pre-release/blob/main/sample_files/ic_customized_workflow/make-path.atn) (this file will be used in the Photoshop action API call)
2. Make the first API call to ImageCutOut service to generate intermediate result as RGBA cutout
3. Make the second API call to Photoshop action service to use above intermediate result as well as the make-file.atn file to generate final JPEG format result with desired PS path embedded
4. Open the final result with Photoshop Desktop app to check generated path in path panel


#### Sample Code
You can download the sample end-to-end bash script [here](https://github.com/AdobeDocs/cis-photoshop-api-docs-pre-release/tree/main/sample-code/ic-customized-workflow-app) and then follow the comments to try it out this customized workflow.
