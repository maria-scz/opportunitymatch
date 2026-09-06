require('dotenv').config();
const Database = require('better-sqlite3');

const db = new Database('opportunitymatch.db');

db.pragma('foreign_keys = ON')


db.exec(`
  CREATE TABLE IF NOT EXISTS student (
    id INTEGER PRIMARY KEY,
    academic_level TEXT,
    academic_average REAL,
    intended_field TEXT,
    location TEXT,
    eligibility TEXT,
    interests TEXT,
    extracurricular_acts TEXT,
    university_type TEXT
  );


  CREATE TABLE IF NOT EXISTS opportunity(
    id INTEGER PRIMARY KEY,
    name TEXT,
    organization TEXT,
    description TEXT,
    deadline TEXT,
    location TEXT,
    fields TEXT,
    min_average REAL,
    level TEXT,
    eligibility TEXT,
    url TEXT,
    tags TEXT
  );


  CREATE TABLE IF NOT EXISTS saved_opportunities(
    id INTEGER PRIMARY KEY,
    student_id INTEGER NOT NULL,
    opportunity_id INTEGER NOT NULL,
    status TEXT,

    FOREIGN KEY (student_id) REFERENCES student(id),
    FOREIGN KEY (opportunity_id) REFERENCES opportunity(id)
    );
`
);

// TODO 6: export db so your route files can use it later
module.exports = db