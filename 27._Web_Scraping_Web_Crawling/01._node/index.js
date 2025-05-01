// import fs from 'fs';

// // const response = await fetch("https://www.proshop.dk/Baerbar")
// // const result = await response.text();
// // fs.writeFileSync("index.html", result);

// import {load} from 'cheerio';
// import { console } from 'inspector';

// const page = await fs.readFileSync("index.html", "utf-8");
// //console.log(page);

// const $ = load(page);


import fs from 'fs';
import { load } from 'cheerio';

const page = fs.readFileSync("index.html", "utf-8");
const $ = load(page);

$("#products [product]").each((index, element) => {
    const name = $(element).find(".site-product-link").text().trim();
    const price = $(element).find(".site-currency-lg").text().trim();
    console.log(name, price);
});