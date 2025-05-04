const express = require("express");


const dashboard = express.Router();

const {
    getAllareas,
    getAllareasavailables,
    getDiplomatsByAreaId,
    getOfficessByDiploId,

} = require("../queries/areas.js");



dashboard.get("/",  async (req,res)=>{
   
    try {
       
        const { allAreas } = await getAllareas();
        res.send("Welcome to UN Back-End probando")
        //res.status(200).json(allAreas);
     } 
     catch (error) {
        res.status(500).json({ error: error.message });
    }
})

dashboard.get("/available",  async (req,res)=>{
   
    try {
        
        const { allAreasavailables } = await getAllareasavailables();
      
        res.status(200).json(allAreasavailables);
     } 
     catch (error) {
        res.status(500).json({ error: error.message });
    }
})

dashboard.get("/diplomats/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { error, diplomatsByArea } = await getDiplomatsByAreaId(id);
        if (error && error.received === 0) {
            res.status(404).json({ error: "Diplomats Not Found, Check Diplo ID And Try Again" });
        } else if (error) {
            throw new Error("Server Error");
        } else {
            res.status(200).json(diplomatsByArea);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  })

  dashboard.get("/offices/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { error, officesByDiplo } = await getOfficessByDiploId(id);
        if (error && error.received === 0) {
            res.status(404).json({ error: "Offices Not Found, Check Diplo ID And Try Again" });
        } else if (error) {
            throw new Error("Server Error");
        } else {
            res.status(200).json(officesByDiplo);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  })






module.exports = dashboard;