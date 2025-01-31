01a._Data_parsing_server_Part_I ---- Node

 <https://github.com/anderslatif/Kea_SOFT_System_Integration_2025_Spring/blob/main/00._Course_Material/01._Assignments/01._Introduction_Data_Formats/01a._Data_parsing_server_Part_I.md> 


Install libraries:

Json er indbygget, 
, npm install fast-csv
, npm install js-yaml
, npm install xml2js

script

    1. Read file

        a. https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs 

    2. Parse File

        a. Json: JSON.parse(data)
    
        b. Xml: https://www.npmjs.com/package/xml2js 
    
            i. Vi skal bruge console.dir med en defineret depth for at printe fordi Node.Js kun går 2 lag ned når der printes xml objekter
    
        c. Yaml: https://www.npmjs.com/package/js-yaml 
    
            i. const yamlData = yaml.load(data); Virker, men der flere andre muligheder at load på
        
