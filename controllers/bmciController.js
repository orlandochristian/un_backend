const express = require("express");
const db = require("../db/dbConfig.js");
const { GoogleGenerativeAI } = require('@google/generative-ai');

const bmci = express.Router();


// Initialize Google Generative AI
const GEMINI_API_KEY = process.env.APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const embedModel = genAI.getGenerativeModel({ model: "embedding-001" });
// const textModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
const textModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });






// Function to generate embeddings for a text query
async function generateEmbedding(text) {
  try {
    const result = await embedModel.embedContent(text);

    return JSON.stringify(result.embedding.values);
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}


// Function to query the recommendations table with vector similarity search

async function queryVectorDatabase(embedding, limit = 1) {
    // cuando retorna el embedding del text le aplico ------->Json.stringify() 
    // const formattedVector = JSON.stringify(embedding);
    // console.log(embedding)
    // console.log("-----------------paso--------------------------")
    // console.log(formattedVector)
   const query = {
      text: `
        SELECT *,
               (embedding <-> $1) AS resp1
        FROM bmci
        ORDER BY resp1
        LIMIT $2
      `,
      values: [embedding, limit],
    };
    
  
    try {
     const result = await db.any(query);
     
     return result;
    } catch (error) {
       
      //console.error('Error querying vector database:', error);
      throw error;
    }
  }

  // Function to format the retrieved data into context for the LLM
function formatContext(recommendations) {
    // Adjust this function based on your table structure
    let context = 'Here are some relevant recommendations:\n\n';
    
    recommendations.forEach((rec, index) => {
   
      // Assuming your table has title and content fields - adjust as needed
       context += `${index + 1}. ${rec.favorite_season || 'Recommendation ' + (index + 1)}\n`;
       context += `${rec.preferred_activities || rec.location || JSON.stringify(rec)}\n\n`;
    });
    
    return context;
  }

// Function to generate a response using the LLM
async function generateResponse(question, context) {
    try {
      const prompt = `
      Question: ${question}
  
      Based on the following information:
      ${context}
  
      Please provide a helpful answer to the question, if you dont find an answer please don't invent it
      `;
  
      const result = await textModel.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating LLM response:', error);
      throw error;
    }
  }







bmci.post("/",  async (req,res)=>{
    try {
    const { question } = req.body;
    if (!question) {
        return res.status(400).json({ error: 'Question is required' });
      }
    
      //Step 1: Generate embedding for the user's question
   const embedding = await generateEmbedding(question);  
    
   
    // Step 2: Query vector database for similar content
    const recommendationResults = await queryVectorDatabase(embedding);
     

      //Step 3: Format the retrieved data as context
    const context = formatContext(recommendationResults);

      //  Step 4: Generate response with LLM
    const answer = await generateResponse(question, context);

    


    res.json({ answer });
    }
    catch (error) {
        console.error('Error processing question:', error);
        res.status(500).json({ error: 'An error occurred while processing your question' });
      }


    
   
    

})

module.exports = bmci;