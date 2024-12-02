const express = require('express');
const simpleGit = require('simple-git');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
const git = simpleGit();

app.get('/commits', async (req, res) => {
  try {
    const log = await git.log();
    res.json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/files', async (req, res) => {
  const path = req.query.path;
  try {
    const git = simpleGit(path); // Initialize with the provided path
    const status = await git.status();
    res.json(status.files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/list-files', (req, res) => {
  const directoryPath = path.join(__dirname, '../');
  fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const fileList = files.map(file => ({
      name: file.name,
      isDirectory: file.isDirectory()
    }));
    res.json(fileList);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});