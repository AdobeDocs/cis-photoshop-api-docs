---
title: Code Examples
description: Code Examples.
---
# Sample Code

## Photoshop

The code snippets are using one of our [sample psd](https://github.com/AdobeDocs/cis-photoshop-api-docs/blob/main/sample_files/Example.psd) files. Please feel free to download and use it for testing. Just remember you will need to have this file stored in one of the accepted external storages. For more information on storage please refer to the [File Storage](../general-workflow/#input-and-output-file-storage).

For each of these examples to run. You first have to get your Bearer token and apikey. For ease of use, you can export your token and api key before running the examples.

```shell
export token="<YOUR_TOKEN>"
```
```shell
export apiKey="<YOUR_API_KEY>"
```
### Executing an actionJSON
The `/actionJSON` endpoint can take an input file and apply any Photoshop Action file on it and edit the steps within the original action file. This gives you a lot of flexibility to create dynamic changes to an otherwise static Action file. In this example we are going to use a familiar asset and action file and we are going to modify the payload to return an output that executes all of the steps of the original action with one modification, instead of color we are going to use actionJSON to return a black and white image. This action file contains over 70 steps so we wont show the entire JSON payload but will share the part we modified to achieve the output.

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/actionJSON \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json" \
  -d '{
  "inputs": [{
  "href": "<SIGNED_GET_URL>",
  "storage": "<storage>"
  }],
  "options": {
    "actionJSON": [{
        "_obj": "imageSize",
        "constrainProportions": true,
        "interfaceIconFrameDimmed": {
          "_enum": "interpolationType",
          "_value": "automaticInterpolation"
        },
        "scaleStyles": true
      }, {
        "_obj": "imageSize",
        "constrainProportions": true,
        "interfaceIconFrameDimmed": {
          "_enum": "interpolationType",
          "_value": "automaticInterpolation"
        },
        "resolution": {
          "_unit": "densityUnit",
          "_value": 72.0
        },
        "scaleStyles": true
      },
      {
        "_obj": "make",
        "_target": [{
          "_ref": "adjustmentLayer"
        }],
        "using": {
          "_obj": "adjustmentLayer",
          "type": {
            "_obj": "blackAndWhite",
            "blue": 20,
            "cyan": 60,
            "grain": 40,
            "magenta": 80,
            "presetKind": {
              "_enum": "presetKindType",
              "_value": "presetKindDefault"
            },
            "red": 40,
            "tintColor": {
              "_obj": "RGBColor",
              "blue": 179.00115966796876,
              "grain": 211.00067138671876,
              "red": 225.00045776367188
            },
            "useTint": false,
            "yellow": 60
          }
        }
      }
    ]
  },
  "outputs": [{
    "type": "image/jpeg",
    "storage": "<storage>",
    "href": "<SIGNED_POST_URL>"
  }]
}'
```

### Executing an actionJSON with multiple inputs

With `/actionJSON` endpoint you can use multiple images to do compositing on the actionJSON.

In order to supply multiple images and have it specified in the actionJSON, you need to create a Placeholder Value in your actionJSON.   The placeholder value must be "ACTION_JSON_OPTIONS_ADDITIONAL_IMAGES_X" where "X" is the index of the "additionalImages" array.

For example, say you have an actionJSON that requires 2 additional Images.  

ACTION_JSON_OPTIONS_ADDITIONAL_IMAGES_0 == options.additionalImages[0]
ACTION_JSON_OPTIONS_ADDITIONAL_IMAGES_1 == options.additionalImages[1]

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/actionJSON \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json" \
  -d '{
  "inputs": [
    {
      "href": "<SIGNED_GET_URL>",
      "storage": "<storage>"
    }
  ],
  "options": {
    "additionalImages": [
      {
        "href": "<SIGNED_GET_URL>",
        "storage": "<storage>"
      }
    ],
    "actionJSON": [
    {
      "ID": 3,
      "_obj": "placeEvent",
      "freeTransformCenterState": {
        "_enum": "quadCenterState",
        "_value": "QCSAverage"
      },
      "null": {
        "_kind": "local",
        "_path": "ACTION_JSON_OPTIONS_ADDITIONAL_IMAGES_0"
      },
      "offset": {
        "_obj": "offset",
        "horizontal": {
          "_unit": "pixelsUnit",
          "_value": 0
        },
        "vertical": {
          "_unit": "pixelsUnit",
          "_value": 0
        }
      }
    },
    {
      "_obj": "autoCutout",
      "sampleAllLayers": false
    },
    {
      "_obj": "make",
      "at": {
        "_enum": "channel",
        "_ref": "channel",
        "_value": "mask"
      },
      "new": {
        "_class": "channel"
      },
      "using": {
        "_enum": "userMaskEnabled",
        "_value": "revealSelection"
      }
    },
    {
      "_obj": "set",
      "_target": [
        {
          "_property": "selection",
          "_ref": "channel"
        }
      ],
      "to": {
        "_enum": "ordinal",
        "_value": "allEnum"
      }
    },
    {
      "_obj": "align",
      "_target": [
        {
          "_enum": "ordinal",
          "_ref": "layer"
        }
      ],
      "alignToCanvas": false,
      "using": {
        "_enum": "alignDistributeSelector",
        "_value": "ADSBottoms"
      }
    },
    {
      "_obj": "align",
      "_target": [
        {
          "_enum": "ordinal",
          "_ref": "layer"
        }
      ],
      "alignToCanvas": false,
      "using": {
        "_enum": "alignDistributeSelector",
        "_value": "ADSRights"
      }
    },
    {
      "_obj": "set",
      "_target": [
        {
          "_property": "selection",
          "_ref": "channel"
        }
      ],
      "to": {
        "_enum": "ordinal",
        "_value": "none"
      }
    }
  ]

  },
  "outputs": [
    {
      "type": "image/jpeg",
      "href": "<SIGNED_PUT_URL>",
      "storage": "<storage>"
    }
  ]
}'
```

### Replacing a smartObject
The `/smartObject` endpoint can take an input PSD file with an embedded smartObject and can replace with another smartObject.
This API is a simple API developed to ease the smartObject replacement workflow for an user.

This example shows how you can replace an embedded smart object.  <a href="https://github.com/AdobeDocs/cis-photoshop-api-docs/tree/main/sample-code/s3-smart-object-replacement">Sample Code</a>

``` shell
curl -X POST \
  https://image.adobe.io/pie/psdService/smartObject \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json" \
  -d '{
  "inputs": [
  {
    "href": "<SIGNED_GET_URL>",
    "storage": "<storage>"
  }],
  "options": {
    "layers": [{
      "name": "HeroImage",
      "input": {
        "href": "<SIGNED_GET_URL>",
        "storage": "<storage>"
      }
     }
    ]
  },
  "outputs": [
  {
    "storage": "<storage>",
    "href": "<SIGNED_POST_URL>",
    "type": "vnd.adobe.photoshop"
  }
]}'
```

### Creating a smartObject
This example shows how you can create an embedded smart object using the `/smartObject` endpoint.

``` shell
curl -X POST \
  https://image.adobe.io/pie/psdService/smartObject \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json" \
  -d '{
  "inputs": [
  {
    "href": "<SIGNED_GET_URL>",
    "storage": "<storage>"
  }],
  "options": {
    "layers": [{
      "name": "New",
      "add": {
        "insertTop": true
      },
      "input": {
        "href": "<SIGNED_GET_URL>",
        "storage": "<storage>"
       }
      }
    ]
  },
  "outputs": [
  {
    "storage": "<storage>",
    "href": "<SIGNED_POST_URL>",
    "type": "vnd.adobe.photoshop"
  }
]}'
```

A call to this API initiates an asynchronous job and returns a response containing an href. Use the value in the href to poll for the status of the job. This is illustrated in [Example 12](../photoshop/code-sample/#example-12-fetch-the-status-of-an-api) and [Example 14](../photoshop/code-sample/#example-14-poll-for-job-status-for-all-other-apis)

### Making a text layer edit
This example shows how you can edit a text layer using the `/text` endpoint. <a href="https://github.com/AdobeDocs/cis-photoshop-api-docs/tree/main/sample-code/azure-blob-text-edit">Sample Code</a>

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/text \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json" \
  -d '{
  "inputs":[
    {
      "href":"<SIGNED_GET_URL>",
      "storage":"<storage>"
    }
  ],
  "options":{
    "layers":[
      {
        "name": "My Text Layer",
        "text": {
            "content": "CHANGED TO NEW TEXT",
            "orientation": "horizontal",
            "characterStyles": [{
                "size": 15,
                "orientation": "horizontal",
                "color": {
                    "red":255,
                    "green":0,
                    "blue":0
                }
            }],
            "paragraphStyles": [{
              "alignment": "right"
            }]
        }
      }
    ]
  },
  "outputs":[
    {
      "href":"<SIGNED_POST_URL>",
      "storage":"<storage>",
      "type":"vnd.adobe.photoshop"
    }
  ]
}'
```

### Custom font in a text layer
This will change the font in a text layer named `My Text Layer` to a custom font `VeganStylePersonalUse`.
**Note**: the value for the `fontName` field in the `text.characterStyles` section is the full postscript name of the custom font.

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/text \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json" \
  -d '{
  "inputs":[
    {
      "href":"<SIGNED_GET_URL>",
      "storage":"<storage>"
    }
  ],
  "options":{
    "fonts": [
      {
        "storage": "<storage>",
        "href": "<SIGNED_GET_URL_TO_VeganStylePersonalUse.ttf>"
      }
    ],
    "layers":[
      {
        "name": "My Text Layer",
        "text": {
            "content": "CHANGED TO NEW TEXT",
            "orientation": "horizontal",
            "characterStyles": [{
                "size": 15,
                "orientation": "horizontal",
                "color": {
                    "red":255,
                    "green":0,
                    "blue":0
                }
            }],
            "paragraphStyles": [{
              "alignment": "right"
            }]
        }
      }
    ]
  },
  "outputs":[
    {
      "href":"<SIGNED_POST_URL>",
      "storage":"<storage>",
      "type":"vnd.adobe.photoshop"
    }
  ]
}'
```

### Dictating actions for missing fonts
In this request for example, if `MySampleFont` is not found while processing the request, the system default font (`ArialMT`) will be used as `manageMissingFonts` is set to `useDefault`
```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/text \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json" \
  -d '{
  "inputs":[
    {
      "href":"<SIGNED_GET_URL>",
      "storage":"<storage>"
    }
  ],
  "options":{
    "manageMissingFonts": "useDefault",
    "globalFont": "MySampleFont",
    "fonts": [
      {
        "storage": "<storage>",
        "href": "<SIGNED_GET_URL_TO_VeganStylePersonalUse.ttf>"
      }
    ],
    "layers":[
      {
        "name": "My Text Layer",
        "text": {
            "content": "CHANGED TO NEW TEXT",
            "orientation": "horizontal",
            "characterStyles": [{
                "size": 15,
                "orientation": "horizontal",
                "color": {
                    "red":255,
                    "green":0,
                    "blue":0
                }
            }],
            "paragraphStyles": [{
              "alignment": "right"
            }]
        }
      }
    ]
  },
  "outputs":[
    {
      "href":"<SIGNED_POST_URL>",
      "storage":"<storage>",
      "type":"vnd.adobe.photoshop"
    }
  ]
}'
```

A call to this API initiates an asynchronous job and returns a response containing an href. Use the value in the href to poll for the status of the job. This is illustrated in [Example 12](../photoshop/code-sample/#example-12-fetch-the-status-of-an-api) and [Example 14](../photoshop/code-sample/#example-14-poll-for-job-status-for-all-other-apis)

### Making a simple edit
```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/documentOperations \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json" \
  -d '{
  "inputs":[
    {
      "href":"<SIGNED_GET_URL>",
      "storage":"<storage>"
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
      "storage":"<storage>",
      "type":"vnd.adobe.photoshop"
    }
  ]
}'
```

### Swapping the image in a smart object layer

In this example we are replacing the smartObject using `documentOperations` API

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/documentOperations \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json" \
  -d '{
  "inputs":[
    {
      "href":"<SIGNED_GET_URL>",
      "storage":"<storage>"
    }
  ],
  "options":{
    "layers":[
      {
        "edit":{},     
        "input":{                                       
          "href":"<SIGNED_GET_URL>",  
          "storage":"<storage>"
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
      "storage":"<storage>",
      "type":"vnd.adobe.photoshop"
    }
  ]
}'
```

A call to this API initiates an asynchronous job and returns a response containing an href. Use the value in the href to poll for the status of the job. This is illustrated in [Example 12](../photoshop/code-sample/#example-12-fetch-the-status-of-an-api) and [Example 14](../photoshop/code-sample/#example-14-poll-for-job-status-for-all-other-apis)

### Adding a new adjustment layer

This example shows how you can add a new brightnessContrast adjustment layer to the top of your PSD.

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/documentOperations \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json" \
  -d '{
  "inputs":[
    {
      "href":"<SIGNED_GET_URL>",
      "storage":"<storage>"
    }
  ],
  "options":{
    "layers":[
      {                                        
        "add":{                              
          "insertAbove": {
            "id": 549
          }                    
        },
        "adjustments":{
          "brightnessContrast":{
            "brightness":25,
            "contrast":-40
          }
        },
        "name":"NewBrightnessContrast",
        "type":"adjustmentLayer"              
      }
    ]
  },
  "outputs":[
    {
      "href":"<SIGNED_POST_URL>",
      "storage":"<storage>",
      "type":"image/jpeg"
    }
  ]
}'
```

A call to this API initiates an asynchronous job and returns a response containing an href. Use the value in the href to poll for the status of the job. This is illustrated in [Example 12](../phothsop/code-sample/#example-12-fetch-the-status-of-an-api) and [Example 14](../photoshop/code-sample/#example-14-poll-for-job-status-for-all-other-apis)

### Editing a pixel layer

In this example we want to replace the image in an existing pixel layer, the Hero Image layer in Example.psd.

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/documentOperations \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json" \
  -d '{
  "inputs":[
    {
      "href":"<SIGNED_GET_URL>",
      "storage":"<storage>"
    }
  ],
  "options":{
    "layers":[
      {
        "edit":{},                    
        "input":{                                       
          "href":"<SIGNED_GET_URL>",
          "storage":"<storage>"
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
      "storage":"<storage>",
      "type":"vnd.adobe.photoshop"
    }
  ]
}
'
```

A call to this API initiates an asynchronous job and returns a response containing an href. Use the value in the href to poll for the status of the job. This is illustrated in [Example 12](../photoshop/code-sample/#example-12-fetch-the-status-of-an-api) and [Example 14](../photoshop/code-sample/#example-14-poll-for-job-status-for-all-other-apis)

### Create a document rendition
Generate multiple output renditions with the API `renditionCreate`

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/renditionCreate \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json" \
  -d '{
  "inputs":[
    {
      "href":"<SIGNED_GET_URL>",
      "storage":"<storage>"
    }
  ],
  "outputs":[
    {
      "href":"<SIGNED_POST_URL1>",          
      "width": 512,
      "storage":"<storage>",
      "type":"image/jpeg"      
    },
    {
      "href":"<SIGNED_POST_URL2>",
      "storage":"<storage>",
      "type":"image/png"
    }
  ]
}'
```

A call to this API initiates an asynchronous job and returns a response containing an href. Use the value in the href to poll for the status of the job. This is illustrated in [Example 12](../photoshop/code-sample/#example-12-fetch-the-status-of-an-api) and [Example 14](../photoshop/code-sample/#example-14-poll-for-job-status-for-all-other-apis)

### Retrieve a PSD's JSON manifest

The `/documentManifest` api can take one input PSD's to generate a JSON manifest file. The JSON manifest is the tree representation of all of the layer objects contained in the PSD document.

Using Example.psd, with the use case of a document stored in your external storage (ie. azure, aws, dropbox), a typical curl call might look like this:

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/documentManifest \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json" \
  -d '{
  "inputs": [
    {
      "href":"<YOUR_PRESIGNED_URL>",
      "storage":"<storage>"
    }
  ]
}'
```
A call to this API initiates an asynchronous job and returns a response containing an href. Use the value in the href to poll for the status of the job and the same response will also contain the JSON manifest. This is illustrated in [Example 12](../photoshop/code-sample/#example-12-fetch-the-status-of-an-api) and [Example 14](../photoshop/code-sample/#example-14-poll-for-job-status-for-all-other-apis)

###  Fetch the status of an API
Each of our Photoshop API endpoints, when invoked, initiates an asynchronous job and returns a response body that contains the href to poll for status of the job.

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
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json"
```
### Poll for job status for documentManifest

Once your job completes successfully (no errors/failures reported), the status response will contain your document's JSON manifest along with other metadata about the input document. The JSON Manifest is further described in the [api docs](../api/#operation/pitsstatus)

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
                  "orientation":"horizontal"
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
                  "orientation":"horizontal"
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
### Poll for job status for all Other APIs

Once your job completes successfully (no errors/failures reported), this will return a response body containing the job status for each requested output. For the `/renditionCreate` API call in [Example 10](/code-sample/#example-10-create-a-document-rendition) as illustrated above, a sample response containing the job status is as shown below:

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
            "storage":"<storage>",
            "type":"image/jpeg"    
          },
          {
            "href":"<SIGNED_GET_URL>",
            "storage":"<storage>",
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

### Photoshop Actions - Play ALL actions in .atn file.
```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/photoshopActions \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json" \
  -d '{
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
      "storage": "<storage>",
      "type": "image/jpeg",
      "href": "https://some-presigned-url/output.jpeg"
    }
  ]
}'
```
### Photoshop Actions Play a specific action

By default, Photoshop API will attempt to play all actions in an action set.  If you would like to only playback a specific action, you can specify `actionName` and the name of the action you want to invoke (see example below).

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/photoshopActions \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json" \
  -d '{
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
      "storage": "<storage>",
      "type": "image/jpeg",
      "href": "https://some-presigned-url/output.jpeg"
    }
  ]
}'
```
### Edit Text Layers

The `/text` endpoint can take an input PSD file with one or more text layers and can apply edits to it.

This example shows how you can apply edits to two text layers

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/text \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json" \
  -d '{
  "inputs": [
    {
      "href": "<SIGNED_GET_URL>",
      "storage": "<storage>"
    }
  ],
  "options": {
    "fonts": [
      {
        "storage": "<storage>",
        "href": "<SIGNED_GET_URL>"
      }
    ],
    "layers": [
      {
        "name": "<name_of_text_layer_1_to_edit>",
        "text": {
            "orientation": "horizontal",
            "contents": "New text Contents 1",
            "antiAlias": "antiAliasSharp",
            "characterStyles": [{
              "autoKern": "metricsKern",
              "fontPostScriptName": "<font_postscript_name>",
              "fontCaps": "allCaps",
              "size": 25,
              "leading": 20,
              "tracking": 20,
              "syntheticBold": true,
              "ligature": true,
              "syntheticItalic": true,
              "color": {
                "blue": 100,
                "green": 200,
                "red": 163
              }
            }],
            "paragraphStyles": [{
              "align": "right"
            }]
        }
      },
      {
        "name": "<name_of_text_layer_2_to_edit>",
        "text": {
          "contents": "New text Contents 2",
          "characterStyles": [{
              "size": 45,
              "stylisticAlternates": true,
              "leading": 100,
              "tracking": 100,
              "baseline": "subScript",
              "strikethrough": true,
              "underline": true,
              "verticalScale": 150,
              "horizontalScale": 200,
              "color": {
                "blue": 300,
                "green": 100,
                "red": 63
              }
            }]
        }
      }
    ]
  },
  "outputs": [
    {
      "href": "<SIGNED_POST_URL>",
      "type": "vnd.adobe.photoshop",
      "storage": "<storage>"
    }
  ]
}'
```

### Applying Product Crop

The `productCrop` endpoint can take an input file and apply right crop to it. We don't support multilayered PSD.

This example shows how you can apply the crop with required padding to an input file

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/productCrop \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json" \
  -d '{
  "inputs": [
    {
      "href": "<SIGNED_GET_URL>",
      "storage": "<storage>"
    }
  ],
  "options": {
    {
      "unit": "Pixels",
      "width": 10,
      "height": 10
    }
  },
  "outputs": [
    {
      "storage": "<storage>",
      "type": "image/jpeg",
      "href": "<SIGNED_POST_URL>"
    }
  ]
}'
```

### Applying Depth Blur Neural Filter

The `depthBlur` endpoint can take an input file and apply the depth blur neural filter.

This example shows how you can apply depth blur with the appropriate parameters.

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/depthBlur \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json" \
  -d '{
  "inputs": [
    {
      "href": "<SIGNED_GET_URL>",
      "storage": "<storage>"
    }
  ],
  "options": {
    "haze": 25,
    "blurStrength": 30,
    "focalSelector": {
        "x": 0.22,
        "y": 0.33
    }
  },
  "outputs": [
    {
      "storage": "<storage>",
      "type": "image/jpeg",
      "href": "<SIGNED_POST_URL>"
    }
  ]
}'
```

First be sure to follow the instructions in the [Authentication](../authentication/) section to get your token.

### Remove Background

The `/cutout` api takes a single input image to generate your mask or remove background from. Using [Example.jpg](https://github.com/AdobeDocs/cis-photoshop-api-docs/blob/main/sample_files/Example.jpg), a typical curl call might look like this:

```shell
curl -X POST \
  https://image.adobe.io/sensei/cutout \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json" \
  -d '{
   "input":{
      "storage":"<storage>",
      "href":"<SIGNED_GET_URL>"
   },
   "output":{
      "storage":"<storage>",
      "href":"<SIGNED_POST_URL>",
      "mask":{
         "format":"soft"
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
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json"
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
        "storage": "<storage>",
        "href": "<SIGNED_POST_URL>",
        "mask": {
            "format": "soft"
        }
    }
}
```

### Generate image mask

The workflow is exactly the same as [creating Remove Background](/code-sample/#example-1-image-cutout) except you use the `/mask` endpoint instead of `/cutout`.  

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
In order to start receiving the events in your Webhook Application, the additional thing that needs to be done is to pass in your IMS ORG ID in a header: `x-gw-ims-org-id: <YOUR_IMS_ORG_ID>`, when you make an API call to initiate a job. Please have a look at the example below that demonstrates the usage of the new header and a sample event received for that job.
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