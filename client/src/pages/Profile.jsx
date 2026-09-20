import { useState } from 'react';
import { API_URL } from '../config';

function Profile() {
  const [academicLevel, setAcademicLevel] = useState('');
  const [academicAverage, setAcademicAverage] = useState('');
  const [intendedField, setIntendedField] = useState('');
  const [location, setLocation] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [interests, setInterests] = useState('');
  const [extracurricularActs, setExtracurricularActs] = useState('');
  const [universityType, setUniversityType] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const studentId = localStorage.getItem('studentId');
    if (!studentId) {
      alert('Intenta hacer log in primero!');
      return;
    }

    const response = await fetch(`${API_URL}/students/${studentId}`, {
      method: 'PUT',
      credentials: 'include',
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
      <button type="submit">Save Profile</button>
    </form>
  );
}

export default Profile;