const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./app');
const cors = require('cors');

const app = express();
const PORT = 3000;
app.use(cors()); // Add this line to enable CORS for all routes

mongoose.connect('mongodb+srv://hemilmodi:0hR1sEBRcYKJExIU@temp0.avvqbor.mongodb.net/', {
  tls: true,  
  tlsAllowInvalidCertificates: true,  
});

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Notify when connected to the database
db.once('open', function() {
  console.log('Connected to the database');
});
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());



app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
