# Adobe I/O Documentation Template

This is a Gatsby site template built with [Adobe I/O Gatsby Theme](https://github.com/adobe/gatsby-theme-aio).

View the [demo](https://adobedocs.github.io/dev-site-documentation-template/) running on Github Pages.  

## Where to ask for help

The slack channel #adobeio-onsite-onboarding is our main point of contact for help. Feel free to join the channel and ask any questions.

## How to develop

For local development
Open a terminal at the root of your local cis-photoshop-api-doc project/site and run the following command:

Run
```
yarn install
yarn dev
```

If you have a M1 mac. You need to install vips before `yarn install`. Run
```
brew install vips
```

Make sure to run lint locally before you check-in
```
npx @redocly/cli@latest lint static/swagger.json --extends minimal --format json --lint-config=off
```
Fix any lint errors before checking-in

To clean up any cache

```
yarn clean && yarn cache clean && rm -rf node_modules && rm package-lock.json && rm yarn.lock
```
If you remove `yarn.lock`, make sure to create an empty `yarn.lock` file at the root of your local cis-photoshop-api-doc project after clean up and run `yarn install`


To see the changes reflected locally, point the `swagger.json` to your local

```
Modify src/pages/api/index.md to point openAPISpec to your local swagger.json
openAPISpec: /swagger.json
```

For the documentation developer, please read these sections on how to:
- [Arrange the structure content of your docs](https://github.com/adobe/gatsby-theme-aio#content-structure)
- [Linking to pages](https://github.com/adobe/gatsby-theme-aio#links)
- [Using assets](https://github.com/adobe/gatsby-theme-aio#assets)
- [Setting Global Navigation](https://github.com/adobe/gatsby-theme-aio#global-navigation)
- [Setting Side Navigation](https://github.com/adobe/gatsby-theme-aio#side-navigation)
- [Using content blocks](https://github.com/adobe/gatsby-theme-aio#jsx-blocks)
- [Notes on using Markdown](https://github.com/adobe/gatsby-theme-aio#writing-enhanced-markdown)

For more in-depth [instructions](https://github.com/adobe/gatsby-theme-aio#getting-started).

## How to deploy

For any team that wishes to deploy to the adobe.io and stage.adobe.io website, they must be in contact with the dev-site team. Teams will be given a path that will follow the pattern `adobe.io/{product}/`. This will allow doc developers to setup their subpaths to look something like:
```
adobe.io/{product}/docs
adobe.io/{product}/community
adobe.io/{product}/community/code_of_conduct
adobe.io/{product}/community/contribute
```

### Launching a deploy

You can deploy using the GitHub actions deploy workflow see [deploy instructions](https://github.com/adobe/gatsby-theme-aio#deploy-to-azure-storage-static-websites).

## How to file an issue (for customers)
For issues, bugs, questions, or feedback please file a ticket by submitting a form at https://psd-services.zendesk.com/hc/en-us/requests/new
