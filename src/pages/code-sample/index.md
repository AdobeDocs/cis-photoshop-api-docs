---
title: Code Examples
description: Code Examples.
---
# Example Code

## Photoshop

The code snippets are using one of our [sample psd](https://github.com/AdobeDocs/cis-photoshop-api-docs/blob/main/sample_files/Example.psd) files. Please feel free to download and use it for testing. Just remember you will need to have this file stored in one of the accepted external storage. For more information on storage please refer to the [File Storage](../general-workflow/#input-and-output-file-storage).

### Example 1: Replacing a SmartObject
The `/smartObject` endpoint can take an input PSD file with an embedded smartobject and can replace with another smartobject.
This API is a simple API developed to ease the smartObject replacement workflow for an user.

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

### Example 2: Creating a SmartObject
This example shows how you can create an embedded smart object using the `/smartObject` endpoint.

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

A call to this API initiates an asynchronous job and returns a response containing an href. Use the value in the href to poll for the status of the job. This is illustrated in [Example 12](/code-sample/#example-12-fetch-the-status-of-an-api).

### Example 3: Making a text layer edit

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

### Example 4: Custom font in a text layer
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

### Example 5: Dictating actions for missing fonts
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

A call to this API initiates an asynchronous job and returns a response containing an href. Use the value in the href to poll for the status of the job. This is illustrated in [Example 12](/code-sample/#example-12-fetch-the-status-of-an-api).

### Example 6: Making a simple edit
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

### Example 7: Swapping the image in a smart object layer

In this example we are replacing the smartobject using `documentOperations` API

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

A call to this API initiates an asynchronous job and returns a response containing an href. Use the value in the href to poll for the status of the job. This is illustrated in [Example 12](/code-sample/#example-12-fetch-the-status-of-an-api).

### Example 8: Adding a new adjustment layer

This example shows how you can add a new brightnessContrast adjustment layer to the top of your PSD.

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
      "storage":"external",
      "type":"image/jpeg"
    }
  ]
}'
```

A call to this API initiates an asynchronous job and returns a response containing an href. Use the value in the href to poll for the status of the job. This is illustrated in [Example 12](/code-sample/#example-12-fetch-the-status-of-an-api).

### Example 9: Editing a pixel layer

In this example we want to replace the image in an existing pixel layer, the Hero Image layer in Example.psd.

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
        "edit":{},                    
        "input":{                                       
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

A call to this API initiates an asynchronous job and returns a response containing an href. Use the value in the href to poll for the status of the job. This is illustrated in [Example 12](/code-sample/#example-12-fetch-the-status-of-an-api).

### Example 10: Create a document rendition
Generate multiple output rendition with the Simple API `renditionCreate`

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

A call to this API initiates an asynchronous job and returns a response containing an href. Use the value in the href to poll for the status of the job. This is illustrated in [Example 12](/code-sample/#example-12-fetch-the-status-of-an-api).

### Example 11: Retrieve a PSD's JSON manifest

The `/documentManifest` api can take one input PSD's to generate a JSON manifest file. The JSON manifest is the tree representation of all of the layer objects contained in the PSD document.

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
A call to this API initiates an asynchronous job and returns a response containing an href. Use the value in the href to poll for the status of the job and the same response will also contain the JSON manifest. This is illustrated in [Example 12](/code-sample/#example-12-fetch-the-status-of-an-api) below.

###  Example 12: Fetch the status of an API
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
### Example 13: Poll for job status for documentManifest

Once your job completes successfully (no errors/failures reported), the status response will contain your document's JSON manifest along with other metadata about the input document. The JSON Manifest is further described in the [api docs](https://adobedocs.github.io/photoshop-api-docs-pre-release/#api-Photoshop-document-manifest-status)

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
### Example 14: Poll for job status for all Other APIs

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

### Example 15 : Photoshop Actions - Play ALL actions in .atn file.
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
### Example 16 : Photoshop Actions Play a specific action

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


## Lightroom

### Example 1: Autotone an image

```shell
curl -X POST \
-H "authorization: Bearer $token" \
-H "Content-Type:application/json" \
-H "x-api-key:$x-api-key" \
-d '{
    "inputs": {
        "href": "<href>",
        "storage": "<storage>"
    },
    "outputs": [
        {
            "href": "<href>",
            "type": "<type>",
            "storage": "<storage>",
            "overwrite": <boolean>
        }
    ]
}'
https://image.adobe.io/lrService/autoTone
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

### Example 2: Autostraighten an image

```shell
curl -X POST \
-H "authorization: Bearer $token" \
-H "Content-Type:application/json" \
-H "x-api-key:$x-api-key" \
-d '{
    "inputs": {
        "href": "<href>",
        "storage": "<storage>"
    },
    "outputs": [
        {
            "href": "<href>",
            "type": "<type>",
            "storage": "<storage>",
            "overwrite": <boolean>
        }
    ]
}'
https://image.adobe.io/lrService/autoStraighten
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

### Example 3 : Apply presets to an image

```shell
curl -X POST \
-H "authorization: Bearer $token" \
-H "Content-Type:application/json" \
-H "x-api-key:$x-api-key" \
-d '{
    "inputs": {
        "source": {
            "href": "<href>",
            "storage": "<storage>"
        },
        "presets": [
            {
                "href": "<href1>",
                "storage": "<storage>"
            },
            {
                "href": "<href2>",
                "storage": "<storage>"
            }
        ]
    },
    "outputs": [
        {
            "href": "<href>",
            "type": "<type>",
            "storage": "<storage>",
            "overwrite": <boolean>
        }
    ]
}'
https://image.adobe.io/lrService/presets
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

### Example 4: Apply edits to an image

```shell
curl -X POST \
-H "authorization: Bearer $token" \
-H "Content-Type:application/json" \
-H "x-api-key:$x-api-key" \
-d '{
    "inputs": {
        "source": {
            "href": "<href>",
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
            "href": "<href>",
            "type": "<type>",
            "storage": "<storage>",
            "overwrite": <boolean>
        }
    ]
}'
https://image.adobe.io/lrService/edit
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

### Example 5: Apply xmp to an image

```shell
curl -X POST \
-H "authorization: Bearer $token" \
-H "Content-Type:application/json" \
-H "x-api-key:$x-api-key" \
-d '{
    "inputs": {
        "href": "<href>",
        "storage": "<storage>"
    },
    "options": {
        "xmp": "<xmp>"
    },
    "outputs": [
        {
            "href": "<href>",
            "storage": "<storage>",
            "type": "<type>"
        }
    ]
}'
https://image.adobe.io/lrService/xmp
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

### Example 6: Poll for status and results

Use the JobID to poll on the href that is returned in the response from one of the Lightroom APIs.
1. Upon successful job completion, the output file will be available at the specified output href.
2. If the job failed due to an error, the `errorDetails` field in the response will contain the details of the failure.

```shell
curl -X GET \
  https://image.adobe.io/lrService/status/<jobId> \
  -H 'Authorization: Bearer <auth_token>' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <YOUR_API_KEY>'
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
          "storage":"adobe"
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

## Sensei

First be sure to follow the instructions in the [Authentication](../authentication/) section to get your token.

### Example 1: Image cutout

The `/cutout` api takes a single input image to generate your mask or cutout from. Using [Example.jpg](https://github.com/AdobeDocs/cis-photoshop-api-docs/blob/main/sample_files/Example.jpg), a typical curl call might look like this:

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

### Example 2: Image mask

The workflow is exactly the same as [creating an image cutout](#example-1-initiate-a-job-to-create-an-image-cutout) except you use the `/mask` endpoint instead of `/cutout`.  

### Example 3: (Generate ImageCutOut result as Photoshop path)
This workflow is ONLY for users who'd like to generate cutout result as Photoshop path instead of regular mask or cutout in above [example 1](/code-sample/#example-1-image-cutout) and [example 2](/code-sample/#example-2-image-mask). You will need to chain API calls to ImageCutOut service and Photoshop Service to achieve this goal.

#### Sample Input/Output
Sample input from [here](https://github.com/AdobeDocs/cis-photoshop-api-docs/blob/main/sample_files/ic_customized_workflow/input.jpg).
Sample output from [here](https://github.com/AdobeDocs/cis-photoshop-api-docs/blob/main/sample_files/ic_customized_workflow/result_with_path.jpg) (Note: you will need to open result in Photoshop Desktop application so that you will see the path in path panel)

#### Instructions

1. Download the make-file.atn file from [here](https://github.com/AdobeDocs/cis-photoshop-api-docs/blob/main/sample_files/ic_customized_workflow/make-path.atn) (this file will be used in the Photoshop action API call)
2. Make the first API call to ImageCutOut service to generate intermediate result as RGBA cutout
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
### Example 2: Auto tone an image through the Lightroom API

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
