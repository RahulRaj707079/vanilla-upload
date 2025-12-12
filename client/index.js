const btnUpload = document.querySelector('#btnUpload');
const progressBar = document.querySelector('.progressBar');
const filesUpload = document.querySelector('#file');



function sendChunkedData(chunk,backedFileName){
    return {
        "method":"POST",
        "headers":{
            "content-type":"application/octet-stream",
            "content-length":chunk-length,
            "file-name":backedFileName
        },
        "body":chunk
    }
}

btnUpload.addEventListener('click',()=>{
    const fileReader = new FileReader();
    const file = filesUpload.files[0];

    

    fileReader.onload = async ev=>{
        console.log(`successfull Read...`);
        const backedFileName = Math.random()*1000 + file.name;
        const CHUNK_SIZE = 1000;
        const CHUNK_COUNT = ev.target.result.byteLength/CHUNK_SIZE;
        console.log(CHUNK_COUNT);
        for(let chunkID = 0; chunkID<CHUNK_COUNT+1;chunkID++){
            const chunk = ev.target.result.slice(chunkID*CHUNK_SIZE,chunkID*CHUNK_SIZE+ CHUNK_SIZE);
            await fetch(`http://localhost:8080/upload`,{
                "method":"POST",
                "headers":{
                    "content-type":"application/octet-stream",
                    "content-length":chunk.length,
                    "file-name":backedFileName
                },
                "body":chunk
            });
        }
    }
    fileReader.readAsArrayBuffer(file);
})