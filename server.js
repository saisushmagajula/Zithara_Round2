const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const customerRouter = require('./routes/customer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to EJS and specify the views directory
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Connect to the database
db.connect();


// API routes
app.use('/', customerRouter);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
