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

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: nothing to wire this to yet — a real save route doesn't exist yet.
    // For now, just prove the form works:
    console.log({ academicLevel, academicAverage, intendedField });
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