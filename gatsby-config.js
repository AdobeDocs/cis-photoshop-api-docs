/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

module.exports = {
  siteMetadata: {
    pages: [
      {
        title: 'Overview',
        path: '/'
      },
      {
        title: 'Getting Started',
        path: '/getting-started/'
      },
      {
        title: 'General Workflow',
        path: '/general-workflow/'
      },
      {
        title: 'Features',
        path: '/features/'
      },
      {
        title: 'Code Samples',
        path: '/code-sample/'
      },
      {
        title: 'API Reference',
        path: '/api/'
      },
      {
        title: 'Support',
        menu:[{
          title: 'Submit a ticket',
          path: 'https://psd-services.zendesk.com/hc/en-us/requests/new'
        }, {
          title: 'Community Forums',
          path: 'https://community.adobe.com/t5/photoshop-developers/ct-p/ct-photoshop-developers?page=1&sort=latest_replies&lang=all&tabid=all&topics=label-psautomationapi'
        }]
      }
    ],
    subPages: [
      {
        title: 'Getting Started',
        path: '/getting-started/'
      },
      {
        title: 'General Workflow',
        path: '/general-workflow/'
      },
      {
        title: 'Features',
        path: '/features/'
      },
      {
        title: 'Code Samples',
        path: '/code-sample/'
      }
    ]
  },
  plugins: [`@adobe/gatsby-theme-aio`],
  pathPrefix: process.env.PATH_PREFIX || '/photoshop/photoshop-api-docs/'
};
