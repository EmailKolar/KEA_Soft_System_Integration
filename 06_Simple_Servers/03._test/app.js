import express from "express"
const app = express()

app.get("/",(req,res)=>{
    res.send({data:"second express server"})
})

const PORT = 8080;
app.listen(PORT,()=>console.log("server runnning on port: ",PORT))