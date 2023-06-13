/*
Google Drive API:
Demonstration to:create public URL of a file.

Instructions to run
npm install
node presignedURLs.js

service-account.json is a generated file by google drive autorizarion. We have attached a sample example
Photoshoshop APIs don't support redirect . So you need to use redirected url (line 42)
*/
const { google } = require('googleapis');
const fs = require('fs');
const followRedirect = require('follow-redirect-url');

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const SERVICE_ACCOUNT_FILE = './service-account.json';

async function getFileUrl(fileId) {
  const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: SCOPES,
  });

  const drive = google.drive({ version: 'v3', auth });

  try {
    const res = await drive.files.get({ fileId, fields: 'webContentLink' });
    return res.data.webContentLink;
  } catch (error) {
    console.error('An error occurred:', error.message);
    return null;
  }
}

async function main() {
  const fileId = 'your-file-id-goes-here';
  const fileUrl = await getFileUrl(fileId);

  if (fileUrl) {
    const redirectlink = await followRedirect.startFollowing(fileUrl)
    console.log('The URL for the file is:', redirectlink[1].url);
  } else {
    console.log('Failed to retrieve the file URL.');
  }
}

main();
