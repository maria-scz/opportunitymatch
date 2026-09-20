require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');

const app = express();

// TODO 1: register the cors middleware
// Las cookies de sesión necesitan origin explícito + credentials (no se puede usar cors() a secas).
const isProd = process.env.NODE_ENV === 'production' || !!process.env.RENDER;
app.set('trust proxy', 1); // Render / Vercel están detrás de un proxy HTTPS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

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
    saveUninitialized : false,
    cookie: {
      httpOnly: true,            // JavaScript del navegador no puede leer la cookie
      sameSite: 'lax',
      secure: isProd,            // en producción solo viaja por HTTPS
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
})
);

// TODO 4: mount your students route file
app.use('/students', require('./routes/students'));
app.use('/opportunities', require('./routes/opportunities'));
app.use('/saved-opportunities', require('./routes/savedOpportunities'));

const PORT = process.env.PORT || 3000;
// TODO 5: app.listen with a console.log, same pattern as the practice server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });