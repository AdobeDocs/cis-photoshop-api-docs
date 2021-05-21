---
title: Features in Photoshop API
description: Learn about the available features in Photoshop API.
---

# Supported Features

This is a list of currently supported features.  Please also see the [Release Notes](../release-notes/index.md) for a list of newly added features

## Photoshop

The API's are documented at [https://adobedocs.github.io/photoshop-api-docs-pre-release/#api-Lightroom](https://adobedocs.github.io/photoshop-api-docs-pre-release/#api-Photoshop)

### SmartObject

The Photoshop APIs currently support creating and editing of Embedded Smart Objects. Support for Linked Smart Objects is forthcoming.

- In order to update an embedded smart object that is referenced by multiple layers you need to update each of those layers, then only the effect will be reflected in all layers referencing the same smart object.

- The replaced smart object is placed within the bounding box of the original image. If the new image is bigger or smaller than the original image, it fits into the original bounding box maintaining the aspect ratio. You can change the bounds of the replaced image by passing bounds parameters in the API call.

- If your document contains transparent pixels (e.g some .png) for the smart object layer, you may not get consistent bounds.

The API's are documented [here](https://adobedocs.github.io/photoshop-api-docs-pre-release/#api-Photoshop-document_operations).
We also have an example of replacing a Smart Object within a layer.
[Smart Object Example Code](../code-sample/#example-1-smartobject).
For better performance, we rasterize our smart objects that are bigger than  2000 pixels * 2000 pixels.
For optimal processing, please make sure the embedded smart object that you want to replace only contains alphanumeric characters in it's name.

### Text layers

The Photoshop API currently support creating and editing of Text Layer with different fonts, character styles and paragraph styles. The set of text attributes that can be edited is listed below:
- Edit the text contents
- Change the font (See the `Fonts` section for more info)
- Edit the font size
- Change the font color in the following formats: rgb, cmyk, gray, lab
- Edit the text orientation (horizontal/vertical)
- Edit the paragraph alignment (left, center, right, justify, justifyLeft, justifyCenter, justifyRight)

The API's are documented [here](https://adobedocs.github.io/photoshop-api-docs-pre-release/#api-Photoshop-document_operations)

We also have an example of making a simple text layer edit.

[Text layer Example Code](../code-sample/#example-3-making-a-text-layer-edit)

#### Font handling

In order to be able to correctly operate on text layers in the PSD, the corresponding fonts needed for these layers will need to be available when the server is processing the PSD. These include fonts from the following cases:
1. The font that is in the text layer being edited, but the font itself is not being changed
2. If the font in a text layer is being changed to a new font

While referencing fonts in the API request, please ensure that the correct Postscript name for that font is used. Referencing to that font with any other name will result in the API treating this as a missing font.

The Photoshop APIs supports using the following category of fonts:
- Currently Installed Fonts on the server listed [here](/features/supported-fonts/)
- Fonts that you are authorized to access via [Adobe Fonts](https://fonts.adobe.com/fonts).
  **Note:** Currently only available for OAuth tokens, JWT service token support is forthcoming.
- Custom/Other Fonts: These are the fonts that are either owned by you or the ones that only you are authorized to use.
  To use a custom font you must include an href to the font in your request. Look at the `options.fonts` section of the API docs for more information.
  For including an href to the font in your request, please ensure the font file name to be in this format: `<font_postscript_name>.<ext>`, when it is being uploaded in your choice of storage. A sample `options.fonts` section will look like so:
  ```json
  {
    "storage": "external",
    "href": "<Storage URL to OpenSansCondensed-Light.ttf>"
  }
  ```
  **Note:** This also applies to any other font present in the document which is not to be found in the first 2 categories above.

Here is an example usage of a custom font
[Custom font](../code-sample/#example-4-custom-font-in-a-text-layer)

#### Handle missing fonts in the document.

The API provides two options to control the behavior when there are missing fonts, as the request is being processed:
- Specify a global font which would act as a default font for the current request: The `globalFont` field in the `options` section of the request can be used to specify the full postscript name of this font.
For any textLayer edit/add operation, if the font used specifically for that layer is missing, this font will be used as the default. If the global font itself is missing, then the action to be taken will be dictated by the `manageMissingFonts` options as explained here in the next bullet point.

**Note**: If using an OAuth integration, Adobe Fonts can be used as a global font as well. If the global font is a custom font, please upload the font to one of the cloud storage types that is supported and specify the `href` and `storage` type in the `options.fonts` section of the request.

- Specify the action to be taken if one or more fonts required for the add/edit operation(s) are missing: The `manageMissingFonts` field in the `options` section of the request can be used to specify this action. It can accept one of the following 2 values:
  - `fail` to force the request/job to fail
  - `useDefault` to use our system designated default font, which is: `ArialMT`

Here is an example usage of `manageMissingFonts` and `globalFont`. [Handle missing fonts](../code-sample/#example-5-dictating-actions-for-missing-fonts)

#### Limitations

- Most of the text attributes retain their respective original values. There are some attributes however that do not retain their original values. For example (and not limited to): tracking, leading, kerning

### Photoshop Actions(`New!`)
#### Execute Photoshop Actions

Adobe Photoshop APIs supports playing back Photoshop Actions recorded from Photoshop.  <a href="https://adobedocs.github.io/photoshop-api-docs-pre-release/#api-Photoshop-photoshopActions" target="_blank">Click here to see API documentation</a>

An action is a series of tasks that you play back on a single file or a batch of files—menu commands, panel options, tool actions, and so on. For example, you can create an action that changes the size of an image, applies an effect to the image, and then saves the file in the desired format.

For more information on how to create Photoshop Actions, see <a href="https://helpx.adobe.com/photoshop/using/actions-actions-panel.html" target="_blank">Adobe Help Center</a>

#### Usage Recommendations
* Create actions that do not open any operating system dialogs. All Photoshop dialogs are supported, but not operating system dialogs.
* It is recommended to create Actions that do not require user interactions.
* Input and Output file format should be any of PSD, JPEG, PNG, or TIFF.
* Make sure to test your actions on Photoshop, with several different input/images. If it has any errors on Photoshop, it won't run successfully on our servers either.

#### Known Limitations
The following are known limitations for the Alpha release

* Not supported, 3D and Video features
* Custom presets (for example color swatches and brushes)
* The action should operate on one document.  Multiple documents support will be in a future release

Here are examples of submitting and executing Photoshop Actions.
[Execute Photoshop Actions with all actions](../code-sample/#example-15--photoshop-actions---play-all-actions-in-atn-file) and [Execute Photoshop Actions with a specific action](../code-sample/#example-16--photoshop-actions-play-a-specific-action)

### Rendering / Conversions

- Create a new PSD document
- Create a JPEG, TIFF or PNG rendition of various sizes
- Request thumbnail previews of all renderable layers
- Convert between any of the supported filetypes (PSD, JPEG, TIFF, PNG)

Here is an example of creating JPEG and PNG rendtions of a PSD document.
[Render PSD document](../code-sample/#example-10-create-a-document-rendition)

### Layer level edits

- General layer edits
  - Edit the layer name
  - Toggle the layer locked state
  - Toggle layer visibility
  - Move or resize the layer via it's bounds
  - Delete layers
- Adjustment layers  (`Pre-Release Feature!!`)
  - Add or edit an adjustment layer. The following types of adjustment layers are currently supported:
  - Brightness and Contrast
  - Exposure
  - Hue and Saturation
  - Color Balance
- Image/Pixel layers (`Pre-Release Feature!!`)
  - Add a new pixel layer, with optional image
  - Swap the image in an existing pixel layer
- Shape layers (`Pre-Release Feature!!`)
  - Resize a shape layer via it's bounds

#### The add, edit and delete objects

The `/documentOperations` API should primarily be used to make layer and/or document level edits to your PSD and then generate new renditions with the changes. You can pass in a flat array of only the layers that you wish to act upon, in the `options.layers` argument of the request body.
The layer name (or the layer id) will be used by the service to identify the correct layer to operation upon in your PSD.

The `add`, `edit`, `move` and `delete` blocks indicate the action you would like to be taken on a particular layer object. Any layer block passed into the API that is missing one of these attributes will be ignored.
The `add` and `move` blocks must also supply one of the attributes `insertAbove`, `insertBelow`, `insertInto`, `insertTop` or `insertBottom` to indicate where you want to move the layer to. More details on this can be found in the API documentation.

**Note**: Adding a new layer does not require the ID to be included, the service will generate a new layer id for you.

Here are some examples of making various layer level edits.
- [Layer level editing](../code-sample/#example-6-making-a-simple-edit)
- [Adding a new Adjustment Layer](../code-sample/#example-8-adding-a-new-adjustment-layer)
- [Editing Image in a Pixel Layer](../code-sample/#example-9-editing-a-pixel-layer)

### Document level edits
- Crop a PSD
- Resize a PSD

### Artboards
- Show artboard information in the JSON Manifest
- Create a new artboard from multiple input psd's


## Lightroom
The API's are documented at [https://adobedocs.github.io/photoshop-api-docs-pre-release/#api-Lightroom](https://adobedocs.github.io/photoshop-api-docs-pre-release/#api-Lightroom)

### AutoTone

Automatically tone an image to correct exposure/contrast/sharpness/etc

### AutoStraighten

Applies the Auto Upright transformation on an image

### Presets

Apply one or more XMP Lightroom presets to an image, by referencing preset file(s) stored on cloud.
The preset file can be created by editing an image in lightroom and exporting it as a `.xmp` file.
The details on how to create a preset can be found [here](https://helpx.adobe.com/lightroom-cc/how-to/photo-presets-lightroom-cc.html).
If the use case would be to be able to create an `.xmp` file from a set of slider values obtained directly from a user, there are 2 ways to achieve this workflow:
1. Start with the empty `.xmp` file from [here](https://github.com/AdobeDocs/cis-photoshop-api-docs/blob/main/sample-code/lr-sample-app/crs.xml) and add the corresponding slider values
2. Or please look ahead in this documentation page at the [/edit API](/features/#edit)

### Edit

Apply one or more Lightroom edits to an image.

### XMP
Apply a Lightroom preset to an image, by passing in the preset XMP contents inline through the API.

## Sensei
These are the APIs powered by Sensei, Adobe’s Artificial Intelligence Technology, and Photoshop. The API's can identify the main subject of an image and produce two types of outputs. You can create a greyscale [mask](https://en.wikipedia.org/wiki/Layers_(digital_image_editing)#Layer_mask) png file that you can composite onto the original image (or any other).  You can also create a cutout where the mask has already composited onto your original image so that everything except the main subject has been removed.


| Original        | Mask           | Cutout  |
| :-------------: |:-------------:| :-----:|
| ![alt image](./sensei_orig.jpg?raw=true "Original Image") | ![alt image](./sensei_mask.png?raw=true "Mask")| ![alt image](./sensei_cutout.png?raw=true "Original Image")|

The API's are documented at [Image Cutout API Reference](https://adobedocs.github.io/photoshop-api-docs-pre-release/#api-Sensei)

### Image Cutout

Initiate a job to create an image cutout. Code example [here](../code-sample/#example-1-generate-image-cutout).

### Image Mask

Initiate a job to create an image mask. Code example [here](../code-sample/#example-2-generate-image-mask).

## Customized Workflow
You can make a 'customized workflow' by chaining different APIs. Example of which can be found [here](../code-sample/#example-3-generate-imagecutout-result-as-photoshop-path)


## Using Webhooks through Adobe I/O Events (`Pre-Release Feature!!`)

Adobe I/O Events offers the possibility to build an event-driven application, based on events originating from Photoshop and Lightroom API's. To start listening for events, your application needs to register a webhook URL, specifying the Event Types to receive. Whenever a matching event gets triggered, your application is notified through an HTTP POST request to the webhook URL.
The Event Provider for Photoshop and Lightroom API's is `Imaging API Events`.
This event provider has two event types:
1. `Photoshop API events`
2. `Lightroom API events`

As the names indicate, these event types represent events triggered by the individual APIs.

### Registering your application to our Event Provider
#### Prerequisites needed to use the Event Provider

1. Only supported for a `JWT Integration`: You will have to create your own JWT Integration, please refer to [this](../authentication/#generating-a-token) section of the document for details on how to create a Service Integration.
2. Make sure that the integration is created under your own Organization Role in https://console.adobe.io and this will ensure that you have a unique `Organization ID`. A typical ID would look something like this: `ABCDEF123B6CCB7B0A495E2E@AdobeOrg` and can be found in the overview section of the details of the integration.
3. Create a Webhook application. [This](https://www.adobe.io/apis/experienceplatform/events/docs.html#!adobedocs/adobeio-events/master/intro/webhooks_intro.md) page gives all the details of what the skeleton of a basic application would look like. You can find a sample NodeJS application [here](https://github.com/AdobeDocs/cis-photoshop-api-docs/tree/main/sample-code/webhook-sample-app)

#### Registering the Webhook
Once the above prerequisites are met, you can now proceed to register the webhook to the service integration. The steps to do that can be found  [here](https://www.adobe.io/apis/experienceplatform/events/docs.html#!adobedocs/adobeio-events/master/intro/webhooks_intro.md#your-first-webhook).
After the webhook has been successfully registered, you will start to receive the events for any submitted job that either succeeded or failed, from the Event Types selected. This eliminates the need for your application to poll for the status of the job using the jobID. Examples can be found here (TODO)
