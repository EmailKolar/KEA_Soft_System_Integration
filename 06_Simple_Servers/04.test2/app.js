import express from "express"

const app = express();

app.get("/",(req,res)=>{
    res.send({data: "indi"})
})


app.listen(8080)