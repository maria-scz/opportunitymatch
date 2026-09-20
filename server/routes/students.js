const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db/database');
const { requireAuth } = require('../middleware/auth');

router.post('/signup', async (req, res) => {
  // TODO 1: read email and password off req.body — same destructuring pattern from Day 2
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
  }

  // TODO 2: hash the password with bcrypt.hash(...) — remember, it returns a
  // Promise, so this needs await. Use 10 as the cost factor, same as the example earlier.
  const hashed = await bcrypt.hash(password, 10);

  try {
        const result = db.prepare('INSERT INTO student (email, password_hash) VALUES (?, ?)')
    .run(email, hashed);

    // TODO 4: respond with 201 status and something like { id, email }.
    // (.run() returns an object with .lastInsertRowid — that's your new id.)
    res.status(201).json({ id: result.lastInsertRowid, email: email });
  } catch (error) {
    // TODO 5: if signup fails, respond with a helpful message instead of crashing.
    // Hint: this is where your "already registered, try logging in" idea from earlier lives.
    res.status(400).json({ error: 'Email ya registrado, intenta hacer log in !' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const student = db.prepare('SELECT * FROM student WHERE email = ?').get(email);
  // TODO 1: if no student found, respond 401 with an error
  if (!student) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  // TODO 2: bcrypt.compare(password, student.password_hash) — needs await
  const passwordMatch = await bcrypt.compare(password, student.password_hash);
  // TODO 3: if it doesn't match, respond 401 with an error
  if(!passwordMatch){
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  // TODO 4: if it matches, respond 200 with { id: student.id, email: student.email }
  // — never send password_hash back, ever
  // Guardamos el id en la SESIÓN DEL SERVIDOR (no en el navegador).
  // regenerate() crea una sesión nueva al hacer login para evitar "session fixation".
  req.session.regenerate((err) => {
    if (err) return res.status(500).json({ error: 'No se pudo iniciar sesión' });
    req.session.studentId = student.id;
    return res.status(200).json({ id: student.id, email: student.email });
  });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Sesión cerrada' });
  });
});

router.put('/:id', requireAuth, (req, res) => {
  // Solo puedes editar TU propio perfil
  if (Number(req.params.id) !== req.session.studentId) {
    return res.status(403).json({ error: 'No puedes editar el perfil de otra persona' });
  }
  const { academic_level, academic_average, intended_field, location, eligibility, interests, extracurricular_acts, university_type } = req.body;

  // TODO 1: UPDATE student SET academic_level = ?, academic_average = ?, intended_field = ?,
  // location = ?, eligibility = ?, interests = ?, extracurricular_acts = ?, university_type = ?
  // WHERE id = ? — ocho columnas, ocho valores, más req.params.id al final

  // TODO 2: responder 200 con un mensaje de éxito
  db.prepare('UPDATE student SET academic_level = ?, academic_average = ?, intended_field = ?, location = ?, eligibility = ?, interests = ?, extracurricular_acts = ?, university_type = ? WHERE id = ?')
  .run(academic_level, academic_average, intended_field, location, eligibility, interests, extracurricular_acts, university_type, req.params.id);

  res.status(200).json({ message: 'Perfil actualizado exitosamente.' });
});

module.exports = router;