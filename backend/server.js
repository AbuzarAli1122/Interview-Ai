require('dotenv').config();

const app = require('./src/app');
const connectToDb = require('./src/config/db');
const invokeGeminiAi = require('./src/services/aiService');

connectToDb()
invokeGeminiAi()
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 