const db = require("../db/dbConfig.js");

const getAllareas = async () => {
   
    try {
       
        const allAreas = await db.any(
            `SELECT * from areas order by comingsoon`, []
        );
       
        return { allAreas  };
    } catch (error) {
        return { error: error };
    }
};

const getAllareasavailables = async () => {
   
    try {
       
        const allAreasavailables = await db.any(
            `SELECT * from areas where comingsoon is FALSE`, []
        );
       
        return { allAreasavailables  };
    } catch (error) {
        return { error: error };
    }
};

module.exports = {
    getAllareas,
    getAllareasavailables,

}