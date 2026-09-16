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
    university_type TEXT,
    email TEXT UNIQUE,
    password_hash TEXT
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

const count = db.prepare('SELECT COUNT(*) as total FROM opportunity').get();
if (count.total === 0) {
  const seed = db.prepare('INSERT INTO opportunity (name, organization, description, deadline, location, fields, min_average, level, eligibility, url, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
  seed.run('Jóvenes Escribiendo el Futuro', 'Gobierno de México', 'Apoyo económico bimestral para estudiantes de licenciatura en instituciones públicas.', '2026-10-15', 'México', 'General', 7, 'undergrad', 'low-income', 'https://www.gob.mx/becasbenitojuarez', 'federal,economico');
  seed.run('Beca Tec de Monterrey - Talento y Mérito', 'Tecnológico de Monterrey', 'Cubre desde 25% hasta 100% de colegiatura para estudiantes con promedio destacado.', '2027-01-15', 'México', 'General', 9, 'undergrad', 'merit', 'https://tec.mx/es/becas', 'merito,colegiatura');
  seed.run('Programa de Becarios CUAED', 'UNAM', 'Programa de becarios para estudiantes de Ciencias de la Computación e Ingeniería en Computación.', '2026-11-01', 'CDMX', 'CS', 8, 'undergrad', 'open', 'https://www.becas.unam.mx', 'unam,computacion');
  seed.run('Beca FUNED', 'Fundación FUNED', 'Apoyo para estudiar en universidades de renombre mundial.', '2027-02-01', 'Remote', 'General', 8.5, 'undergrad', 'merit', 'https://funed.org.mx', 'internacional');
  seed.run('Fulbright-García Robles', 'COMEXUS', 'Beca de intercambio académico entre México y Estados Unidos.', '2027-03-01', 'Estados Unidos', 'General', 8, 'undergrad', 'open', 'https://www.comexus.org.mx', 'intercambio,internacional');
  seed.run('Google STEP Internship', 'Google', 'Internship de verano para estudiantes de primer y segundo año de carreras técnicas.', '2026-10-01', 'Remote', 'CS', 8, 'undergrad', 'open', 'https://buildyourfuture.withgoogle.com/programs/step', 'internship,tech');
  seed.run('Microsoft Explore Program', 'Microsoft', 'Programa de exploración para estudiantes en sus primeros años de universidad interesados en tecnología.', '2026-10-15', 'Remote', 'CS', 7.5, 'undergrad', 'open', 'https://careers.microsoft.com/students/us/en/exploreprogram', 'internship,tech');
  seed.run('Duolingo Thrive', 'Duolingo', 'Programa para estudiantes apasionados por la educación accesible y la tecnología.', '2026-10-20', 'Remote', 'CS', 7, 'undergrad', 'open', 'https://careers.duolingo.com', 'internship,educacion');
  seed.run('Becas Santander Universidades', 'Banco Santander', 'Becas de movilidad, emprendimiento y empleabilidad para universitarios.', '2027-01-30', 'México', 'General', 7, 'undergrad', 'open', 'https://www.becas-santander.com', 'movilidad,empleabilidad');
  seed.run('Beca Corregidora - Educación a Paso Firme', 'Ayuntamiento de Corregidora', 'Apoyo municipal de hasta $3,000 pesos para estudiantes de licenciatura e ingeniería.', '2026-11-30', 'Querétaro', 'General', 7, 'undergrad', 'local', 'https://corregidora.gob.mx', 'municipal,economico');
  seed.run('Becas SECIHTI - Verano de Investigación', 'SECIHTI', 'Apoyo para prácticas profesionales y proyectos de investigación en ciencia y tecnología.', '2027-02-15', 'México', 'CS', 8, 'undergrad', 'open', 'https://secihti.mx', 'investigacion,ciencia');
  seed.run('Beca Enjambre', 'Gobierno de Guadalajara', 'Apoyo bimestral para reducir la deserción escolar en jóvenes universitarios de Guadalajara.', '2026-10-30', 'Guadalajara', 'General', 6.5, 'undergrad', 'local', 'https://guadalajara.gob.mx', 'municipal,economico');
  console.log('Base de datos sembrada con 12 oportunidades reales.');
}

// TODO 6: export db so your route files can use it later
module.exports = db