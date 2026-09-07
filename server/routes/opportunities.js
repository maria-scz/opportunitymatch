const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET all — optionally filtered by ?field=
router.get('/', (req, res) => {
  // TODO 1: check req.query.field.
  // If it exists: SELECT * FROM opportunity WHERE fields = ?, using .all(req.query.field)
  // If not: just SELECT * FROM opportunity, no WHERE
  // Either way, res.json(...) whatever rows come back
  if (req.query.field){
    const rows = db.prepare('SELECT * FROM opportunity WHERE fields = ?').all(req.query.field);
    res.json(rows);
  } else{
    const rows = db.prepare('SELECT * FROM opportunity').all();
    res.json(rows);
  }
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
router.post('/', (req, res) => {

const { name, organization, description, deadline, location, fields, min_average, level, eligibility, url, tags } =
 req.body;

  const result = db.prepare('INSERT INTO opportunity (name, organization, description, deadline, location, fields, min_average, level, eligibility, url, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
  .run(name, organization, description, deadline, location, fields, min_average, level, eligibility, url, tags);
  res.status(201).json({ id: result.lastInsertRowid })
});

// PUT — update (scoped down on purpose: just min_average for now, not every field)
router.put('/:id', (req, res) => {
    const { min_average } = req.body;
    db.prepare('UPDATE opportunity SET min_average = ? WHERE id = ?').run(min_average, req.params.id);
    res.status(200).json({ message: 'Opportunity actualizada' });
  });

// DELETE
router.delete('/:id', (req, res) => {
  // TODO 7: DELETE FROM opportunity WHERE id = ?, respond with a success message
  db.prepare('DELETE FROM opportunity WHERE id = ?').run(req.params.id)
  res.status(200).json({message: 'Opportunidad borrada'})
});

module.exports = router;