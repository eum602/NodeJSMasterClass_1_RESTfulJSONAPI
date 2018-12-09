 /*
 *primary file for the api
 *
 * * */

 //dependencies 
const http = require('http')
const url =require('url')
const StringDecoder = require('string_decoder').StringDecoder
const config = require('./config')
//the server should respond to all requests with a string
 //a. create a server object
const server = http.createServer((req,res)=>{
        //Get the url and parse it
        const parsedUrl = url.parse(req.url,true)//true:indicates to parse the query string 
            //which means to set the parsedUrl.query value at the equivalent as if we had
            //sent this data to the query string module, so really we are using two modules
            //in one
        //Get the path
         const path = parsedUrl.pathname//the path of the user request
            //http://localhost:3000/foo...
         const trimedPath = path.replace(/^\/+|\/+$/g,'')

         //Get the query string as an object:
        const queryStringObject = parsedUrl.query //?mnp=abd

        //Get the http method:
        const method = req.method.toLowerCase() //get, post

        //Get the headers as an object
        const headers = req.headers //{foo:bar,fizz:buzz,...}

        //Get the payload, if any is the text: 'fdsfasdfsadfsd'
        const decoder = new StringDecoder('utf-8')//utf-8 is what kind of 
                //charset or encoding it can expect
                //payloads, as part of the http request, come in to the http server  as a string
                //so we need to collect that string as it comes in and then when the string tells
                //us what are the end cover last that into one covering thing before we can
                //figure out what the payload is
        let buffer = ''//string where we are going to append the incoming palyload as it comes
        req.on('data',data=>{
                buffer += decoder.write(data)
        })//when the request emit the event called 'data' (so, ON the event 
                //called data)
        
        req.on('end',()=>{//called regardless if it has a payload or not
                buffer += decoder.end()
                //choose the handler this request should go to. If one is not found use
                //not found handler
                const chosenHandler = typeof(router[trimedPath]) !== 'undefined' ? 
                router[trimedPath] : handlers.notFound
                //contruct the data Object to send to the handler:
                const data = {
                        'trimedPath':trimedPath,
                        'queryStringObject':queryStringObject,
                        'method':method,
                        'headers':headers,
                        'payload':buffer
                }
                //route the request to the handler specified in the router
                chosenHandler(data,(statusCode,payload)=>{
                        console.log(statusCode,payload)//es la data que esta en la 
                        //funcion sample del objeto handler
                        //use the status code  CALLED BACK by the handler or default
                        //to 200
                        statusCode = typeof(statusCode) == 'number' ? statusCode:200
                        //use the payload called back by the handler or default to and
                        //empty object
                        payload = typeof(payload)=='object' ? payload:{}

                        //convert the payload to a string
                        const palyloadString = JSON.stringify(payload)

                        //return the response
                        res.setHeader('content-Type','application/json')//telling ...
                        //that we are going to return an object:
                        //content-Type is the key ; application/json is the value
                        res.writeHead(statusCode)//usin the buil in function that comes on every
                        //response object received by the http server to write the status code

                        //now that the request has finished
                        //Send the response
                        res.end(palyloadString)
                        //Log the request path
                        console.log(`Returning this response` , statusCode , palyloadString)
                })
        })
        //console.log(`Request received with these headers: ` , headers )
        //console.log(`Request received on path: ${trimedPath} with method ${method}
        //and with this query string parameters `, queryStringObject)
})
//start the server
server.listen(config.port,()=>{
    console.log(`The server is listening on port ${config.port} in ${config.envName} mode.`)
})
//define the handlers
const handlers = {}
//sample handler
handlers.sample = (data,callback)=>{
        //callback a http status code and a payload object
        callback(406,{'name':'sample handler'})
}
//Not found handler
handlers.notFound = (data,callback)=>{
        callback(404)//does not need a payload
}
//define a request router
const router = {
        'sample':handlers.sample
}