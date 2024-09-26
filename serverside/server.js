const http = require("http")
const fs = require("fs")
const url = require("url")
port=4000

const app = http.createServer((req,res)=>{
    const path=url.parse(req.url)
    console.log(path);

    if(path.pathname=="/"){
        res.writeHead(200,{"Content-Type":"text/html"})
        res.end(fs.readFileSync("../clientside/index.html"))
    }
    else if(path.pathname=='/css/index.css'){
        res.writeHead(200,{"Content-Type":"text/css"})
        res.end(fs.readFileSync("../clientside/css/index.css"))
    }
    else if(path.pathname=='/js/index.js'){
        res.writeHead(200,{"Content-Type":"text/js"})
        res.end(fs.readFileSync("../clientside/js/index.js"))
    }
    else if(path.pathname=="/donor"){
        res.writeHead(200,{"Content-Type":"text/html"})
        res.end(fs.readFileSync("../clientside/pages/donor.html"))
    }
    else if(path.pathname=='/css/donor.css'){
        res.writeHead(200,{"Content-Type":"text/css"})
        res.end(fs.readFileSync("../clientside/css/donor.css"))
    }
    else if(path.pathname=='/js/donor.js'){
        res.writeHead(200,{"Content-Type":"text/js"})
        res.end(fs.readFileSync("../clientside/js/donor.js"))
    }
})
app.listen(port)