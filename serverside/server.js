const http = require("http")
const fs = require("fs")
const url = require("url")
port=4000
const queryString=require("querystring")
const {MongoClient}=require("mongodb")
const { error } = require("console")
//connect
const client=new MongoClient('mongodb://127.0.0.1:27017/')

const app = http.createServer((req,res)=>{
    //DATABASE
    const db=client.db("DONOR")

    //COLLECTION
    const collection=db.collection('bloodbank')

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
    else if(path.pathname=='/submit'&&req.method=="POST"){
        console.log("hai");
        let body=''
        req.on("data",(chunks)=>{
            console.log(chunks);
            body+=chunks.toString()
            console.log(body);
        })
        req.on("end",async()=>{
            if(body!=null){
                const formData=queryString.parse(body)
                console.log(formData);
                collection.insertOne(formData).then(()=>{
                    console.log("data added");
                }).catch((error)=>{
                    console.log(error);
                })
                res.writeHead(200,{"Content-Type":"text/html"})
                res.end(fs.readFileSync("../clientside/index.html"))
            }
        })
    }
})
app.listen(port)