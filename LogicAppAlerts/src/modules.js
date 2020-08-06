
var rq = require('request')

function anyreq (options,successKey,desiredStatusCode) {

    return new Promise ((resolve,reject) => {

            rq(options, (error,response) => {
                //console.log(options)
            console.log('something')
                if (error) {
                    console.log(error)
                    return reject (JSON.stringify(error))
                }

                if (response.statusCode !== 200) {
                    return reject (JSON.stringify(`got ${response.statusCode }, requested statusCode ${desiredStatusCode}`))
                }

                Object.keys(response).filter((key) => {
                   
                    if (key == successKey)  {
                        console.log('found',successKey)
                        if (response.body.error) {return reject(response.body.error)} 
                        else if (response.body) {
                            return resolve(`body:${response.body}, statuscode:${desiredStatusCode}`)} 
                        else {
                            console.log('no body key, returning statuscode')
                            return resolve (response.statusCode)
                        }
                    }
                    
                })
               
             }

            )
    })

}



module.exports = {
anyreq
}