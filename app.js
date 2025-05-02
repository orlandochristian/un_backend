const express = require("express");
const cors = require("cors");
const dashboard = require("./controllers/dashboardController.js");
const embeddings = require("./controllers/embeddingsController.js");
const bmci = require("./controllers/bmciController.js");


const app = express();
app.use(cors())
app.use(express.json());

app.get("/", (req,res) => {
    res.send("Welcome to UN Back-End")
})


app.use("/embeddings",embeddings) 
app.use("/dashboard",dashboard)
app.use("/bmci",bmci)

app.get("*",(req,res) => {
    res.status(404).json({"error": "page Not Found"})
})


module.exports = app;
