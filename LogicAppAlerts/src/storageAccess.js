
const {createBlobService,BlobUtilities} = require('azure-storage')
const blobsvc = createBlobService()
var accountName = process.env['AZURE_STORAGE_CONNECTION_STRING'].split("AccountName=")[1].split(";")[0]

console.log(accountName)

function getSasUrl (name,container) {
    var startDate = new Date();
    var expiryDate = new Date(startDate.setHours(+120));
    startDate.setHours(-120)
    
    var sharedAccessPolicy = {
        AccessPolicy: {
          Permissions: BlobUtilities.SharedAccessPermissions.READ,
          Start: startDate,
          Expiry: expiryDate
        }
      };
    
      var sas = blobsvc.generateSharedAccessSignature(container,name,sharedAccessPolicy)
     
      var url = blobsvc.getUrl(container,name,sas)
     // console.log(url)
    
       return url
   
    
    }
    
    module.exports={getSasUrl}