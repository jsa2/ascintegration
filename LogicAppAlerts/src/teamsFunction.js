
const {anyreq} = require(`${__dirname}/modules`)
const MessageConstructor = require(`${__dirname}/teamsSchemas`)

async function sendToTeams2 (datain,SASURL) { 
    
    return new Promise ((resolve,reject) => {

        var input = datain
        
        var facts = []
        var alert = (input.AlertUri || input.alertUri)
        
        //Replace underscores for mobilelink
        var mobilealert = alert.replace(new RegExp('_', 'g'), '\\_')
      

        facts.push({
                name:'Triage(MobileLink)',
                value:mobilealert
        })

        delete  input.alertUri
        delete  input.alertUri 
        
        
        try {
            
            var reports = JSON.parse(input.extendedProperties['enrichment_tas_threat__reports'])
            
            var va
            var sp = reports.DisplayValueToUrlDictionary
            
            Object.keys(sp).forEach((key) => {
                va = reports.DisplayValueToUrlDictionary[key].toString() //!== null
            })

            
            let reportFacts =  {
                name:'ThreatReportsLink',
                value:`<${va}>`
            }
            
            console.log(reportFacts)
            facts.push(reportFacts)
            
        } catch {
            console.log('no extended reportFiles ')
        }
        
        Object.keys((input)).map((key) => {
            
            try { 
                
                var typ = Object.getPrototypeOf(input[key])
                
                
                if (typ === String.prototype ) {
                    
                    let tempo =  {
                        name:key,
                        value:input[key]
                    }
                    
                    facts.push(tempo)
                    
                }
                
                
            } catch {
                console.log((('unable to get prototype for' + key)))
            }
            
        })
        
        var body2 = MessageConstructor(facts,alert,SASURL)
       
        const uri = process.env['o365Webhook']
        
        var options = {
            method:"POST",
            json:true,
            body:body2,
            uri,
            headers:{
                "content-type":"application/json"
            }
        }
        
        anyreq(options,'body',200).then((response) => {
            console.log(response)
            console.log('checking Teams result', JSON.stringify(response))
            
            return resolve(JSON.stringify(response))
            
        }).catch((error) => {
            console.log('catching this error here!')
            return reject( JSON.stringify(error))
        })
        
        
        
    })
    
}

module.exports={sendToTeams2}


