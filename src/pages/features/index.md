---
title: Features in Lightroom API
description: Learn about the available features in Lightroom API.
---

# Supported Features

This is a list of currently supported features in the Adobe Lightroom API

## Lightroom
The APIs are documented at [Lightroom API](../api/#tag/Lightroom).
Any input image format that is supported by Lightroom is also supported by the APIs. To look at the list of these formats in more detail, please refer to: https://helpx.adobe.com/lightroom-classic/help/supported-file-formats.html

At this point the output formats supported are JPG, DNG and PNG.

### AutoTone

Automatically correct exposure, contrast, sharpness, saturation, etc. Code sample [here](../code-sample/#autotone-an-image)<br />

In this example, we automatically adjusted the photo using the AutoTone API.
![alt image](./autotone_example.png?raw=true "Original Image")

### AutoStraighten

Applies the Auto Upright transformation on an image. Code sample [here](../code-sample/#autostraighten-an-image)

### Presets

Apply one or more XMP Lightroom presets to an image, by referencing preset file(s) stored on cloud. Code sample [here](../code-sample/#apply-presets-to-an-image)
The preset file can be created by editing an image in lightroom and exporting it as a `.xmp` file.
The details on how to create a preset can be found [here](https://helpx.adobe.com/lightroom-cc/how-to/photo-presets-lightroom-cc.html).
If the use case would be to be able to create an `.xmp` file from a set of slider values obtained directly from a user, there are 2 ways to achieve this workflow:
1. Start with the empty `.xmp` file from [here](https://github.com/AdobeDocs/cis-Lightroom-api-docs/blob/main/sample-code/lr-sample-app/crs.xml) and add the corresponding slider values
2. Or please look ahead in this documentation page at the [/edit API](/features/#edit)

In this example, we are applying the Preset called "Aged Photo" to automatically make the adjustments.
![alt image](./preset_example.png?raw=true "Original Image")

### Edit

Apply one or more Lightroom edits to an image. Code sample [here](../code-sample/#apply-edits-to-an-image)

### XMP
Apply a Lightroom preset to an image, by passing in the preset XMP contents inline through the API. Code sample [here](../code-sample/#apply-xmp-to-an-image)


## Customized Workflow
You can make a 'customized workflow' by chaining different APIs. Example of which can be found [here](../code-sample/#generate-remove-background-result-as-Lightroom-path)


## Using Webhooks through Adobe I/O Events

Adobe I/O Events offers the possibility to build an event-driven application, based on events originating from Lightroom and Lightroom APIs. To start listening for events, your application needs to register a webhook URL, specifying the Event Types to receive. Whenever a matching event gets triggered, your application is notified through an HTTP POST request to the webhook URL.
The Event Provider for Lightroom and Lightroom APIs is `Imaging API Events`.
This event provider has two event types:
1. `Lightroom API events`
2. `Lightroom API events`

As the names indicate, these event types represent events triggered by the individual APIs.

### Registering your application to our Event Provider
#### Prerequisites needed to use the Event Provider

1. In order to use the Adobe I/O Events you will need to create a project on Adobe I/O Console.
2. You can follow the steps listed in [Getting Started](../getting-started/#getting-started-from-adobe-io-console) page if you haven't created one yet.
3. Create a Webhook application. [This](https://www.adobe.io/apis/experienceplatform/events/docs.html#!adobedocs/adobeio-events/master/intro/webhooks_intro.md) page gives all the details of what the skeleton of a basic application would look like. You can find a sample NodeJS application [here](https://github.com/AdobeDocs/cis-Lightroom-api-docs/tree/main/sample-code/webhook-sample-app)


#### Registering the Webhook
Once the above prerequisites are met, you can now proceed to register the webhook to the service integration. The steps to do that can be found  [here](https://www.adobe.io/apis/experienceplatform/events/docs.html#!adobedocs/adobeio-events/master/intro/webhooks_intro.md#your-first-webhook).
After the webhook has been successfully registered, you will start to receive the events for any submitted job that either succeeded or failed, from the Event Types selected. This eliminates the need for your application to poll for the status of the job using the jobID. Examples can be found [here](../code-sample/#triggering-an-event-from-the-apis)
