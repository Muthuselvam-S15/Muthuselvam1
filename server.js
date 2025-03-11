const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

// API endpoint to handle requests from the frontend
app.post('/chat', async (req, res) => {
    const userInput = req.body.userInput;
    
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo', // You can switch to 'gpt-4' if needed
            messages: [
                { role: 'user', content: userInput }
            ],
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer YOUR_NEW_API_KEY` // Replace with your new OpenAI API Key
            }
        });

        // Send the response from OpenAI back to the client
        res.json({
            botMessage: response.data.choices[0].message.content
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong with the API call.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
