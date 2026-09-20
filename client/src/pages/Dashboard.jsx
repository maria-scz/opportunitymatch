import { useState, useEffect } from 'react';
import { API_URL } from '../config';

function Dashboard() {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    async function loadSaved() {
      const studentId = localStorage.getItem('studentId');
      if (!studentId) return;

      const response = await fetch(`${API_URL}/saved-opportunities`, { credentials: 'include' });
      if (!response.ok) return;   
      const data = await response.json();
      setSaved(data);

    }
    loadSaved();
  }, []);

  return (
    <div>
      <h2>Mi Dashboard</h2>
      <p>Guardadas: {saved.length}</p>
      {saved.map(item => (
        <div key={item.id}>
          <p>{item.name} — {item.organization}</p>
          <p>Fecha límite: {item.deadline}</p>
          <p>Estado: {item.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
