 /*
 *primary file for the api
 *
 * * */

 //dependencies 
const http = require('http')
const url =require('url')
const StringDecoder = require('string_decoder').StringDecoder
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
        const queryStringObject = parsedUrl.query

        //Get the http method:
        const method = req.method.toLowerCase()

        //Get the headers as an object
        const headers = req.headers

        //Send the response
        res.end('hello world\n')
        //Log the request path
        console.log(`Request received with these headers: ` , headers )
        console.log(`Request received on path: ${trimedPath} with method ${method}
        and with this query string parameters `, queryStringObject)
 })
//start the server and have it listen on port 3000
server.listen(3000,()=>{
    console.log(`The server is listening on port 3000 now.`)
})