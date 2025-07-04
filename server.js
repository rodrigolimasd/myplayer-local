const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const VIDEO_ROOT = process.env.VIDEO_ROOT || path.join(__dirname, 'videos');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/videos', express.static(VIDEO_ROOT));

function isDayFolder(name) {
  return /^\d{4}-\d{2}-\d{2}$/.test(name);
}

app.get('/api/days', (req, res) => {
  fs.readdir(VIDEO_ROOT, { withFileTypes: true }, (err, files) => {
    if (err) return res.status(500).json({ error: err.message });
    const days = files
      .filter(f => f.isDirectory() && isDayFolder(f.name))
      .map(f => f.name)
      .sort();
    res.json({ days });
  });
});

app.get('/api/day/:day', (req, res) => {
  const day = req.params.day;
  if (!isDayFolder(day)) return res.status(400).json({ error: 'Invalid day format' });
  const dir = path.join(VIDEO_ROOT, day);
  fs.readdir(dir, (err, files) => {
    if (err) return res.status(500).json({ error: err.message });
    const segments = files
      .filter(f => f.endsWith('.mp4'))
      .sort()
      .map(f => `/videos/${day}/${f}`);
    res.json({ segments });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Serving videos from ${VIDEO_ROOT}`);
});
