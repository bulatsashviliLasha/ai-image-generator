import * as dotenv from "dotenv";
dotenv.config();

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});

const openai = new OpenAIApi(configuration);

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/dream", async (req, res) => {
  try{
    const prompt = req.body.prompt;
    const airResponse = await openai.createImage({
      prompt,
      n:1,
      size: '1024x1024'
    })

    const image = airResponse.data.data[0].url;
    res.send({image})
  }catch (e) {
    console.error(e)
    res.status(500).send(e?.response.data.error.message || 'Something went wrong')
  }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`serving is running on port ${PORT}`))
