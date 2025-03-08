const express = require("express");


const dashboard = express.Router();

const {
    getAllareas,

} = require("../queries/areas.js");



dashboard.get("/",  async (req,res)=>{

    try {
       
        const { allAreas } = await getAllareas();
      
        res.status(200).json(allAreas);
     } 
     catch (error) {
        res.status(500).json({ error: error.message });
    }
})







module.exports = dashboard;