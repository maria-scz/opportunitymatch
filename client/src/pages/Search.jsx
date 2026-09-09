import { useState } from 'react';

function Search() {
  const [field, setField] = useState('');
  const [location, setLocation] = useState('');
  const [deadline, setDeadline] = useState('');
  const [minAverage, setMinAverage] = useState('');
  const [results, setResults] = useState([]);

  async function handleSearch(e) {
    e.preventDefault();

    // TODO 1: build a URLSearchParams object, only appending filters that have a value
    // (same if-check pattern as tonight's backend route)
    const params = new URLSearchParams();
    if (field) params.append('field', field);
    if (minAverage) params.append('min_average', minAverage);
    if (location) params.append('location', location);
    if (deadline) params.append('deadline', deadline);

    params.toString(); 

    // TODO 2: fetch from `http://localhost:3000/opportunities?${params.toString()}`
    // — two awaits, same shape as every fetch since Day 2
    const response = await fetch(`http://localhost:3000/opportunities?${params.toString()}`);
    const data = await response.json();

    // TODO 3: setResults(...) with whatever came back
    setResults(data)
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
            </div>
        ))}
      </div>
    </div>
  );
}

export default Search;