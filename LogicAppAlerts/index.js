
// Provide source for secrets to env variables, if you are testing manually with Logic Apps. Never sync these Keys to Github... :) 
 /*   if (!process.env['website_hostname']) { 
      console.log('using local env variables')
      process.env['AZURE_STORAGE_CONNECTION_STRING'] = ""
      process.env['o365Webhook'] = ""
    } */


 //Load teams extension before init
 var {sendToTeams2} =require(`${__dirname}/src/teamsFunction`)

 var KeyVaultReferenceFound = Object.keys(process.env).find((key) => {
  //console.log(key == 'AZURE_STORAGE_CONNECTION_STRING')
    return key == 'AZURE_STORAGE_CONNECTION_STRING'
 });console.log(KeyVaultReferenceFound)

module.exports =  async function (context, data) {
//Tro to initialize storage before continuing with the function
try { var {getSasUrl} =require(`${__dirname}/src/storageAccess`)
}  catch (error) {
 //return 400, so to stop Logic App from retrying
    var result = `${error}`
    return context.res = {
      status:400,
      body: {
        result,
        reason:'Ensure KeyVault reference is correct for Azure Storage found:' + KeyVaultReferenceFound,
      }
      
    };

  }

// looking for inbound property 'storagemetadata' from the LogicApps pipeline. This is used for the export functionality 
  try {

    var containername = (data.body.storagemetadata.Path.split('/')[1])
    var blobnm = data.body.storagemetadata.Path.split('/')[2]
    var SASURL = getSasUrl(blobnm,containername)
    //console.log(SASURL)
  } 

  catch (error) {
  
    var result = `${error}`

    return context.res = {
      status:400,
      body: {
        result
      }
      
    };

  }

  var req = await sendToTeams2(data.body.asc,SASURL)
    .catch((error) => {
  
  console.log('catched error',error)

    context.res = {
        status:400,
        body: {
          error
        }
      };
      //have to force callback to context.done() even though this running in async, the return was not respected (maybe its due to mix of synchronous and asynchronous inside the teamsFunction), and the below success response would be run.
      context.done()
    })

  console.log('this came from Teams',req)

    context.res = {
      body: {
        result:"success"
      }
    };
  
  };