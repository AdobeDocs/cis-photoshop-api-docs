---
title: Features in Photoshop Service
description: Learn about the available features in Photoshop Service.
---

# Supported Features

This is a partial list of currently supported features.  Please also see the [Release Notes](https://forums.adobeprerelease.com/photoshopapiservice/categories/releasenotes) for a list of added features

## SmartObject

The Photoshop APIs currently support creating and editing of Embedded Smart Objects. Support for Linked Smart Objects is forthcoming.

- In order to update an embedded smart object that is referenced by multiple layers you need to update each of those layers, then only the effect will be reflected in all layers referencing the same smart object.

- The replaced smart object is placed within the bounding box of the original image. If the new image is bigger or smaller than the original image, it fits into the original bounding box maintaining the aspect ratio. You can change the bounds of the replaced image by passing bounds parameters in the API call.

- If your document contains transparent pixels (e.g some .png) for the smart object layer, you may not get consistent bounds.

The API's are documented [here](https://adobedocs.github.io/photoshop-api-docs-pre-release/#api-Photoshop-document_operations)
We also have an example of replacing a Smart Object within a layer.
[Smart Object Example Code](#sample-1-replacing-a-smartobject)
For better performance, we rasterize our smart objects that are bigger than  2000 pixels * 2000 pixels.
For optimal processing, please make sure the embedded smart object that you want to replace only contains alphanumeric characters in it's name.

## Text layers

The Photoshop APIs currently support creating and editing of Text Layer with different fonts, character styles and paragraph styles. The set of text attributes that can be edited is listed below:
- Edit the text contents
- Change the font (See the `Fonts` section for more info)
- Edit the font size
- Change the font color in the following formats: rgb, cmyk, gray, lab
- Edit the text orientation (horizontal/vertical)
- Edit the paragraph alignment (left, center, right, justify, justifyLeft, justifyCenter, justifyRight)

The API's are documented [here](https://adobedocs.github.io/photoshop-api-docs-pre-release/#api-Photoshop-document_operations)

We also have an example of making a simple text layer edit.

[Text layer Example Code](#sample-21-making-a-text-layer-edit)

### Font handling
In order to be able to correctly operate on text layers in the PSD, the corresponding fonts needed for these layers will need to be available when the server is processing the PSD. These include fonts from the following cases:
1. The font that is in the text layer being edited, but the font itself is not being changed
2. If the font in a text layer is being changed to a new font

While referencing fonts in the API request, please ensure that the correct Postscript name for that font is used. Referencing to that font with any other name will result in the API treating this as a missing font.

The Photoshop APIs supports using the following category of fonts:
- Currently Installed Fonts on the server listed [here](SupportedFonts.md)
- Fonts that you are authorized to access via [Adobe Fonts](https://fonts.adobe.com/fonts).
  **Note:** Currently only available for OAuth tokens, JWT service token support is forthcoming.
- Custom/Other Fonts: These are the fonts that are either owned by you or the ones that only you are authorized to use.
  To use a custom font you must include an href to the font in your request. Look at the `options.fonts` section of the API docs for more information.
  For including an href to the font in your request, please ensure the font file name to be in this format: `<font_postscript_name>.<ext>`, when it is being uploaded in your choice of storage. A sample `options.fonts` section will look like so:
  ```json
  {
    "storage": "adobe",
    "href": "/files/OpenSansCondensed-Light.ttf"
  }
  ```
  **Note:** This also applies to any other font present in the document which is not to be found in the first 2 categories above.

Here is an example usage of a custom font
[Custom font](#sample-22-using-a-custom-font-in-a-text-layer)

### Handle missing fonts in the document.

The API provides two options to control the behavior when there are missing fonts, as the request is being processed:
- Specify a global font which would act as a default font for the current request: The `globalFont` field in the `options` section of the request can be used to specify the full postscript name of this font.
For any textLayer edit/add operation, if the font used specifically for that layer is missing, this font will be used as the default. If the global font itself is missing, then the action to be taken will be dictated by the `manageMissingFonts` options as explained here in the next bullet point.

**Note**: If using an OAuth integration, Adobe Fonts can be used as a global font as well. If the global font is a custom font, please upload the font to one of the cloud storage types that is supported and specify the `href` and `storage` type in the `options.fonts` section of the request.

- Specify the action to be taken if one or more fonts required for the add/edit operation(s) are missing: The `manageMissingFonts` field in the `options` section of the request can be used to specify this action. It can accept one of the following 2 values:
  - `fail` to force the request/job to fail
  - `useDefault` to use our system designated default font, which is: `ArialMT`

Here is an example usage of `manageMissingFonts` and `globalFont`
[Handle missing fonts](#sample-23-dictating-actions-for-missing-fonts)

### Limitations
- Most of the text attributes retain their respective original values. There are some attributes however that do not retain their original values. For example (and not limited to): tracking, leading, kerning

## Photoshop Actions
### Execute Photoshop Actions (`New!`)

Adobe Photoshop APIs supports playing back Photoshop Actions recorded from Photoshop.  <a href="https://adobedocs.github.io/photoshop-api-docs-pre-release/#api-Photoshop-photoshopActions" target="_blank">Click here to see API documentation</a>

An action is a series of tasks that you play back on a single file or a batch of files—menu commands, panel options, tool actions, and so on. For example, you can create an action that changes the size of an image, applies an effect to the image, and then saves the file in the desired format.

For more information on how to create Photoshop Actions, see <a href="https://helpx.adobe.com/photoshop/using/actions-actions-panel.html" target="_blank">Adobe Help Center</a>

### Usage Recommendations
* Create actions that do not open any operating system dialogs. All Photoshop dialogs are supported, but not operating system dialogs.
* It is recommended to create Actions that do not require user interactions.
* Input and Output file format should be any of PSD, JPEG, PNG, or TIFF.
* Make sure to test your actions on Photoshop, with several different input/images. If it has any errors on Photoshop, it won't run successfully on our servers either.

### Known Limitations
The following are known limitations for the Alpha release

* Not supported, 3D and Video features
* Custom presets (for example color swatches and brushes)
* The action should operate on one document.  Multiple documents support will be in a future release

Here are examples of submitting and executing Photoshop Actions.
[Execute Photoshop Actions](#sample-71---play-all-actions-in-atn-file)

## Rendering / Conversions

- Create a new PSD document
- Create a JPEG, TIFF or PNG rendition of various sizes
- Request thumbnail previews of all renderable layers
- Convert between any of the supported filetypes (PSD, JPEG, TIFF, PNG)

Here is an example of creating JPEG and PNG rendtions of a PSD document.
[Render PSD document](#sample-41-a-single-file-input)

## Layer level edits

- General layer edits
  - Edit the layer name
  - Toggle the layer locked state
  - Toggle layer visibility
  - Move or resize the layer via it's bounds
  - Delete layers
- Adjustment layers
  - Add or edit an adjustment layer. The following types of adjustment layers are currently supported:
  - Brightness and Contrast
  - Exposure
  - Hue and Saturation
  - Color Balance
- Image/Pixel layers
  - Add a new pixel layer, with optional image
  - Swap the image in an existing pixel layer
- Shape layers
  - Resize a shape layer via it's bounds

### The add, edit and delete objects

The `/documentOperations` API should primarily be used to make layer and/or document level edits to your PSD and then generate new renditions with the changes. You can pass in a flat array of only the layers that you wish to act upon, in the `options.layers` argument of the request body.
The layer name (or the layer id) will be used by the service to identify the correct layer to operation upon in your PSD.

The `add`, `edit`, `move` and `delete` blocks indicate the action you would like to be taken on a particular layer object. Any layer block passed into the API that is missing one of these attributes will be ignored.
The `add` and `move` blocks must also supply one of the attributes `insertAbove`, `insertBelow`, `insertInto`, `insertTop` or `insertBottom` to indicate where you want to move the layer to. More details on this can be found in the API documentation.

**Note**: Adding a new layer does not require the ID to be included, the service will generate a new layer id for you.

Here are some examples of making various layer level edits.
- [Layer level editing](#sample-31-making-a-simple-edit)
- [Adding a new Adjustment Layer](#sample-34-adding-a-new-adjustment-layer)
- [Editing Image in a Pixel Layer](#sample-35-editing-the-image-in-a-pixel-layer)

## Document level edits
- Crop a PSD
- Resize a PSD

## Artboards
- Show artboard information in the JSON Manifest
- Create a new artboard from multiple input psd's

## Compatibility with Photoshop versions

1. The API’s will open any PSD created with Photoshop 1.0 through the current release and this will always be true.
2.  When saving as PSD, the API’s will create PSD’s compatible with the current shipping Photoshop.
3.  In regards to “maximize compatibility” referenced in [https://helpx.adobe.com/photoshop/using/file-formats.html#maximize_compatibility_for_psd_and_psb_files](https://helpx.adobe.com/photoshop/using/file-formats.html#maximize_compatibility_for_psd_and_psb_files)  the API's default to “yes”
