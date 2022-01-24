const express = require("express");
const bodyParser =require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv')
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());  
app.use(morgan('combined'));
const authRoute = require('./routes/auth');
const candidateRoute = require('./routes/candidate');
var mongoose = require('mongoose');
dotenv.config();

var mongoDB = process.env.DB_CONN;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true},()=>{
console.log('connected' )
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// middlewares
app.use(express.json());
app.use('/api/user', authRoute);
app.use('/api/candidate',candidateRoute); 
app.get("/", (req, res) => {    
  res.status(200).send('welcome to sunday service api');
});

app.listen(port, () => {
  console.log(`app working ${port}`);
});
