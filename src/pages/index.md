---
title: Overview - Adobe Photoshop API
description: This is the overview page of Adobe Photoshop API
contributors:
  - https://github.com/khound
---

<Hero slots="image, heading, text" background="rgb(64, 34, 138)"/>

![Hero image](./hero.png)

# Adobe Photoshop API

Adobe Photoshop API provides the capability to edit images with Photoshop, Lightroom and Sensei services.

## Welcome to Photoshop API!

The Adobe Photoshop API gives you access to a subset of Photoshop, Lightroom, and Sensei services. The API will allow you to make both layer and document level edits to Photoshop PSD files as well as perform a number of image edits and improvements.

The Photoshop API is designed with REST like principles and uses standard HTTP response codes, verbs and authentication and returns JSON-encoded responses. The examples you see are written in cURL but you can use any language of your choice to interact with the API.

The [Getting started] page will walk you through making your first API call and authenticating your request.

## Public Beta

The Photoshop API is open for free public trials. The trial is currently limited to 5,000 calls in a non production environment.

In order to gain access to the trial please [sign up](https://www.adobe-prerelease.com/sign-up/) here and follow the steps to generate your trial credentials.

Make sure to take a look at the Pre-release agreement and ensure you understand the aspects of the program.

## API Keys

Also known as the `client_id`. You must additionally pass in your Adobe API key in the `x-api-key` header field. You’ll automatically get a developer API key when you create your Adobe I/O Console Integration. After you've created your integration you can find your API key in the `Overview` tab of your Integration

## Authentication

The Photoshop API uses client id’s (also known as api keys) and authentication tokens to authenticate requests. There are two different kinds of authorization tokens available: Internal Adobe user access (OAuth 2.0 access token) Free trial user (Service token using JSON Web Token/JWT) In order to use the Photoshop API's you’ll need to get an API key (also known as a CLIENT ID) and a Client Secret. Once you have those you can use them to programmatically get an access token to authenticate your requests. We’ll walk you through the steps below.

## Retries

- The service will retry status codes of 429, 502, 503, 504 three times.
- You should only retry requests that have a 5xx response code. A 5xx error response indicates there was a problem processing the request on the server.
- You should implement an exponential back-off retry strategy with 3 retry attempts.
- You should not retry requests for any other response code.

## Rate Limiting

We have not put a throttle limit on requests to the API at this time.

## Quota Limits

All free trial users will have 5,000 API calls in order to test and evaluate the API in a non production environment. If for any reason you reach your limit and need to extend your quota please reach out psdservices@adobe.com for more information.

## Support

Please reach out to psdservices@adobe.com or submit a ticket here https://psd-services.zendesk.com/hc/en-us/requests/new for support or feedback.
