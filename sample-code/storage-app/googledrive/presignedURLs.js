/*
Google Drive API:
Demonstration to:create public URL of a file.

Instructions to run
npm install
./presignedURLs.js

service-account.json is a generated file by google drive autorizarion. We have attached a sample example
*/
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const request1 = require('request')
const followRedirect = require('follow-redirect-url');

const KEYFILEPATH = path.join(`./service-account.json`);
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const drive = google.drive({
  version: 'v3',
  auth,
});

async function generatePresignedUrl() {
  try {
    const fileId = 'YOUR FILE ID';
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });
    const result = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink, webContentLink',
    });
    followRedirect.startFollowing(result.data.webContentLink).then(urls => {
        //Printing out just to give the details
        console.log(urls);
        //Copy this url and put it in Photoshop API payload as input asset
        console.log(urls[1].url);
      }).catch(error => {
      console.log(error)
    })
  } catch (error) {
    console.log(error.message);
  }
}
generatePresignedUrl();
