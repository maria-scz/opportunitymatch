const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { requireAuth, requireAdmin } = require('../middleware/auth');

// GET all — optionally filtered by ?field=
router.get('/', (req, res) => {
  const { field, location, deadline, min_average } = req.query;

  let query = 'SELECT * FROM opportunity WHERE 1=1';
  const params = [];

  if (field) {
    query += ' AND fields = ?';
    params.push(field);
  }
  // TODO 2: same pattern for location — column name is `location`
  if (location) {
    query += ' AND location = ?';
    params.push(location);
  }
  // TODO 3: for deadline — think about whether this should be an exact match,
  // or "due on or before this date" (hint: which comparison operator means that?)
  if (deadline) {
    query += ' AND deadline <= ?';
    params.push(deadline);
  }


  // TODO 4: for min_average — using the qualification logic from above,
  // not exact match
  if (min_average) {
    query += ' AND min_average <= ?';
    params.push(min_average);
  }

  const rows = db.prepare(query).all(...params);
  res.json(rows);
});

// GET one by id
router.get('/:id', (req, res) => {
    const row = db.prepare('SELECT * FROM opportunity WHERE id = ?').get(req.params.id);
  
    if (!row) {
      return res.status(404).json({ error: 'Opportunity no encontrada' });
    }
  
    res.json(row);
  });

// POST — create (this is how you'll seed real data)
router.post('/', requireAdmin, (req, res) => {

const { name, organization, description, deadline, location, fields, min_average, level, eligibility, url, tags } =
 req.body;

  const result = db.prepare('INSERT INTO opportunity (name, organization, description, deadline, location, fields, min_average, level, eligibility, url, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
  .run(name, organization, description, deadline, location, fields, min_average, level, eligibility, url, tags);
  res.status(201).json({ id: result.lastInsertRowid })
});

// PUT — update (scoped down on purpose: just min_average for now, not every field)
router.put('/:id', requireAdmin, (req, res) => {
    const { min_average } = req.body;
    db.prepare('UPDATE opportunity SET min_average = ? WHERE id = ?').run(min_average, req.params.id);
    res.status(200).json({ message: 'Opportunity actualizada' });
  });

// DELETE
router.delete('/:id', requireAdmin, (req, res) => {
  // TODO 7: DELETE FROM opportunity WHERE id = ?, respond with a success message
  db.prepare('DELETE FROM opportunity WHERE id = ?').run(req.params.id)
  res.status(200).json({message: 'Opportunidad borrada'})
});

router.get('/:id/match/:studentId', requireAuth, (req, res) => {
  // Solo puedes ver TU match, no el de otra persona
  if (Number(req.params.studentId) !== req.session.studentId) {
    return res.status(403).json({ error: 'No autorizado' });
  }
  const opportunity = db.prepare('SELECT * FROM opportunity WHERE id = ?').get(req.params.id);
  const student = db.prepare('SELECT * FROM student WHERE id = ?').get(req.params.studentId);

  if (!opportunity || !student) {
    return res.status(404).json({ error: 'No encontrado' });
  }

  let score = 0;
  const reasons = [];

  // Academic average: 20%
  if (student.academic_average >= opportunity.min_average) {
    score += 0.20;
    reasons.push('tu promedio califica');
  }

  // Field: 25%
  if (student.intended_field === opportunity.fields) {
    score += 0.25;
    reasons.push('tu campo de estudio coincide');
  }

  // Location: 15%
  if (student.location === opportunity.location || opportunity.location === 'Remote') {
    score += 0.15;
    reasons.push('la ubicación es compatible');
  }

  // Academic level: 15%
  if (student.academic_level === opportunity.level) {
    score += 0.15;
    reasons.push('tu nivel académico coincide');
  }

  // Interests vs tags: 15%
  if (student.interests && opportunity.tags && opportunity.tags.includes(student.interests)) {
    score += 0.15;
    reasons.push('tus intereses coinciden');
  }

  // Deadline not passed: 10%
  if (new Date(opportunity.deadline) > new Date()) {
    score += 0.10;
    reasons.push('la fecha límite sigue abierta');
  }

  res.json({
    match_percentage: Math.round(score * 100),
    reasoning: reasons.join(', ') || 'Poca compatibilidad con tu perfil'
  });
});
module.exports = router;