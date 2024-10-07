const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const routes = require("./routes")
const cors = require('cors');
const User = require("./models/UserModel");
const Sessions = require("./models/SessionModel");
const { sequelize } = require('./db');
const cookieParser = require('cookie-parser');

// Initialize Express
const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000', 
    credentials: true,
  })
);  

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req,res,next)=>{
  console.log("HTTP Method - " + req.method + " , URL - " + req.url);
  next();
});

app.use(
  session({
    secret: 'ghghghghghghh',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    },
  })
);

app.use('/', routes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log('Server is running on port  8000');
});
