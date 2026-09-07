require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');

const app = express();

// TODO 1: register the cors middleware
app.use(cors());

// TODO 2: register express.json() middleware
app.use(express.json());

// TODO 3: register session middleware — express-session as a function call:
// session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false
// })
// pass that whole object into app.use(...)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized : false
})
);

// TODO 4: mount your students route file
app.use('/students', require('./routes/students'));

const PORT = process.env.PORT || 3000;
// TODO 5: app.listen with a console.log, same pattern as the practice server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });