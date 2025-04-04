// Node.js Backend (server.js)
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get('/',(req,res)=>{
  res.send('!hola desde el backend');
})
// Route to proxy requests to Rasa
app.post('/message', async (req, res) => {
  try {
    const { message, sender } = req.body;
    
    // Send message to Rasa server
    const rasaResponse = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
      sender: sender,
      message: message
    });
    
    // Return Rasa's response
    res.json({
      success: true,
      response: rasaResponse.data
    });
  } catch (error) {
    console.error('Error communicating with Rasa:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to communicate with the chatbot service'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
