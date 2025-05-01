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

const getDiplomatsByAreaId = async (id) => {
   
    try {
       
        const diplomatsByArea = await db.any(
            `SELECT a.areaname,a.descripcion a_desc,a.assistant,d.id,d.titular,d.back_up,d.descripcion d_desc FROM areas a join diplomats d  on(a.id=d.area_id) WHERE a.id=$1 and d.visible is TRUE`, [id]
        );
       
        return { diplomatsByArea  };
    } catch (error) {
        return { error: error };
    }
};

const getOfficessByDiploId = async (id) => {
   
    try {
       
        const officesByDiplo = await db.any(
            `SELECT * from offices where diplomat_id=$1 and visible is TRUE`, [id]
        );
       
        return {officesByDiplo  };
    } catch (error) {
        return { error: error };
    }
};



module.exports = {
    getAllareas,
    getAllareasavailables,
    getDiplomatsByAreaId,
    getOfficessByDiploId,

}