---
title: Photoshop API Licensing and Billing Metrics
description: Photoshop API Licensing and Billing Metrics
---
# Paid Access to the Photoshop API  
1. Amazon AWS Marketplace: The AWS Marketplace offers users the ability to flexibly purchase access and use the Photoshop API in production. Amazon manages the billing relationship with the end user for usage of the Adobe Photoshop API. The billing data is visible to users within the account management on the AWS Marketplace website.

2. Enterprise Contract via Adobe: Users who sign an enterprise contract for the Photoshop API are billed directly by Adobe and can administer access and rights via the enterprise console.

## What customers are billed for:

1. Users are billed based on API Transactions, where one billable transaction is equal to one successful API call.
2. Definitions:
   - An API transaction is defined as a successful API call to the Photoshop API service.  
   - A successful API call is defined as a 2XX response from the service where the requested output has been successfully generated.   
3. Examples:
   - Example #1: A user makes a single request to the Remove Background API endpoint in order generate an output image and/or   mask = 1 transaction.
   - Example #2: A user makes a call to Remove Background, takes the output image and sends it to the Lightroom API for AutoTone = 2 transactions
   - Example #3:  A user makes a call to the Generate Renditions API to create five outputs of different sizes and types = 1 transaction
   - Example #4: A user makes a call to Photoshop Actions in which multiple PS features are requested in a single action = 1 transaction.

## What will not be billed:
 1. Polling calls to check status of an async call
 2. Failures and Errors (4XX or 5XX response from the service)

## Usage limits
 1. Quota limits:
    - Trial users are limited to the number of calls enumerated on the [pricing page](https://developer.adobe.com/photoshop/api/pricing/)
    - Users subscribed via the AWS Marketplace are billed on a monthly usage-based model
    - Enterprise subscription usage limits are defined contractually on a case-by-case basis
2. Size, Resolution and Throttling Limits:
    - Each API endpoint has its own unique limitations to be aware of. Please see the [API documentation](../api/) for additional details.
