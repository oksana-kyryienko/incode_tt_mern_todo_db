const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

const app = express();

app.use(express.json()); 

const connectionString = 'mongodb+srv://mern123:123456789Ls@mernapp.8bnck3z.mongodb.net/?retryWrites=true&w=majority&appName=mernapp';

const PORT = 5500;

app.use(cors());
const TodoItemRoute = require('./routes/todoItems');

mongoose.connect(connectionString)
  .then(() => console.log('Database connect'))
  .catch(err => console.log(err));

app.use('/', TodoItemRoute);

app.listen(PORT, () => console.log('Port listen on', PORT));