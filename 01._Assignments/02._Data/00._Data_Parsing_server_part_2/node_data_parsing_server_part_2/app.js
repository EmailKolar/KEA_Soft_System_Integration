import express from "express";
import fs from "node:fs";
import xml2js from "xml2js";
import yaml from "js-yaml";
import fastcsv from "fast-csv";

const app = express();
const PORT = 8080;

app.listen(PORT, () => console.log("Server running on port:", PORT));

app.get("/", (req, res) => {
    res.send({ data: "Express file parser server" });
});

// Function to read and return file data
function readFile(path, callback) {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
}

// Endpoint for text files
app.get("/txt", (req, res) => {
    readFile("./data/data.txt", (err, data) => {
        if (err) return res.status(500).send("Error reading file");
        res.send({ content: data });
    });
});

// Endpoint for XML files
app.get("/xml", (req, res) => {
    readFile("./data/data.xml", (err, data) => {
        if (err) return res.status(500).send("Error reading file");
        const parser = new xml2js.Parser();
        parser.parseString(data, (err, result) => {
            if (err) return res.status(500).send("Error parsing XML");
            res.json(result);
        });
    });
});

// Endpoint for JSON files
app.get("/json", (req, res) => {
    readFile("./data/data.json", (err, data) => {
        if (err) return res.status(500).send("Error reading file");
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (err) {
            res.status(500).send("Error parsing JSON");
        }
    });
});

// Endpoint for YAML files
app.get("/yaml", (req, res) => {
    readFile("./data/data.yaml", (err, data) => {
        if (err) return res.status(500).send("Error reading file");
        try {
            const yamlData = yaml.load(data);
            res.json(yamlData);
        } catch (err) {
            res.status(500).send("Error parsing YAML");
        }
    });
});

// Endpoint for CSV files
app.get("/csv", (req, res) => {
    readFile("./data/data.csv", (err, data) => {
        if (err) return res.status(500).send("Error reading file");
        const rows = [];
        fastcsv
            .parseString(data, { headers: true })
            .on("data", (row) => rows.push(row))
            .on("end", () => res.json(rows));
    });
});
