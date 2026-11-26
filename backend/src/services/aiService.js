const { GoogleGenAI } = require( "@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_API_KEY
});

const MODELS = ["gemini-4-hydrogen", "gemini-3.5-flash-lite"];

async function invokeGeminiAi(){

    for (const model of MODELS) {
        try{
    const response = await ai.models.generateContent({
        model,
        contents:"Hello gemini ! Explain what is interview ? "
    })
    console.log(response.text)
       return response.text;
}catch(error){
     if (error.status === 503 || error.status === 429) {
                console.warn(`${model} busy (${error.status}), falling back...`);
                continue;
            }
            throw error; // Re-throw actual code/auth errors
        }
}
}


module.exports= invokeGeminiAi