import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    axios.get('/commits')
      .then(response => setCommits(response.data.all))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Git Commits</h1>
      <ul>
        {commits.map((commit, index) => (
          <li key={index}>{commit.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;