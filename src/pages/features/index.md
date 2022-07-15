---
title: Features in Photoshop API
description: Learn about the available features in Photoshop API.
---

# Supported Features

This is a list of currently supported features.  Please also see the [Release Notes](../release-notes/index.md) for a list of newly added features

## Photoshop

The APIs are documented at [Photoshop API](../api/#tag/Photoshop)

### SmartObject

The Photoshop APIs currently support creating and editing of Embedded Smart Objects. Support for Linked Smart Objects is forthcoming.

- In order to update an embedded smart object that is referenced by multiple layers you need to update each of those layers, then only the effect will be reflected in all layers referencing the same smart object.

- The replaced smart object is placed within the bounding box of the original image. If the new image is bigger or smaller than the original image, it fits into the original bounding box maintaining the aspect ratio. You can change the bounds of the replaced image by passing bounds parameters in the API call.

- If your document contains transparent pixels (e.g some .png) for the smart object layer, you may not get consistent bounds.

The APIs are documented [here](../api/#operation/smartObject).
We also have an example of replacing a Smart Object within a layer.
[Smart Object Example Code](../code-sample/#example-1-smartobject).
For better performance, we rasterize our smart objects that are bigger than  2000 pixels * 2000 pixels.
For optimal processing, please make sure the embedded smart object that you want to replace only contains alphanumeric characters in it's name.

Example of Smart Object replacement with a sample image.
![alt image](./smartobject_example.png?raw=true "Original Image")

### Text(`New!`)

The Photoshop /text API supports editing one or more text layers from a Photoshop document. The APIs are documented [here](./api/#operation/text)

It enables user to
- Format text properties such as antialias, orientation and be able to edit text contents. (Note: Changing only the text properties will not change any character/paragraph styling)
- Some of the key character properties that can be formatted include (but not limited to):
  - Text treatments such as strikethrough, underline, fontCaps
  - Character size and color
  - Line and character spacing through leading, tracking, autoKern settings
- All the paragraph properties are supported
- Use custom fonts when specified through the options.fonts section in the API request body

#### Usage Recommendations
- Ensure that the input file is a PSD and that it contains one or more text layers.
- Please refer to [Font Handling](/features/#font-handling) and [Handle Missing Fonts](/features/#handle-missing-fonts-in-the-document) for better understanding.

#### Known Limitations
The following are known limitations for the Alpha release

- The API cannot automatically detect missing fonts in the layers. To prevent potential missing fonts from being replaced, please provide a href to the font(s) in the options.fonts section of the API. For more details on specifying custom fonts, please refer to the example section below.

[Here](../code-sample/#example-17-edit-text-layers) is a code sample.

Here is an example where the font was changed from the original image on the left using the Text API.
![alt image](./textlayer_example.png?raw=true "Original Image")

### ProductCrop(`New!`)

The ProductCrop API supports applying smart crop to your image. The APIs are documented [here](./api/#operation/productCrop)

It enables user to
- Identify the product and get it cropped smartly.
- Enter the required padding they need in their cropped image.

#### Known Limitations
- The current model is trained to return a crop that respects the salient object within an image. There is a current known issue that when a person or portrait is contained within a salient object, the model will crop with the person as the focal area rather than the salient object that contains it. This is problematic in the case of an item where an image of a person is contained within a design (i.e. a t-shirt, collectible or art). Rather than crop to the intended item, the service will crop to the person within the item.
We intend to correct this issue in future releases.

[Here](../code-sample/#example-18--applying-product-crop) is a code sample.

### DepthBlur(`New!`)

The DepthBlur API supports applying depth blur to your image. The APIs are documented [here](./api/#operation/depthBlur)

Depth Blur is part of the Neural Filters gallery in Photoshop. It allows you to target the area and range of blur in photos, creating wide-aperture depth of field blur effects. You may choose different focal points or remove the focal point and control the depth blur through manipulating the focal range slider. Setting focusSubject to true will select the most prominent subject in the image and apply depth blur around that subject.

[Here](../code-sample/#example-19--applying-depth-blur-neural-filter) is a code sample.

### Photoshop Actions(`New!`)
#### Execute Photoshop Actions

Adobe Photoshop APIs supports playing back Photoshop Actions recorded from Photoshop. The APIs are documented [here](../api/#operation/photoshopActions)

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

In this example we applied a custom Action we created called "Graphic Design."
![alt image](./psactions_example.png?raw=true "Original Image")

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

#### Text layers Edits

The Photoshop API currently support creating and editing of Text Layer with different fonts, character styles and paragraph styles. The set of text attributes that can be edited is listed below:
- Edit the text contents
- Change the font (See the `Fonts` section for more info)
- Edit the font size
- Change the font color in the following formats: rgb, cmyk, gray, lab
- Edit the text orientation (horizontal/vertical)
- Edit the paragraph alignment (left, center, right, justify, justifyLeft, justifyCenter, justifyRight)

The APIs are documented [here](../api/#operation/documentOperations)

We also have an example of making a simple text layer edit.

[Text layer Example Code](../code-sample/#example-3-making-a-text-layer-edit)

##### Font handling

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

##### Handle missing fonts in the document.

The API provides two options to control the behavior when there are missing fonts, as the request is being processed:
- Specify a global font which would act as a default font for the current request: The `globalFont` field in the `options` section of the request can be used to specify the full postscript name of this font.
For any textLayer edit/add operation, if the font used specifically for that layer is missing, this font will be used as the default. If the global font itself is missing, then the action to be taken will be dictated by the `manageMissingFonts` options as explained here in the next bullet point.

**Note**: If using an OAuth integration, Adobe Fonts can be used as a global font as well. If the global font is a custom font, please upload the font to one of the cloud storage types that is supported and specify the `href` and `storage` type in the `options.fonts` section of the request.

- Specify the action to be taken if one or more fonts required for the add/edit operation(s) are missing: The `manageMissingFonts` field in the `options` section of the request can be used to specify this action. It can accept one of the following 2 values:
  - `fail` to force the request/job to fail
  - `useDefault` to use our system designated default font, which is: `ArialMT`

Here is an example usage of `manageMissingFonts` and `globalFont`. [Handle missing fonts](../code-sample/#example-5-dictating-actions-for-missing-fonts)

##### Limitations

- Most of the text attributes retain their respective original values. There are some attributes however that do not retain their original values. For example (and not limited to): tracking, leading, kerning

### Document level edits
- Crop a PSD
- Resize a PSD

### Artboards
- Show artboard information in the JSON Manifest
- Create a new artboard from multiple input psd's


## Lightroom
The APIs are documented at [Lightroom API](../api/#tag/Lightroom).
Any input image format that is supported by Lightroom is also supported by the APIs. To look at the list of these formats in more detail, please refer to: https://helpx.adobe.com/lightroom-classic/help/supported-file-formats.html

At this point the output formats supported are JPG, DNG and PNG.

### AutoTone

Automatically correct exposure, contrast, sharpness, saturation, etc. Code sample [here](../code-sample/#example-1-autotone-an-image)<br />

In this example, we automatically adjusted the photo using the AutoTone API.
![alt image](./autotone_example.png?raw=true "Original Image")

### AutoStraighten

Applies the Auto Upright transformation on an image. Code sample [here](../code-sample/#example-2-autostraighten-an-image)

### Presets

Apply one or more XMP Lightroom presets to an image, by referencing preset file(s) stored on cloud. Code sample [here](../code-sample/#example-3--apply-presets-to-an-image)
The preset file can be created by editing an image in lightroom and exporting it as a `.xmp` file.
The details on how to create a preset can be found [here](https://helpx.adobe.com/lightroom-cc/how-to/photo-presets-lightroom-cc.html).
If the use case would be to be able to create an `.xmp` file from a set of slider values obtained directly from a user, there are 2 ways to achieve this workflow:
1. Start with the empty `.xmp` file from [here](https://github.com/AdobeDocs/cis-photoshop-api-docs/blob/main/sample-code/lr-sample-app/crs.xml) and add the corresponding slider values
2. Or please look ahead in this documentation page at the [/edit API](/features/#edit)

In this example, we are applying the Preset called "Aged Photo" to automatically make the adjustments.
![alt image](./preset_example.png?raw=true "Original Image")

### Edit

Apply one or more Lightroom edits to an image. Code sample [here](../code-sample/#example-4-apply-edits-to-an-image)

### XMP
Apply a Lightroom preset to an image, by passing in the preset XMP contents inline through the API. Code sample [here](../code-sample/#example-5-apply-xmp-to-an-image)

## Sensei
These are the APIs powered by Sensei, Adobe’s Artificial Intelligence Technology, and Photoshop. The APIs can identify the main subject of an image and produce two types of outputs. You can create a greyscale [mask](https://en.wikipedia.org/wiki/Layers_(digital_image_editing)#Layer_mask) png file that you can composite onto the original image (or any other).  You can also create a cutout where the mask has already composited onto your original image so that everything except the main subject has been removed.

The APIs are documented at [Sensei API Reference](../api/#tag/Sensei)

### Image Cutout

Initiate a job to create an image cutout. Code sample [here](../code-sample/#example-1-generate-image-cutout).<br />

Example of Image Cutout with a sample image.
![alt image](./imagecutout_cutout_example.png?raw=true "Original Image")

### Image Mask

Initiate a job to create an image mask. Code sample [here](../code-sample/#example-2-generate-image-mask).<br />

Example of Image mask with a sample image.
![alt image](./imagecutout_mask_example.png?raw=true "Original Image")

## Customized Workflow
You can make a 'customized workflow' by chaining different APIs. Example of which can be found [here](../code-sample/#example-3-generate-imagecutout-result-as-photoshop-path)


## Using Webhooks through Adobe I/O Events (`Pre-Release Feature!!`)

Adobe I/O Events offers the possibility to build an event-driven application, based on events originating from Photoshop and Lightroom APIs. To start listening for events, your application needs to register a webhook URL, specifying the Event Types to receive. Whenever a matching event gets triggered, your application is notified through an HTTP POST request to the webhook URL.
The Event Provider for Photoshop and Lightroom APIs is `Imaging API Events`.
This event provider has two event types:
1. `Photoshop API events`
2. `Lightroom API events`

As the names indicate, these event types represent events triggered by the individual APIs.

### Registering your application to our Event Provider
#### Prerequisites needed to use the Event Provider

1. Only supported for a `JWT Integration`: You will have to create your own JWT Integration, please refer to [this](../authentication/#generating-a-token) section of the document for details on how to create a Service Integration.
2. Make sure that the integration is created under your own Organization Role in https://developer.adobe.com/console and this will ensure that you have a unique `Organization ID`. A typical ID would look something like this: `ABCDEF123B6CCB7B0A495E2E@AdobeOrg` and can be found in the overview section of the details of the integration.
3. Create a Webhook application. [This](https://www.adobe.io/apis/experienceplatform/events/docs.html#!adobedocs/adobeio-events/master/intro/webhooks_intro.md) page gives all the details of what the skeleton of a basic application would look like. You can find a sample NodeJS application [here](https://github.com/AdobeDocs/cis-photoshop-api-docs/tree/main/sample-code/webhook-sample-app)

#### Registering the Webhook
Once the above prerequisites are met, you can now proceed to register the webhook to the service integration. The steps to do that can be found  [here](https://www.adobe.io/apis/experienceplatform/events/docs.html#!adobedocs/adobeio-events/master/intro/webhooks_intro.md#your-first-webhook).
After the webhook has been successfully registered, you will start to receive the events for any submitted job that either succeeded or failed, from the Event Types selected. This eliminates the need for your application to poll for the status of the job using the jobID. Examples can be found [here](../code-sample/#triggering-an-event-from-the-apis)
