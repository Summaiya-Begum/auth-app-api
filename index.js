const express = require("express");
const cors = require("cors");
const dataConnection = require("./config/db");
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const profileRouter = require('./routes/profile');

require("dotenv").config() 



const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello server");
});


// api routes
app.use('/api', loginRouter);
app.use('/api', signupRouter);
app.use('/profile', profileRouter);



app.listen(process.env.PORT, async (req, res) => {
  try {
    await dataConnection;
    console.log(`Connection Connected With Database http://localhost:8081`);
  } catch (err) {
    console.log(err);
  }
});
