---
title: Adobe Lightroom API Features 
description: Learn about the available features in Lightroom API.
keywords: 
  - Lightroom API features
contributors:
  - https://github.com/khound
  - https://github.com/archyposada
hideBreadcrumbNav: true
---

# Supported Features

Here's a compilation of the features currently supported within the Adobe Lightroom API.

## Auto Tone

The Auto Tone feature in Lightroom Classic utilizes an AI/ML model trained to adjust slider values automatically, enhancing images based on their content. It identifies elements within the image and adjusts Exposure, Contrast, Highlights, Shadows, Whites, Blacks, Saturation, and Vibrance accordingly, resulting in striking photos. You can find a code sample [here.](../code-sample/#autotone-an-image)<br />

In this example, we automatically adjusted the photo using the AutoTone API.
![alt image](./autotone_example.png?raw=true "Original Image")

## Auto Straighten

This endpoint applies the Auto Upright transformation on an image. You can find a code sample [here.](../code-sample/#autostraighten-an-image)

## Apply Presets

Apply one or more XMP Lightroom Presets to an image, by referencing Preset file(s) stored on the cloud. You can find a code sample [here.](../code-sample/#apply-presets-to-an-image)

A Preset file can be created by editing an image in Lightroom and exporting it as a `.xmp` file. You can learn more about creating presets [here](https://creativecloud.adobe.com/en-LU/learn/lightroom-cc/web/create-your-own-presets)

### How to create an XMP file
If you need to create an `.xmp` file from a set of slider values obtained directly from a user, you can start with the empty `.xmp` file [here](https://github.com/AdobeDocs/cis-photoshop-api-docs/blob/main/sample-code/lr-sample-app/crs.xml) and add the corresponding slider values.

You can find a code sample [here](../code-sample/#apply-edits-to-an-image).

In this example, we are applying the Preset called "Aged Photo" to automatically make the adjustments.
![alt image](./preset_example.png?raw=true "Original Image")

## Apply Edits
This endpoint enables you to programmatically adjust values within the Lightroom Edit Panel and apply them to an image.

### List of values you can adjust 

|                                   |
|---------------------------------- |
| Exposure                          |
| Contrast                          |
| Sharpness                         |
| White Balance                     |
| Saturation                        |
| Color Noise Reductio              |
| Noise Reduction                   |
| Vignette Amount                   |
| Vibrance                          |
| Highlights                        |
| Shadows                           |
| Whites                            |
| Blacks                            |
| Clarity                           |
| Dehaze                            |
| Sharpen Radius                    |
| Sharpen Detail                    |
| Sharpen Edge Masking              |
| Texture                           |

## Apply XMP
Apply a Lightroom preset to an image, by passing in the preset XMP contents inline through the API. Code sample [here](../code-sample/#apply-xmp-to-an-image)


## Using Webhooks through Adobe I/O Events

Adobe I/O Events offers the possibility to build an event-driven application, based on events originating from Lightroom and Lightroom APIs. To start listening for events, your application needs to register a webhook URL, specifying the Event Types to receive. Whenever a matching event gets triggered, your application is notified through an HTTP POST request to the webhook URL.
The Event Provider for Lightroom and Lightroom APIs is `Imaging API Events`.
This event provider has two event types:
1. `Lightroom API events`
2. `Lightroom API events`

As the names indicate, these event types represent events triggered by the individual APIs.

### Registering your application to our Event Provider

Prerequisites needed to use the Event Provider

1. In order to use the Adobe I/O Events you will need to create a project on Adobe I/O Console.
2. You can follow the steps listed in [Getting Started](../guides/getting-started.md) page if you haven't created one yet.
3. You can learn more about createing a Webhook application [here.](https://www.adobe.io/apis/experienceplatform/events/docs.html#!adobedocs/adobeio-events/master/intro/webhooks_intro.md) This page provides all of the details you will need to build a basic application. 


### Registering the Webhook
Once the above prerequisites are met, you can now proceed to register the webhook to the service integration. The steps to do that can be found [here](https://developer.adobe.com/events/docs/guides/#getting-started).

After the webhook has been successfully registered, you will start to receive the events for any submitted job that either succeeded or failed, from the Event Types selected. This eliminates the need for your application to poll for the status of the job using the jobID. 

Here are some code samples that can you help you get sarted.  
[Using Adobe I/O Events](../code-sample/#triggering-an-event-from-the-apis)