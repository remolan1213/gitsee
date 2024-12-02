const express = require('express');
const simpleGit = require('simple-git');
const cors = require('cors');


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

app.post('/files', async (req, res) => {
  const { path } = req.body;
  try {
    const git = simpleGit(path); // Initialize with the provided path
    const status = await git.status();
    res.json(status.files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});