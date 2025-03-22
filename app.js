const express = require("express");
const cors = require("cors");
const dashboard = require("./controllers/dashboardController.js");
const embeddings = require("./controllers/embeddingsController.js");

const app = express();
app.use(cors())
app.use(express.json());

app.get("/", (req,res) => {
    res.send("Page not Found")
})

app.use("/dashboard",dashboard)
app.use("/embeddings",embeddings)


module.exports = app;
