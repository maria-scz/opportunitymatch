const express = require('express');
const router = express.Router();
const db = require('../db/database');

// POST — save an opportunity for a student
router.post('/', (req, res) => {
  // TODO 1: destructure student_id, opportunity_id, status from req.body
  const { student_id , opportunity_id, status } = req.body;

  try {
    // TODO 2: INSERT INTO saved_opportunities (student_id, opportunity_id, status)
    // VALUES (?, ?, ?) — same three-part shape as every insert today.
    // Wrapped in try/catch on purpose: student_id/opportunity_id are foreign keys —
    // if you test with an id that doesn't actually exist in student or opportunity,
    // SQLite will reject it here, same idea as Day 7's duplicate-email catch.
    const result = db.prepare('INSERT INTO saved_opportunities (student_id, opportunity_id, status) VALUES (?, ?, ?)')
    .run(student_id, opportunity_id, status);
    // TODO 3: respond 201 with the new id
    res.status(201).json({ id: result.lastInsertRowid })

  } catch (error) {
    // TODO 4: respond 400 with a clear message
    res.status(400).json({ error: 'Opportunidad no guardada.'})
  }
});

// GET
router.get('/', (req, res) => {
  const rows = db.prepare(`
    SELECT saved_opportunities.id, saved_opportunities.status,
           opportunity.name, opportunity.deadline, opportunity.organization
    FROM saved_opportunities
    JOIN opportunity ON saved_opportunities.opportunity_id = opportunity.id
    WHERE saved_opportunities.student_id = ?
  `).all(req.query.student_id);
  res.json(rows);
});

// PUT — update just the status (scoped down, same reasoning as opportunities' PUT)
router.put('/:id', (req, res) => {
  // TODO 6: destructure status from req.body, then
  // UPDATE saved_opportunities SET status = ? WHERE id = ?
  // respond with a success message
  const { status } = req.body;
    db.prepare('UPDATE saved_opportunities SET status = ? WHERE id = ?').run(status, req.params.id);
    res.status(200).json({ message: `Opportunity actualizada a ${status}` });
});

// DELETE
router.delete('/:id', (req, res) => {
  // TODO 7: DELETE FROM saved_opportunities WHERE id = ?
  // respond with a success message
  db.prepare('DELETE FROM saved_opportunities WHERE id = ?').run(req.params.id);
  res.status(200).json({ message: 'Opportunity eliminada.'})
});

module.exports = router;