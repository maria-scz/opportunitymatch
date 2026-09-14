import { useState } from 'react';

function Profile() {
  const [academicLevel, setAcademicLevel] = useState('');
  const [academicAverage, setAcademicAverage] = useState('');
  const [intendedField, setIntendedField] = useState('');
  // TODO: same pattern — one useState line each — for:
  // location, eligibility, interests, extracurricularActs, universityType
  const[location, setLocation] = useState('');
  const[eligibility, setEligibility] = useState('');
  const[interests, setInterests] = useState('');
  const[extracurricularActs, setExtracurricularActs] = useState('');
  const[universityType, setUniversityType] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
  
    const studentId = localStorage.getItem('studentId');
    // TODO 1: si no hay studentId (nadie ha iniciado sesión), usa un alert()
    // diciendo algo como "please log in first" y haz return — no tiene sentido
    // seguir si no sabemos a quién pertenece este perfil
    if (!studentId) {
      alert('Intenta hacer log in primero!');
      return;
    }
  
    // TODO 2: fetch a `http://localhost:3000/students/${studentId}` — mismo patrón
    // de siempre, pero con method: 'PUT' en vez de 'POST', y el body con las
    // ocho variables de estado (academicLevel, academicAverage, etc.)
    const response = await fetch(`http://localhost:3000/students/${studentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        academic_level: academicLevel,
        academic_average: academicAverage,
        intended_field: intendedField,
        location: location,
        eligibility: eligibility,
        interests: interests,
        extracurricular_acts: extracurricularActs,
        university_type: universityType
      })
    });
    
    const data = await response.json();
    alert(data.message);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Student Profile</h2>
      <input value={academicLevel} onChange={(e) => setAcademicLevel(e.target.value)} placeholder="Academic Level" />
      <input value={academicAverage} onChange={(e) => setAcademicAverage(e.target.value)} placeholder="Academic Average" />
      <input value={intendedField} onChange={(e) => setIntendedField(e.target.value)} placeholder="Intended Field" />
      <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
      <input value={eligibility} onChange={(e) => setEligibility(e.target.value)} placeholder="Eligibility" />
      <input value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="Interests" />
      <input value={extracurricularActs} onChange={(e) => setExtracurricularActs(e.target.value)} placeholder="Extracurricular Activities" />
      <input value={universityType} onChange={(e) => setUniversityType(e.target.value)} placeholder="University Type" />
      {/* TODO: same <input value={...} onChange={...} placeholder="..." /> pattern
          for the remaining 5 fields */}
      <button type="submit">Save Profile</button>
    </form>
  );
}

export default Profile;