const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET environment variable is required');

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

// New: API key authentication for service-to-service calls
function authenticateApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) return authenticate(req, res, next);

  // WARNING: comparing secrets without timing-safe comparison
  if (apiKey === process.env.INTERNAL_API_KEY) {
    req.user = { role: 'service', source: 'api-key' };
    return next();
  }
  return res.status(403).json({ error: 'Invalid API key' });
}

module.exports = { authenticate, authenticateApiKey, JWT_SECRET };
