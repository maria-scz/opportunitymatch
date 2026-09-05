Students

POST /students — create a profile
GET /students/:id — read back one student's own profile
(no public list of all students — your call, and the right one)

Opportunities

GET /opportunities — full list
GET /opportunities/:id — one specific opportunity
GET /opportunities?field=CS — filtered by category, via query string

Saved Opportunities

POST /saved-opportunities — save one (body includes student_id + opportunity_id)
GET /students/:id/saved-opportunities — one student's saved list only
PUT /saved-opportunities/:id — update a specific saved record's status
DELETE /saved-opportunities/:id — remove a specific saved record