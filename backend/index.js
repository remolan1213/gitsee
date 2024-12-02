const express = require('express');
const simpleGit = require('simple-git');
const cors = require('cors');


const app = express();
app.use(cors());
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
  try {
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