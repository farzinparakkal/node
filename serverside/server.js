const http = require("http")
const fs = require("fs")
const url = require("url")
port=4000
const queryString=require("querystring")
const {MongoClient, ObjectId}=require("mongodb")
const { error } = require("console")
//connect
const client=new MongoClient('mongodb://127.0.0.1:27017/')

const app = http.createServer(async(req,res)=>{
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
    else if(path.pathname=='/getdonors' && req.method=='GET'){
        const data=await collection.find().toArray()
        const json_data=JSON.stringify(data)
        console.log(json_data);
        res.writeHead(200,{"Content-Type":"text/json"})
        res.end(json_data)
        
    }
    else if(path.pathname=='/delete' && req.method=='DELETE'){
        console.log("..................DELETE......................")

        let body=''
        req.on('data',(chunks)=>{
            body+=chunks.toString()
            console.log(body)
        })
        req.on('end',async()=>{
            let _id=new ObjectId(body)
            console.log(_id)
            await collection.deleteOne({_id}).then(()=>{
                res.writeHead(200,{"Content-Type":"text/plain"})
                res.end("Success")
            }).catch(()=>{
                res.writeHead(200,{"Content-Type":"text/plain"})
                res.end("Failed")
            })
        })

    }
    else if(path.pathname=='/update' && req.method=='PUT'){
        let body=''
        req.on('data',(chunks)=>{
            body+=chunks.toString()
        })
        req.on('end',async()=>{
            let data=JSON.parse(body)
            let _id=new ObjectId(data.id)

            let updateData={name:data.name,email:data.email,phone:data.phone,blood:data.blood,genter:data.genter}
            await collection.updateOne({_id},{$set:updateData}).then(()=>{
                console.log("update success")
                res.writeHead(200,{"Content-Type":"text/plain"})
                res.end("Success")
            }).catch((error)=>{
                console.log(error)
                res.writeHead(404,{"Content-Type":"text/plain"})
                res.end("fail")
            })
        })
    }
})
app.listen(port)