(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[300],{1044:function(e,t,a){"use strict";a.r(t),a.d(t,{_frontmatter:function(){return r},default:function(){return m}});var n=a(2122),o=a(9756),i=(a(5007),a(4983)),l=a(9536),r={},s={_frontmatter:r},d=l.Z;function m(e){var t=e.components,a=(0,o.Z)(e,["components"]);return(0,i.mdx)(d,(0,n.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,i.mdx)("h1",{id:"supported-features"},"Supported Features"),(0,i.mdx)("p",null,"This is a partial list of currently supported features.  Please also see the ",(0,i.mdx)("a",{parentName:"p",href:"https://forums.adobeprerelease.com/photoshopapiservice/categories/releasenotes"},"Release Notes")," for a list of added features"),(0,i.mdx)("h2",{id:"smartobject"},"SmartObject"),(0,i.mdx)("p",null,"The Photoshop APIs currently support creating and editing of Embedded Smart Objects. Support for Linked Smart Objects is forthcoming."),(0,i.mdx)("ul",null,(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("p",{parentName:"li"},"In order to update an embedded smart object that is referenced by multiple layers you need to update each of those layers, then only the effect will be reflected in all layers referencing the same smart object.")),(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("p",{parentName:"li"},"The replaced smart object is placed within the bounding box of the original image. If the new image is bigger or smaller than the original image, it fits into the original bounding box maintaining the aspect ratio. You can change the bounds of the replaced image by passing bounds parameters in the API call.")),(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("p",{parentName:"li"},"If your document contains transparent pixels (e.g some .png) for the smart object layer, you may not get consistent bounds."))),(0,i.mdx)("p",null,"The API's are documented ",(0,i.mdx)("a",{parentName:"p",href:"https://adobedocs.github.io/photoshop-api-docs-pre-release/#api-Photoshop-document_operations"},"here"),"\nWe also have an example of replacing a Smart Object within a layer.\n",(0,i.mdx)("a",{parentName:"p",href:"#sample-1-replacing-a-smartobject"},"Smart Object Example Code"),"\nFor better performance, we rasterize our smart objects that are bigger than  2000 pixels * 2000 pixels.\nFor optimal processing, please make sure the embedded smart object that you want to replace only contains alphanumeric characters in it's name."),(0,i.mdx)("h2",{id:"text-layers"},"Text layers"),(0,i.mdx)("p",null,"The Photoshop APIs currently support creating and editing of Text Layer with different fonts, character styles and paragraph styles. The set of text attributes that can be edited is listed below:"),(0,i.mdx)("ul",null,(0,i.mdx)("li",{parentName:"ul"},"Edit the text contents"),(0,i.mdx)("li",{parentName:"ul"},"Change the font (See the ",(0,i.mdx)("inlineCode",{parentName:"li"},"Fonts")," section for more info)"),(0,i.mdx)("li",{parentName:"ul"},"Edit the font size"),(0,i.mdx)("li",{parentName:"ul"},"Change the font color in the following formats: rgb, cmyk, gray, lab"),(0,i.mdx)("li",{parentName:"ul"},"Edit the text orientation (horizontal/vertical)"),(0,i.mdx)("li",{parentName:"ul"},"Edit the paragraph alignment (left, center, right, justify, justifyLeft, justifyCenter, justifyRight)")),(0,i.mdx)("p",null,"The API's are documented ",(0,i.mdx)("a",{parentName:"p",href:"https://adobedocs.github.io/photoshop-api-docs-pre-release/#api-Photoshop-document_operations"},"here")),(0,i.mdx)("p",null,"We also have an example of making a simple text layer edit."),(0,i.mdx)("p",null,(0,i.mdx)("a",{parentName:"p",href:"#sample-21-making-a-text-layer-edit"},"Text layer Example Code")),(0,i.mdx)("h3",{id:"font-handling"},"Font handling"),(0,i.mdx)("p",null,"In order to be able to correctly operate on text layers in the PSD, the corresponding fonts needed for these layers will need to be available when the server is processing the PSD. These include fonts from the following cases:"),(0,i.mdx)("ol",null,(0,i.mdx)("li",{parentName:"ol"},"The font that is in the text layer being edited, but the font itself is not being changed"),(0,i.mdx)("li",{parentName:"ol"},"If the font in a text layer is being changed to a new font")),(0,i.mdx)("p",null,"While referencing fonts in the API request, please ensure that the correct Postscript name for that font is used. Referencing to that font with any other name will result in the API treating this as a missing font."),(0,i.mdx)("p",null,"The Photoshop APIs supports using the following category of fonts:"),(0,i.mdx)("ul",null,(0,i.mdx)("li",{parentName:"ul"},"Currently Installed Fonts on the server listed ",(0,i.mdx)("a",{parentName:"li",href:"SupportedFonts.md"},"here")),(0,i.mdx)("li",{parentName:"ul"},"Fonts that you are authorized to access via ",(0,i.mdx)("a",{parentName:"li",href:"https://fonts.adobe.com/fonts"},"Adobe Fonts"),".\n",(0,i.mdx)("strong",{parentName:"li"},"Note:")," Currently only available for OAuth tokens, JWT service token support is forthcoming."),(0,i.mdx)("li",{parentName:"ul"},"Custom/Other Fonts: These are the fonts that are either owned by you or the ones that only you are authorized to use.\nTo use a custom font you must include an href to the font in your request. Look at the ",(0,i.mdx)("inlineCode",{parentName:"li"},"options.fonts")," section of the API docs for more information.\nFor including an href to the font in your request, please ensure the font file name to be in this format: ",(0,i.mdx)("inlineCode",{parentName:"li"},"<font_postscript_name>.<ext>"),", when it is being uploaded in your choice of storage. A sample ",(0,i.mdx)("inlineCode",{parentName:"li"},"options.fonts")," section will look like so:",(0,i.mdx)("pre",{parentName:"li"},(0,i.mdx)("code",{parentName:"pre",className:"language-json"},'{\n  "storage": "adobe",\n  "href": "/files/OpenSansCondensed-Light.ttf"\n}\n')),(0,i.mdx)("strong",{parentName:"li"},"Note:")," This also applies to any other font present in the document which is not to be found in the first 2 categories above.")),(0,i.mdx)("p",null,"Here is an example usage of a custom font\n",(0,i.mdx)("a",{parentName:"p",href:"#sample-22-using-a-custom-font-in-a-text-layer"},"Custom font")),(0,i.mdx)("h3",{id:"handle-missing-fonts-in-the-document"},"Handle missing fonts in the document."),(0,i.mdx)("p",null,"The API provides two options to control the behavior when there are missing fonts, as the request is being processed:"),(0,i.mdx)("ul",null,(0,i.mdx)("li",{parentName:"ul"},"Specify a global font which would act as a default font for the current request: The ",(0,i.mdx)("inlineCode",{parentName:"li"},"globalFont")," field in the ",(0,i.mdx)("inlineCode",{parentName:"li"},"options")," section of the request can be used to specify the full postscript name of this font.\nFor any textLayer edit/add operation, if the font used specifically for that layer is missing, this font will be used as the default. If the global font itself is missing, then the action to be taken will be dictated by the ",(0,i.mdx)("inlineCode",{parentName:"li"},"manageMissingFonts")," options as explained here in the next bullet point.")),(0,i.mdx)("p",null,(0,i.mdx)("strong",{parentName:"p"},"Note"),": If using an OAuth integration, Adobe Fonts can be used as a global font as well. If the global font is a custom font, please upload the font to one of the cloud storage types that is supported and specify the ",(0,i.mdx)("inlineCode",{parentName:"p"},"href")," and ",(0,i.mdx)("inlineCode",{parentName:"p"},"storage")," type in the ",(0,i.mdx)("inlineCode",{parentName:"p"},"options.fonts")," section of the request."),(0,i.mdx)("ul",null,(0,i.mdx)("li",{parentName:"ul"},"Specify the action to be taken if one or more fonts required for the add/edit operation(s) are missing: The ",(0,i.mdx)("inlineCode",{parentName:"li"},"manageMissingFonts")," field in the ",(0,i.mdx)("inlineCode",{parentName:"li"},"options")," section of the request can be used to specify this action. It can accept one of the following 2 values:",(0,i.mdx)("ul",{parentName:"li"},(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("inlineCode",{parentName:"li"},"fail")," to force the request/job to fail"),(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("inlineCode",{parentName:"li"},"useDefault")," to use our system designated default font, which is: ",(0,i.mdx)("inlineCode",{parentName:"li"},"ArialMT"))))),(0,i.mdx)("p",null,"Here is an example usage of ",(0,i.mdx)("inlineCode",{parentName:"p"},"manageMissingFonts")," and ",(0,i.mdx)("inlineCode",{parentName:"p"},"globalFont"),"\n",(0,i.mdx)("a",{parentName:"p",href:"#sample-23-dictating-actions-for-missing-fonts"},"Handle missing fonts")),(0,i.mdx)("h3",{id:"limitations"},"Limitations"),(0,i.mdx)("ul",null,(0,i.mdx)("li",{parentName:"ul"},"Most of the text attributes retain their respective original values. There are some attributes however that do not retain their original values. For example (and not limited to): tracking, leading, kerning")),(0,i.mdx)("h2",{id:"photoshop-actions"},"Photoshop Actions"),(0,i.mdx)("h3",{id:"execute-photoshop-actions-new"},"Execute Photoshop Actions (",(0,i.mdx)("inlineCode",{parentName:"h3"},"New!"),")"),(0,i.mdx)("p",null,"Adobe Photoshop APIs supports playing back Photoshop Actions recorded from Photoshop.  ",(0,i.mdx)("a",{href:"https://adobedocs.github.io/photoshop-api-docs-pre-release/#api-Photoshop-photoshopActions",target:"_blank"},"Click here to see API documentation")),(0,i.mdx)("p",null,"An action is a series of tasks that you play back on a single file or a batch of files—menu commands, panel options, tool actions, and so on. For example, you can create an action that changes the size of an image, applies an effect to the image, and then saves the file in the desired format."),(0,i.mdx)("p",null,"For more information on how to create Photoshop Actions, see ",(0,i.mdx)("a",{href:"https://helpx.adobe.com/photoshop/using/actions-actions-panel.html",target:"_blank"},"Adobe Help Center")),(0,i.mdx)("h3",{id:"usage-recommendations"},"Usage Recommendations"),(0,i.mdx)("ul",null,(0,i.mdx)("li",{parentName:"ul"},"Create actions that do not open any operating system dialogs. All Photoshop dialogs are supported, but not operating system dialogs."),(0,i.mdx)("li",{parentName:"ul"},"It is recommended to create Actions that do not require user interactions."),(0,i.mdx)("li",{parentName:"ul"},"Input and Output file format should be any of PSD, JPEG, PNG, or TIFF."),(0,i.mdx)("li",{parentName:"ul"},"Make sure to test your actions on Photoshop, with several different input/images. If it has any errors on Photoshop, it won't run successfully on our servers either.")),(0,i.mdx)("h3",{id:"known-limitations"},"Known Limitations"),(0,i.mdx)("p",null,"The following are known limitations for the Alpha release"),(0,i.mdx)("ul",null,(0,i.mdx)("li",{parentName:"ul"},"Not supported, 3D and Video features"),(0,i.mdx)("li",{parentName:"ul"},"Custom presets (for example color swatches and brushes)"),(0,i.mdx)("li",{parentName:"ul"},"The action should operate on one document.  Multiple documents support will be in a future release")),(0,i.mdx)("p",null,"Here are examples of submitting and executing Photoshop Actions.\n",(0,i.mdx)("a",{parentName:"p",href:"#sample-71---play-all-actions-in-atn-file"},"Execute Photoshop Actions")),(0,i.mdx)("h2",{id:"rendering--conversions"},"Rendering / Conversions"),(0,i.mdx)("ul",null,(0,i.mdx)("li",{parentName:"ul"},"Create a new PSD document"),(0,i.mdx)("li",{parentName:"ul"},"Create a JPEG, TIFF or PNG rendition of various sizes"),(0,i.mdx)("li",{parentName:"ul"},"Request thumbnail previews of all renderable layers"),(0,i.mdx)("li",{parentName:"ul"},"Convert between any of the supported filetypes (PSD, JPEG, TIFF, PNG)")),(0,i.mdx)("p",null,"Here is an example of creating JPEG and PNG rendtions of a PSD document.\n",(0,i.mdx)("a",{parentName:"p",href:"#sample-41-a-single-file-input"},"Render PSD document")),(0,i.mdx)("h2",{id:"layer-level-edits"},"Layer level edits"),(0,i.mdx)("ul",null,(0,i.mdx)("li",{parentName:"ul"},"General layer edits",(0,i.mdx)("ul",{parentName:"li"},(0,i.mdx)("li",{parentName:"ul"},"Edit the layer name"),(0,i.mdx)("li",{parentName:"ul"},"Toggle the layer locked state"),(0,i.mdx)("li",{parentName:"ul"},"Toggle layer visibility"),(0,i.mdx)("li",{parentName:"ul"},"Move or resize the layer via it's bounds"),(0,i.mdx)("li",{parentName:"ul"},"Delete layers"))),(0,i.mdx)("li",{parentName:"ul"},"Adjustment layers",(0,i.mdx)("ul",{parentName:"li"},(0,i.mdx)("li",{parentName:"ul"},"Add or edit an adjustment layer. The following types of adjustment layers are currently supported:"),(0,i.mdx)("li",{parentName:"ul"},"Brightness and Contrast"),(0,i.mdx)("li",{parentName:"ul"},"Exposure"),(0,i.mdx)("li",{parentName:"ul"},"Hue and Saturation"),(0,i.mdx)("li",{parentName:"ul"},"Color Balance"))),(0,i.mdx)("li",{parentName:"ul"},"Image/Pixel layers",(0,i.mdx)("ul",{parentName:"li"},(0,i.mdx)("li",{parentName:"ul"},"Add a new pixel layer, with optional image"),(0,i.mdx)("li",{parentName:"ul"},"Swap the image in an existing pixel layer"))),(0,i.mdx)("li",{parentName:"ul"},"Shape layers",(0,i.mdx)("ul",{parentName:"li"},(0,i.mdx)("li",{parentName:"ul"},"Resize a shape layer via it's bounds")))),(0,i.mdx)("h3",{id:"the-add-edit-and-delete-objects"},"The add, edit and delete objects"),(0,i.mdx)("p",null,"The ",(0,i.mdx)("inlineCode",{parentName:"p"},"/documentOperations")," API should primarily be used to make layer and/or document level edits to your PSD and then generate new renditions with the changes. You can pass in a flat array of only the layers that you wish to act upon, in the ",(0,i.mdx)("inlineCode",{parentName:"p"},"options.layers")," argument of the request body.\nThe layer name (or the layer id) will be used by the service to identify the correct layer to operation upon in your PSD."),(0,i.mdx)("p",null,"The ",(0,i.mdx)("inlineCode",{parentName:"p"},"add"),", ",(0,i.mdx)("inlineCode",{parentName:"p"},"edit"),", ",(0,i.mdx)("inlineCode",{parentName:"p"},"move")," and ",(0,i.mdx)("inlineCode",{parentName:"p"},"delete")," blocks indicate the action you would like to be taken on a particular layer object. Any layer block passed into the API that is missing one of these attributes will be ignored.\nThe ",(0,i.mdx)("inlineCode",{parentName:"p"},"add")," and ",(0,i.mdx)("inlineCode",{parentName:"p"},"move")," blocks must also supply one of the attributes ",(0,i.mdx)("inlineCode",{parentName:"p"},"insertAbove"),", ",(0,i.mdx)("inlineCode",{parentName:"p"},"insertBelow"),", ",(0,i.mdx)("inlineCode",{parentName:"p"},"insertInto"),", ",(0,i.mdx)("inlineCode",{parentName:"p"},"insertTop")," or ",(0,i.mdx)("inlineCode",{parentName:"p"},"insertBottom")," to indicate where you want to move the layer to. More details on this can be found in the API documentation."),(0,i.mdx)("p",null,(0,i.mdx)("strong",{parentName:"p"},"Note"),": Adding a new layer does not require the ID to be included, the service will generate a new layer id for you."),(0,i.mdx)("p",null,"Here are some examples of making various layer level edits."),(0,i.mdx)("ul",null,(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("a",{parentName:"li",href:"#sample-31-making-a-simple-edit"},"Layer level editing")),(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("a",{parentName:"li",href:"#sample-34-adding-a-new-adjustment-layer"},"Adding a new Adjustment Layer")),(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("a",{parentName:"li",href:"#sample-35-editing-the-image-in-a-pixel-layer"},"Editing Image in a Pixel Layer"))),(0,i.mdx)("h2",{id:"document-level-edits"},"Document level edits"),(0,i.mdx)("ul",null,(0,i.mdx)("li",{parentName:"ul"},"Crop a PSD"),(0,i.mdx)("li",{parentName:"ul"},"Resize a PSD")),(0,i.mdx)("h2",{id:"artboards"},"Artboards"),(0,i.mdx)("ul",null,(0,i.mdx)("li",{parentName:"ul"},"Show artboard information in the JSON Manifest"),(0,i.mdx)("li",{parentName:"ul"},"Create a new artboard from multiple input psd's")),(0,i.mdx)("h2",{id:"compatibility-with-photoshop-versions"},"Compatibility with Photoshop versions"),(0,i.mdx)("ol",null,(0,i.mdx)("li",{parentName:"ol"},"The API’s will open any PSD created with Photoshop 1.0 through the current release and this will always be true."),(0,i.mdx)("li",{parentName:"ol"},"When saving as PSD, the API’s will create PSD’s compatible with the current shipping Photoshop."),(0,i.mdx)("li",{parentName:"ol"},"In regards to “maximize compatibility” referenced in ",(0,i.mdx)("a",{parentName:"li",href:"https://helpx.adobe.com/photoshop/using/file-formats.html#maximize_compatibility_for_psd_and_psb_files"},"https://helpx.adobe.com/photoshop/using/file-formats.html#maximize_compatibility_for_psd_and_psb_files"),"  the API's default to “yes”")))}m.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-features-photoshop-supported-features-index-md-6caf77f3189c238970f4.js.map