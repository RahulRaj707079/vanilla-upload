import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const httpServer = http.createServer();

httpServer.on('listening',()=>console.log(`Server is listening`))

const clientPath = path.resolve(__dirname,'client','index.html');
// console.log(clientPath);
const homePage = fs.readFileSync(clientPath)

const storePath = path.resolve(__dirname,'assets');
httpServer.on('request',(req,res)=>{

    if(req.url === '/'){
        console.log('file recieved');
        res.end(homePage);
    }

    if(req.url === '/upload'){
        const recievedFileName = req.headers["file-name"];
        req.on("data", chunk =>{
            fs.appendFileSync(path.resolve(storePath,recievedFileName),chunk);
            console.log(`recieved chunk size: ${chunk.length}`)
        })
        res.end(`Uploaded`)
    }
})

httpServer.listen(8080,()=>console.log(`On`))
