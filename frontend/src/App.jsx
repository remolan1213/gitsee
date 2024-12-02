// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [commits, setCommits] = useState([]);
  const [files, setFiles] = useState([]);
  const [path, setPath] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/commits")
      .then((response) => setCommits(response.data.all))
      .catch((error) => console.error(error));
  }, []);

  const handlePathChange = (event) => {
    setPath(event.target.value);
  };

  const fetchFiles = () => {
    axios
      .post("http://localhost:3001/files", { path })
      .then((response) => {
        console.log(response.data);
        setFiles(response.data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Git Commits</h1>
      <ul>
        {commits.map((commit, index) => (
          <li key={index}>{commit.message}</li>
        ))}
      </ul>
      <h2>Files</h2>
      <input
        type="text"
        value={path}
        onChange={handlePathChange}
        placeholder="Enter repository path"
      />
      <button onClick={fetchFiles}>Fetch Files</button>
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file.path}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
