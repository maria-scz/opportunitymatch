import { useState } from 'react';
import { API_URL } from '../config';

function Search() {
  const [field, setField] = useState('');
  const [location, setLocation] = useState('');
  const [deadline, setDeadline] = useState('');
  const [minAverage, setMinAverage] = useState('');
  const [results, setResults] = useState([]);

  async function handleSearch(e) {
    e.preventDefault();

    const params = new URLSearchParams();
    if (field) params.append('field', field);
    if (minAverage) params.append('min_average', minAverage);
    if (location) params.append('location', location);
    if (deadline) params.append('deadline', deadline);

    const response = await fetch(`${API_URL}/opportunities?${params.toString()}`);
    const data = await response.json();

    setResults(data);
  }

  async function handleSave(opportunityId) {
    const studentId = localStorage.getItem('studentId');
    if (!studentId) {
      alert('Inicia sesión primero');
      return;
    }

    const response = await fetch(`${API_URL}/saved-opportunities`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ opportunity_id: opportunityId, status: 'saved' })
    });

    const data = await response.json();
    alert(response.ok ? 'Guardado!' : data.error);
  }

  return (
    <div>
      <h2>Search Opportunities</h2>
      <form onSubmit={handleSearch}>
        <input value={field} onChange={(e) => setField(e.target.value)} placeholder="Field" />
        <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
        <input value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="Deadline (YYYY-MM-DD)" />
        <input value={minAverage} onChange={(e) => setMinAverage(e.target.value)} placeholder="Your Average" />
        <button type="submit">Search</button>
      </form>

      <div>
        {results.map(opportunity => (
          <div key={opportunity.id}>
            <p>{opportunity.name}</p>
            <p>{opportunity.min_average}</p>
            <button onClick={() => handleSave(opportunity.id)}>Guardar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;