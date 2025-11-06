import express from 'express';
import bodyParser from 'body-parser';
import db from './mongoC.js';
import cors from 'cors';

const port = 4000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World, from express');
});

app.post('/addUser', async (req, res) => {
  try {
    const collection = db.collection('users');
    const newDocument = { ...req.body, date: new Date() };
    const result = await collection.insertOne(newDocument);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add user' });
  }
});

app.get('/getUsers', async (req, res) => {
  try {
    const collection = db.collection('users');
    const results = await collection.find({}).toArray();
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get users' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at port: ${port}`);
});
