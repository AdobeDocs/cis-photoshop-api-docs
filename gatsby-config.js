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
        title: 'Photoshop API Reference',
        path: '/'
      },
      {
        title: 'Getting Started',
        path: '/getting-started/'
      },
      {
        title: 'Features',
        path: '/features/'
      },
      {
        title: 'Release Notes',
        path: '/release-notes/'
      },
      {
        title: 'API Reference',
        path: '/api/'
      },
      {
        title: 'Support',
        path: '/support/'
      }
    ],
    subPages: [
      {
        title: 'Getting started',
        path: '/getting-started/',
        pages: [
          {
            title: 'FAQ',
            path: '/getting-started/faq/'
          }
        ]
      },
      {
        title: 'Features',
        path: '/features/',
        pages: [
          {
            title: 'Photoshop',
            path: '/features/photoshop/',
            pages: [
              {
                title: 'Supported Features',
                path: '/features/photoshop/supported-features/',
                pages: [
                  {
                    title: 'Supported Fonts',
                    path: '/features/photoshop/supported-features/supported-fonts'
                  }
                ]
              },
              {
                title: 'How to use the APIs',
                path: '/features/photoshop/examples/'
              }
            ]
          },
          {
            title: 'Lightroom',
            path: '/features/lightroom/',
            pages: [
              {
                title: 'How to use the APIs',
                path: '/features/lightroom/examples/'
              }
            ]
          },
          {
            title: 'ImageCutout',
            path: '/features/imagecutout/',
            pages: [
              {
                title: 'How to use the APIs',
                path: '/features/imagecutout/examples/'
              }
            ]
          }
        ]
      }
    ]
  },
  plugins: [`@adobe/gatsby-theme-aio`],
  pathPrefix: process.env.PATH_PREFIX || '/photoshop/photoshop-api-docs-pre-release/'
};
