const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
require('dotenv').config();


// Connect to Database
mongoose.Promise = global.Promise;
 mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
); 


// Cors
app.use(cors({
  origin: 'http://localhost:8080'
}));

// Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//  Mongoose Config
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Express Session


// Connect flash 


// Passport 



// Global variables- flash


app.get('/', (req, res) => {
  res.json({
    message: 'Just checking dont mind!',
    user: req.user
    })
})

// Routes
app.use('/auth', require('./routes/user.route.js'));
app.use('/posts', require('./routes/post.route.js'));






function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found - ' + req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}



app.use(notFound);
app.use(errorHandler);

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});

