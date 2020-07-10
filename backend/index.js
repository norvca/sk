require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const freshData = require('./database/db');

app.use(express.json());
app.use(cookieParser());

// Allow CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', async (req, res) => {
  const result = await freshData();
  res.json(result);
});

app.listen(3000);
