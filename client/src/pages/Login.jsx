import { useState } from 'react';
import { API_URL } from '../config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setError('');

    // TODO 1: POST to http://localhost:3000/students/login with email + password
    // in the body — same fetch shape as Day 2's practice POST, two awaits
    const response = await fetch(`${API_URL}/students/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();

    // TODO 2: if response.ok is false, setError('Invalid email or password') and return
    // (response.ok is true for any 2xx status, false for 401/400/etc — a quick way
    // to check success without checking the exact status code yourself)
    if (!response.ok) {
        setError('Invalid email or password');
        return;
      }

    // TODO 3: otherwise, save data.id to localStorage:
    // localStorage.setItem('studentId', data.id)
    localStorage.setItem('studentId', data.id);
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Log In</h2>
      {error && <p>{error}</p>}
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Log In</button>
    </form>
  );
}

export default Login;