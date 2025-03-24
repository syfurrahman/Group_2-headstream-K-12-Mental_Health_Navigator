// // server.js
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import fetch from "node-fetch";

// dotenv.config();
// const app = express(); 
// app.use(cors());
// app.use(express.json());

// app.post("/api/chat", async (req, res) => {
//     const userMessage = req.body.message;
  
//     try {
//       const response = await fetch("https://api.x.ai/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.API_KEY}`
//         },
//         body: JSON.stringify({
//           model: "grok-2-latest",
//           temperature: 0.7,
//           stream: false,
//           messages: [
//             { role: "system", content: "You are a helpful assistant." },
//             { role: "user", content: userMessage }
//           ]
//         })
//       });
  
//       const data = await response.json();
  
//       // If something goes wrong, show the raw error
//       if (!data.choices || !data.choices[0]) {
//         console.error("Grok response issue:", data);
//         return res.status(500).json({ error: "Unexpected Grok response format" });
//       }
  
//       const reply = data.choices[0].message.content;
//       res.json({ reply });
//     } catch (err) {
//       console.error("Error connecting to Grok AI:", err);
//       res.status(500).json({ error: "Grok AI request failed" });
//     }
//   });
import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = 'your_mongodb_connection_string';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let surveyStructure;
let pageLinks;

fs.readFile('./server/survey.json', 'utf8', (err, data) => {
  if (err) throw err;
  surveyStructure = JSON.parse(data);
});

fs.readFile('./server/pageLinks.json', 'utf8', (err, data) => {
  if (err) throw err;
  pageLinks = JSON.parse(data);
});

client.connect(err => {
  if (err) throw err;
  const db = client.db('surveyDB');
  const responsesCollection = db.collection('responses');

  app.post('/submit-survey', async (req, res) => {
    const { answers, openEndedResponses } = req.body;

    // Store the survey responses in MongoDB
    const response = {
      answers,
      openEndedResponses,
      timestamp: new Date()
    };

    await responsesCollection.insertOne(response);

    // Tally the page IDs
    const pageIdCounts = {};
    answers.forEach(answer => {
      answer.pageIds.forEach(pageId => {
        if (!pageIdCounts[pageId]) {
          pageIdCounts[pageId] = 0;
        }
        pageIdCounts[pageId]++;
      });
    });

    // Find the page ID with the highest count
    const mostFrequentPageId = Object.keys(pageIdCounts).reduce((a, b) => pageIdCounts[a] > pageIdCounts[b] ? a : b);

    // Get the corresponding URL for the most frequent page ID
    const redirectUrl = pageLinks[mostFrequentPageId];

    res.json({ redirectUrl });
  });

  app.get('/survey-structure', (req, res) => {
    res.json(surveyStructure);
  });

  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
});