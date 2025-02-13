import express from "express";
const app = express();

app.get("/expressData",(req,res)=>{
    res.send({data: "This is the data form Express"})

});

app.get("/requestFastAPIData", async (req,res)=>{
    const route = "http://127.0.0.1:8000/fastapiData"
    const route2 = "http://localhost:8000/fastapiData"
    const response = await fetch(route)
    const result = await response.json();
    res.send({data: result.data})
    
})


app.get("/names/:name",(req,res)=>{
    console.log(req.params.name);
    res.send({data: `Your name is${req.params.name}`})
})


app.get("/artist/:name",(req,res)=>{
    res.send({data:`Your favorite artist is: ${req.params.name}`})
})

app.get("/pokemon/:name",async (req,res)=>{
    const { name } = req.params;
    const route = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;

    try {
        const response = await fetch(route);

        if (!response.ok) {
            return res.status(404).send({ error: "Pokémon not found" });
        }

        const result = await response.json();
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});




const PORT = 8080;
app.listen(PORT, () => console.log('Server is running on port',PORT));