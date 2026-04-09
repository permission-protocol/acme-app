const express = require('express');
const { authenticate } = require('./src/auth');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ ok: true }));
app.get('/api/profile', authenticate, (req, res) => res.json(req.user));

app.listen(3000, () => console.log('Listening on :3000'));
