import express from "express";

const app = express();

app.use(express.static('public'));

app.get("/sse",(req,res)=>{
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', "keep-alive");

    res.write(`data: connected to server \n\n`)
    let counter = 0;
    const intervalId = setInterval(() => {
        counter++;
        res.write(`data: Message ${counter}\n\n`);
    }, 2000);

    
    req.on('close', () => {
        clearInterval(intervalId);
        res.end();
    });

});


const PORT = (8000)
app.listen(PORT, ()=>{
    console.log(`app started on port: ${PORT}`)
})