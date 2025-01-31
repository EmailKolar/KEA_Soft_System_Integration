const fs = require('node:fs');
const xml2js = require('xml2js');

/*
fs.readFile("./data/data.txt",'utf-8',(err, data) =>{
    if(err){
        console.error(err);
        return;
    }
    console.log(data)
})*/

function parseDataFile(path){

    let filePathArray = path.split('.');
    let filenameExtension = filePathArray[filePathArray.length-1];


    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }


    switch(filenameExtension){
        case 'txt':{
            
            console.log(data)
            break;
        }
        case 'xml':{
            parser = new xml2js.Parser()
            parser.parseString(data, (err, result)=>{ // vi bruger et callback til at håndtere resultatet når metoden har parset
                if(err){
                    console.error(err)
                }else{
                    console.dir(result, {depth: null}); //se xml2js docs - Node uses util.inspect to convert the object into strings and that function stops after depth=2 which is a bit low for most XML.
                    //console.log(result.people)
                }
            })
          
            break;
        }
        case 'json':{

            const jsonData = JSON.parse(data)
            console.log(jsonData)
            console.log(jsonData.people[0].name)
           
            break;

        }
        case 'yaml':{

            

        }
        default:{
            console.log("file type not supported ;-)")
        }
    }
});

}
parseDataFile('./data/data.xml')