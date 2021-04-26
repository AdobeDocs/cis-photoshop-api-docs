---
title: Examples of Photoshop API use
description: Learn how to use Photoshop APIs.
---
# How to use the APIs

The API's are documented at https://adobedocs.github.io/photoshop-api-docs-pre-release/
The code snippets are using one of our [sample psd](https://github.com/AdobeDocs/photoshop-api-docs-pre-release/blob/master/sample_files/Example.psd) files. Please feel free to download and use it for testing. Just remember you will need to have this file stored in one of the accepted external storage. For more information on storage please refer to the [File Storage](https://github.com/AdobeDocs/photoshop-api-docs-pre-release#input-and-output-file-storage).

## Example 1: /smartObject

The `/smartObject` endpoint can take an input PSD file with an embedded smartobject and can replace with another smartobject.
This API is a simple API developed to ease the smartObject replacement workflow for an user.

### Sample 1: Replacing a SmartObject
This example shows how you can replace an embedded smart object

``` shell
curl - H "Authorization: Bearer $token" \
- H "x-api-key: $api_key" \
- X POST \
https: //image.adobe.io/pie/psdService/smartObject \
- d '{
  "inputs": [
  {
    "href": "<SIGNED_GET_URL>",
    "storage": "external"
  }],
  "options": {
    "layers": [{
      "name": "HeroImage",
      "input": {
        "href": "<SIGNED_GET_URL>",
        "storage": "external"
      }
     }
    ]
  },
  "outputs": [
  {
    "storage": "external",
    "href": "<SIGNED_PUT_URL>",
    "type": "vnd.adobe.photoshop"
  }
]}'
```

### Sample 2: Creating a SmartObject
This example shows how you can create an embedded smart object

``` shell
curl - H "Authorization: Bearer $token" \
- H "x-api-key: $api_key" \
- X POST \
https: //image.adobe.io/pie/psdService/smartObject
- d '{
  "inputs": [
  {
    "href": "<SIGNED_GET_URL>",
    "storage": "external"
  }],
  "options": {
    "layers": [{
      "name": "New",
      "add": {
        "insertTop": true
      },
      "input": {
        "href": "<SIGNED_GET_URL>",
        "storage": "external"
       }
      }
    ]
  },
  "outputs": [
  {
    "storage": "external",
    "href": "<SIGNED_PUT_URL>",
    "type": "vnd.adobe.photoshop"
  }
]}'
```

A call to this API initiates an asynchronous job and returns a response containing an href. Use the value in the href to poll for the status of the job. This is illustrated in [Example 6](#example-6-fetch-the-status-of-the-job-after-successfully-submitting-a-request).

## Example 2: /documentOperations

This example section will provide information and samples to demonstrate the use of `/documentOperations` API to work with Text Layers in particular.
Please refer to the [The add, edit and delete objects](#the-add-edit-and-delete-objects) section for more information on how to apply these operations on a text layer.

### Sample 2.1: Making a text layer edit

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/documentOperations \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -d '{
  "inputs":[
    {
      "href":"<SIGNED_GET_URL>",
      "storage":"external"
    }
  ],
  "options":{
    "layers":[
      {
        "name": "My Text Layer",
        "type": "textLayer",
        "text": {
            "content": "CHANGED TO NEW TEXT",
            "characterStyles": [{
                "fontSize": 15,
                "orientation": "horizontal",
                "fontColor": {
                    "rgb":{
                       "red":26086,
                       "green":23002,
                       "blue":8224
                    }
                }
            }],
            "paragraphStyles": [{
              "alignment": "right"
            }]
        },
        "edit": {}
      }
    ]
  },
  "outputs":[
    {
      "href":"<SIGNED_POST_URL>",
      "storage":"external",
      "type":"vnd.adobe.photoshop",
      "overwrite":true
    }
  ]
}'
```

### Sample 2.2: Custom font in a text layer
This will change the font in a text layer named `My Text Layer` to a custom font `VeganStylePersonalUse`.
**Note**: the value for the `fontName` field in the `text.characterStyles` section is the full postscript name of the custom font.

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/documentOperations \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -d '{
  "inputs":[
    {
      "href":"<SIGNED_GET_URL>",
      "storage":"external"
    }
  ],
  "options":{
    "fonts": {
        storage: "external",
        href: "<SIGNED_GET_URL_TO_VeganStylePersonalUse.ttf>"
    },
    "layers":[
      {
        "name": "My Text Layer",
        "type": "textLayer",
        "text": {
            "content": "CHANGED TO NEW TEXT WITH NEW FONT",
            "characterStyles": [{
                "fontName": "VeganStylePersonalUse",
                "orientation": "horizontal",
                "fontColor": {
                    "rgb":{
                       "red":26086,
                       "green":23002,
                       "blue":8224
                    }
                }
            }]
        },
        "edit": {}
      }
    ]
  },
  "outputs":[
    {
      "href":"<SIGNED_POST_URL>",
      "storage":"external",
      "type":"vnd.adobe.photoshop",
      "overwrite":true
    }
  ]
}'
```

### Sample 2.3: Dictating actions for missing fonts
In this request for example, if `MySampleFont` is not found while processing the request, the system default font (`ArialMT`) will be used as `manageMissingFonts` is set to `useDefault`
```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/documentOperations \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -d '{
  "inputs":[
    {
      "href":"<SIGNED_GET_URL>",
      "storage":"external"
    }
  ],
  "options":{
    "manageMissingFonts": "useDefault",
    "globalFont": "MySampleFont",
    "fonts": {
        storage: "external",
        href: "<SIGNED_GET_URL_TO_VeganStylePersonalUse.ttf>"
    },
    "layers":[
      {
        "name": "My Text Layer",
        "type": "textLayer",
        "text": {
            "content": "CHANGED TO NEW TEXT WITH NEW FONT",
            "characterStyles": [{
                "fontName": "VeganStylePersonalUse",
                "orientation": "horizontal",
                "fontColor": {
                    "rgb":{
                       "red":26086,
                       "green":23002,
                       "blue":8224
                    }
                }
            }]
        },
        "edit": {}
      }
    ]
  },
  "outputs":[
    {
      "href":"<SIGNED_POST_URL>",
      "storage":"external",
      "type":"vnd.adobe.photoshop",
      "overwrite":true
    }
  ]
}'
```

A call to this API initiates an asynchronous job and returns a response containing an href. Use the value in the href to poll for the status of the job. This is illustrated in [Example 6](#example-6-fetch-the-status-of-the-job-after-successfully-submitting-a-request).

## Example 3: /documentOperations

The `/documentOperations` API can be used to make layer and/or document level edits to your PSD and then generate new renditions with the changes. You can pass in a flat array of only the layers that you wish to act upon, in the request body's `options.layers` argument.

The layer name (or the layer id) will be used by the service to identify the correct layer to operation upon in your PSD.
Please refer to the [The add, edit and delete objects](#the-add-edit-and-delete-objects) section for more information on how to apply these operations on a layer.

### Sample 3.1: Making a simple edit
```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/documentOperations \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -d '{
  "inputs":[
    {
      "href":"<SIGNED_GET_URL>",
      "storage":"external"
    }
  ],
  "options":{
    "layers":[
      {
        "edit":{},     
        "id":750,
        "index":1,
        "locked":true,
        "name":"HeroImage",
        "type":"smartObject",
        "visible":true
      }
    ]
  },
  "outputs":[
    {
      "href":"<SIGNED_POST_URL>",
      "storage":"external",
      "type":"vnd.adobe.photoshop",
      "overwrite":true
    }
  ]
}'
```

### Sample 3.2: Creating new Renditions

See the `/renditionCreate` examples below as the format for the `outputs` object in the request body is identical

### Sample 3.3: Swapping the image in a smart object layer

In this example we want to swap the smart object in an existing embedded smart object layer, the Hero Image layer in Example.psd. We are requesting the following:

- The `edit` key is included to indicate we want to edit this layer
- The `layers.input` object is included to indicate where the replacement image can be found
- The `layers.smartObject` object is included to indicate specific information related to this image as SO

All the files used in the example are available in [sample_files](master/sample_files). You can download the files and put it in your CC account or any storage(AWS, Azure or Dropbox).

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/documentOperations \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -d '{
  "inputs":[
    {
      "href":"<SIGNED_GET_URL>",
      "storage":"external"
    }
  ],
  "options":{
    "layers":[
      {
        "edit":{},     
        "input":{                                       
          "href":"<SIGNED_GET_URL>",  
          "storage":"external"
        },
        "smartObject" : {                
          "type" : "image/png"
        },
        "attributes":{
          "bounds":{
            "height":515,
            "left":-385,
            "top":-21,
            "width":929
          }
        },
        "id":750,
        "index":1,
        "locked":false,
        "name":"HeroImage",
        "type":"smartObject",
        "visible":true
      }
    ]
  },
  "outputs":[
    {
      "href":"<SIGNED_POST_URL>",
      "storage":"external",
      "type":"vnd.adobe.photoshop",
      "overwrite":true
    }
  ]
}'
```

A call to this API initiates an asynchronous job and returns a response containing an href. Use the value in the href to poll for the status of the job. This is illustrated in [Example 6](#example-6-fetch-the-status-of-the-job-after-successfully-submitting-a-request).

### Sample 3.4: Adding a new adjustment layer

This example shows how you can add a new brightnessContrast adjustment layer to the top of your PSD.  Things to note:

- NEW KEYWORD TO INDICATE AN ADDITION: The `add` key is included, along with `insertAbove` in the new layer object to indicate exactly where you want the new layer placed in the overall Manifest tree.  
- LAYER TYPE IS REQUIRED: The type indicates you want a new layer of type adjustment layer.
- LAYER ID AND INDEX ARE NOT PRESENT: The layer index and id are not supported for add operations. The index is implied by the objects position in the manifest tree and the ID will be generated by the service and returned to you in subsequent calls to `/documentManifest`

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/documentOperations \
  -H 'Authorization: Bearer <auth_token>' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <YOUR_API_KEY>' \
  -d '{
  "inputs":[
    {
      "href":"<SIGNED_GET_URL>",
      "storage":"external"
    }
  ],
  "options":{
    "layers":[
      {                                        
        "add":{                               // <--- NEW KEYWORD TO INDICATE AN ADDITION
          "insertAbove": {
            "id": 549
          }                     // <--- INDICATES THE LAYER SHOULD BE CREATED ABOVE ID 549
        },
        "adjustments":{
          "brightnessContrast":{
            "brightness":25,
            "contrast":-40
          }
        },
        "name":"NewBrightnessContrast",
        "type":"adjustmentLayer"              // <--- LAYER TYPE IS REQUIRED
      }
    ]
  },
  "outputs":[
    {
      "href":"<SIGNED_POST_URL>",
      "storage":"external",
      "type":"image/jpeg"
    }
  ]
}'
```

A call to this API initiates an asynchronous job and returns a response containing an href. Use the value in the href to poll for the status of the job. This is illustrated in [Example 6](#example-6-fetch-the-status-of-the-job-after-successfully-submitting-a-request).

### Sample 3.5: Editing a pixel layer

In this example we want to replace the image in an existing pixel layer, the Hero Image layer in Example.psd. We are requesting the following:

- NEW KEYWORD TO INDICATE AN EDIT: The `edit` key is included to indicate we want to edit this layer
- NEW KEYWORD TO INDICATE IMAGE REPLACEMENT INFO: The `layers.input` object is included to indicate where the replacement image can be found


```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/documentOperations \
  -H 'Authorization: Bearer <auth_token>' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <YOUR_API_KEY>' \
  -d '{
  "inputs":[
    {
      "href":"<SIGNED_GET_URL>",
      "storage":"external"
    }
  ],
  "options":{
    "layers":[
      {
        "edit":{},                    // <--- NEW KEYWORD TO INDICATE AN ADDITION
        "input":{                                       // <--- NEW KEYWORD TO INDICATE IMAGE REPLACEMENT INFO
          "href":"<SIGNED_GET_URL>",
          "storage":"external"
        },
        "bounds":{
          "height":405,
          "left":0,
          "top":237,
          "width":300
        },
        "id":751,
        "index":2,
        "locked":false,
        "name":"BackgroundGradient",
        "type":"layer",
        "visible":true
      }
    ]
  },
  "outputs":[
    {
      "href":"<SIGNED_POST_URL>",
      "storage":"external",
      "type":"vnd.adobe.photoshop",
      "overwrite":true
    }
  ]
}
'
```

A call to this API initiates an asynchronous job and returns a response containing an href. Use the value in the href to poll for the status of the job. This is illustrated in [Example 6](#example-6-fetch-the-status-of-the-job-after-successfully-submitting-a-request).

## Example 4: /renditionCreate

The `/renditionsCreate` endpoint can take a number of input PSD files and generate new image renditions or a new PSD

### Sample 4.1: A single file input

This sample API call will request two different output renditions from our Example.psd input:

- `Example.jpeg` is a new JPEG rendition that has a width of 512 pixels
- `Example.png` is a new fullsize PNG rendition

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/renditionCreate \
  -H 'Authorization: Bearer <auth_token>' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <YOUR_API_KEY>' \
  -d '{
  "inputs":[
    {
      "href":"<SIGNED_GET_URL>",
      "storage":"external"
    }
  ],
  "outputs":[
    {
      "href":"<SIGNED_POST_URL1>",          
      "width": 512,
      "storage":"external",
      "type":"image/jpeg"      
    },
    {
      "href":"<SIGNED_POST_URL2>",
      "storage":"external",
      "type":"image/png"
    }
  ]
}'
```

A call to this API initiates an asynchronous job and returns a response containing an href. Use the value in the href to poll for the status of the job. This is illustrated in [Example 6](#example-6-fetch-the-status-of-the-job-after-successfully-submitting-a-request).

## Example 5: /documentManifest

The `/documentManifest` api can take one or more input PSD's to generate JSON manifest files from. The JSON manifest is the tree representation of all of the layer objects contained in the PSD document.

### Sample 5.1: Initiate a job to retrieve a PSD's JSON manifest

Using Example.psd, with the use case of a document stored in your external storage (ie. azure, aws, dropbox), a typical curl call might look like this:

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/documentManifest \
  -H 'Authorization: Bearer <auth_token>' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <YOUR_API_KEY>' \
  -d '{
  "inputs": [
    {
      "href":"<YOUR_PRESIGNED_URL>",
      "storage":"external"
    }
  ]
}'
```
A call to this API initiates an asynchronous job and returns a response containing an href. Use the value in the href to poll for the status of the job and the same response will also contain the JSON manifest. This is illustrated in [Example 6](#example-6-fetch-the-status-of-the-job-after-successfully-submitting-a-request) below.

##  Example 6: Fetch the status
Each of our Photoshop APIs, when invoked, initiates an asynchronous job and returns a response body that contains the href to poll for status of the job.

```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/pie/psdService/status/de2415fb-82c6-47fc-b102-04ad651c5ed4"
        }
    }
}
```
Using the job id returned from the response (ass above) of a successfully submitted API call, you can poll on the corresponding value in the `href` field, to get the status of the job.

```shell
curl -X GET \
  https://image.adobe.io/pie/psdService/status/de2415fb-82c6-47fc-b102-04ad651c5ed4 \
  -H 'Authorization: Bearer <auth_token>' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <YOUR_API_KEY>'
```
### Sample 6.1 Poll for job status - documentManifest

Once your job completes successfully (no errors/failures reported), the status response will contain your document's JSON manifest along with other metadata about the input document. The JSON Manifest is further described in the [api docs](https://git.corp.adobe.com/pages/dice/pie-in-the-sky/#api-Documents-document_manifest_status)

```json
{
  "jobId":"63c6e812-6cb8-43de-8a60-3681a9ec6feb",
  "outputs":[
    {
      "input":"<SIGNED_GET_URL>",
      "status":"succeeded",
      "created":"2018-08-24T23:07:36.8Z",
      "modified":"2018-08-24T23:07:37.688Z",
      "layers":[
        {
          "bounds":{
            "height":64,
            "left":12,
            "top":1,
            "width":39
          },
          "id":549,
          "index":8,
          "locked":false,
          "name":"CompanyLogo",
          "type":"smartObject",
          "visible":true
        },
        {
          "bounds":{
            "height":153,
            "left":31,
            "top":334,
            "width":197
          },
          "children":[
            {
              "bounds":{
                "height":136,
                "left":29,
                "top":326,
                "width":252
              },
              "text": {
                "content":"Reset your customers’ expectations.",
                "paragraphStyles":[
                  {   
                    "alignment":"left"
                  }
                ],
                "characterStyles":[{
                  "fontAvailable":true,
                  "fontName":"AdobeClean-Bold",
                  "fontSize":36,
                  "orientation":"horizontal",
                }]               
              },
              "id":412,
              "index":6,
              "locked":false,
              "name":"Reset your customers’ expectations.",
              "type":"textLayer",
              "visible":true
            },
            {
              "bounds":{
                "height":67,
                "left":30,
                "top":452,
                "width":230
              },
              "text":{
                "content":"Get our retail experience article and infographic.",
                "paragraphStyles":[{
                  "alignment":"left"
                }],
                "characterStyles":[{
                  "fontAvailable":true,
                  "fontName":"AdobeClean-Regular",
                  "fontSize":15,
                  "orientation":"horizontal",
                }]
              },
              "id":676,
              "index":5,
              "locked":false,
              "name":"Get our retail experience article and infographic.",
              "type":"textLayer",
              "visible":true
            }
          ],
          "id":453,
          "index":7,
          "locked":false,
          "name":"Headline",
          "type":"layerSection",
          "visible":true
        },
        {
          "bounds":{
            "height":34,
            "left":31,
            "top":508,
            "width":99
          },
          "id":762,
          "index":3,
          "locked":false,
          "name":"CallToAction",
          "type":"smartObject",
          "visible":true
        },
        {
          "bounds":{
            "height":405,
            "left":0,
            "top":237,
            "width":300
          },
          "id":751,
          "index":2,
          "locked":false,
          "name":"BackgroundGradient",
          "type":"layer",
          "visible":true
        },
        {
          "bounds":{
            "height":515,
            "left":-385,
            "top":-21,
            "width":929
          },
          "id":750,
          "index":1,
          "locked":false,
          "name":"HeroImage",
          "type":"smartObject",
          "visible":true
        },
        {
          "bounds":{
            "height":600,
            "left":0,
            "top":0,
            "width":300
          },
          "id":557,
          "index":0,
          "locked":false,
          "name":"Background",
          "type":"layer",
          "visible":true
        }
      ],
      "document":{
        "height":600,
        "name":"Example.psd",
        "width":300
      }
    }
  ],
  "_links":{
    "self":{
      "href":"https://image.adobe.io/pie/psdService/status/8ec6e4f5-b580-41ac-b693-a72f150fec59"
    }
  }
}
```
### Sample 6.2 Poll for job status - Other APIs

Once your job completes successfully (no errors/failures reported), this will return a response body containing the job status for each requested output. For the `/renditionCreate` API call in Example 4 in Sample 4.1 as illustrated above, a sample response containing the job status is as shown below:

```json
{
  "jobId":"de2415fb-82c6-47fc-b102-04ad651c5ed4",
  "outputs":[
    {
      "input":"<SIGNED_GET_URL>",
      "status":"succeeded",
      "created":"2018-01-04T12:57:15.12345:Z",
      "modified":"2018-01-04T12:58:36.12345:Z",
      "_links":{
        "renditions":[
          {
            "href":"<SIGNED_GET_URL>",          
            "width": 512,
            "storage":"adobe",
            "type":"image/jpeg"    
          },
          {
            "href":"<SIGNED_GET_URL>",
            "storage":"adobe",
            "type":"image/png"
          }
        ]
      }
    }
  ],
  "_links":{
    "self":{
      "href":"https://image.adobe.io/pie/psdService/status/de2415fb-82c6-47fc-b102-04ad651c5ed4"
    }
  }
}
```

##  Example 7: Photoshop Actions

### Sample 7.1 - Play ALL actions in .atn file.
```
export token=<YOUR_TOKEN>
export api_key =<YOUR_API_KEY>
curl -H "Authorization: Bearer $token" -H "x-api-key: $api_key" https://image.adobe.io/pie/psdService/photoshopActions -d '{
  "inputs": [
    {
      "href": "https://as2.ftcdn.net/jpg/02/49/48/49/500_F_249484911_JifPIzjUqzkRhcdMkF9GnsUI9zaqdAsn.jpg",
      "storage": "external"
    }
  ],
  "options": {
    "actions": [
      {
        "href": "https://raw.githubusercontent.com/johnleetran/ps-actions-samples/master/actions/Oil-paint.atn",
        "storage": "external"
      }
    ]
  },
  "outputs": [
    {
      "storage": "external",
      "type": "image/jpeg",
      "href": "https://some-presigned-url/output.jpeg"
    }
  ]
}'
```
### Sample 7.2 - Play a specific action

By default, Photoshop API will attempt to play all actions in an action set.  If you would like to only playback a specific action, you can specify `actionName` and the name of the action you want to invoke (see example below).

```
export token=<YOUR_TOKEN>
export api_key =<YOUR_API_KEY>
curl -H "Authorization: Bearer $token" -H "x-api-key: $api_key" https://image.adobe.io/pie/psdService/photoshopActions -d '{
  "inputs": [
    {
      "href": "https://as2.ftcdn.net/jpg/02/49/48/49/500_F_249484911_JifPIzjUqzkRhcdMkF9GnsUI9zaqdAsn.jpg",
      "storage": "external"
    }
  ],
  "options": {
    "actions": [
      {
        "href": "https://raw.githubusercontent.com/johnleetran/ps-actions-samples/master/actions/Oil-paint.atn",
        "storage": "external",
        "actionName": "Action 51"
      }
    ]
  },
  "outputs": [
    {
      "storage": "external",
      "type": "image/jpeg",
      "href": "https://some-presigned-url/output.jpeg"
    }
  ]
}'
```
