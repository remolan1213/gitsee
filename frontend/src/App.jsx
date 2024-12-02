// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file

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
    <div className="container">
      <h1>DreamArchers Gitsee</h1>
      <div className="section">
        <h2 className="section-title text-left">Git Commits</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {commits.map((commit, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{commit.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="section">
        <h2 className="section-title text-left">Files</h2>
        <input
          type="text"
          value={path}
          onChange={handlePathChange}
          placeholder="Enter repository path"
        />
        <button onClick={fetchFiles}>Fetch Files</button>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Path</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{file.path}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
