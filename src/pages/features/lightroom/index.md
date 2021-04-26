---
title: Features in ImageCutout Service
description: Learn about the available features in ImageCutout Service.
---

## Overview

The Adobe Lightroom APIs allow you to make Lightroom-like automated edits to image files.

## General Workflow

The typical workflow involves making an API POST call to the endpoint https://image.adobe.io/lrService/ for which the response will contain a link to check the status of the asynchronous job. Making a GET call to this link will return the status of the job and, eventually, the links to your generated output.
