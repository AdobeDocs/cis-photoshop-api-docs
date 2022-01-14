//Need to npm install @azure/storage-blob
var storage = require("@azure/storage-blob")
const accountname ="";
const key = "";
const cerds = new storage.StorageSharedKeyCredential(accountname,key);
const blobServiceClient = new storage.BlobServiceClient(`https://${accountname}.blob.core.windows.net`,cerds);
const containerName="test";
const client =blobServiceClient.getContainerClient(containerName)
const blobName="help.txt";
const blobClient = client.getBlobClient(blobName);

const blobSAS = storage.generateBlobSASQueryParameters({
    containerName,
    blobName,
    permissions: storage.BlobSASPermissions.parse("racwd"),
    startsOn: new Date(),
    expiresOn: new Date(new Date().valueOf() + 86400)
  },
  cerds
).toString();

const sasUrl= blobClient.url+"?"+blobSAS;
console.log(sasUrl);
