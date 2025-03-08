const db = require("../db/dbConfig.js");

const getAllareas = async () => {
   
    try {
       
        const allAreas = await db.any(
            `SELECT * from areas`, []
        );
       
        return { allAreas  };
    } catch (error) {
        return { error: error };
    }
};

module.exports = {
    getAllareas,

}