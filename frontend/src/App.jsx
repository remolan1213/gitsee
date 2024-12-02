// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [commits, setCommits] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/commits")
      .then((response) => setCommits(response.data.all))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/files")
      .then((response) => {
        console.log(response.data);
        setFiles(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Git Commits</h1>
      <ul>
        {commits.map((commit, index) => (
          <li key={index}>{commit.message}</li>
        ))}
      </ul>
      <h2>Files</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file.path}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
