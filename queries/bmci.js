const db = require("../db/dbConfig.js");



const createBMCI = async (id,embedding,generatedEmbedding) => {

   
    try {
       
        const createdOneBMCI = await db.one(
           `INSERT INTO
            bmci(book_name,chapter,titulo_articulo,articulo,autor,authorizedby,area_id,embedding)
            VALUES
             ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING * `,
            [embedding.book_name, embedding.chapter, embedding.titulo_articulo, embedding.articulo, embedding.autor, embedding.authorizedby, id,  generatedEmbedding]
        );
       
        return { createdOneBMCI  };
    } catch (error) {
        return { error: error };
    }
};

module.exports = {
    createBMCI,
   

}