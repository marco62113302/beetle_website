import React, { useState } from 'react';

const App = () => {
  const [token, setToken] = useState('');
  const [repositories, setRepositories] = useState([]);

  const login = async () => {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'viewer', password: 'viewer123' }),
    });
    const data = await res.json();
    setToken(data.token);
  };

  const getRepositories = async () => {
    const res = await fetch('http://localhost:3000/repositories', {
      headers: { Authorization: token },
    });
    const data = await res.json();
    setRepositories(data);
  };

  return (
    <div>
      <button onClick={login}>登入</button>
      <button onClick={getRepositories}>取得存庫</button>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;