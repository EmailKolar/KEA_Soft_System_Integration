const fs = require('node:fs');

fs.readFile("./data/data.txt",'utf-8',(err, data) =>{
    if(err){
        console.error(err);
        return;
    }
    console.log(data)
})