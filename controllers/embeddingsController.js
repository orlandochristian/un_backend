const express = require("express");
const embeddings = express.Router({ mergeParams: true });
const { GoogleGenerativeAI } = require('@google/generative-ai');

 const APP_GEMINI_API_KEY = process.env.APP_GEMINI_API_KEY;

// Initialize Google AI
const genAI = new GoogleGenerativeAI(APP_GEMINI_API_KEY); // Replace with your API key
const embedModel = genAI.getGenerativeModel({ model: "embedding-001" });

const {
    createBMCI,

} = require("../queries/bmci.js");


async function generateEmbedding(text) {
    
    try {
      const result = await embedModel.embedContent(text);
      const embedding = result.embedding.values;
      return embedding;
    } catch (error) {
      console.error('Error generating embedding:', error);
      throw error;
    }
  }


embeddings.post("/bmci/:id",  async (req,res)=>{
    const {id} = req.params
    const {embedding} = req.body
   
 

    try {
       
        const textForEmbedding = `
        ${embedding.book_name ? `book Name:${embedding.book_name}` : ''},
        ${embedding.chapter ? `chapter:${embedding.chapter}` : ''}, 
        article title: ${embedding.titulo_articulo},
        text: ${embedding.articulo},
        author: ${embedding.autor},
        authorized by: ${embedding.authorizedby}
      `.trim();

      // Generate embedding
      const generatedEmbedding = await generateEmbedding(textForEmbedding);
     
        const { createdOneBMCI } = await createBMCI(id,embedding,generatedEmbedding);      
      
        res.status(200).json( createdOneBMCI);
       
     } 
     catch (error) {
        res.status(500).json({ error: error.message });
    }
})









module.exports = embeddings;