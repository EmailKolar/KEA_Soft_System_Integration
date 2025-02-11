import express from 'express'

const app = express();


app.get("/", (req,res)=>{
    res.send({data: "root route"})
})

app.get("/greetings",(req,res)=>{
    res.send({data: "Hello Friendo"})
})


const PORT = 8080;
app.listen(PORT, () => console.log('Server is running on port',PORT));