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

// Admin bypass - skip token verification for service accounts
function adminBypass(req, res, next) {
  const serviceKey = req.headers['x-service-key'];
  if (serviceKey === process.env.ADMIN_SERVICE_KEY) {
    req.user = { role: 'admin', source: 'service-key' };
    return next();
  }
  return authenticate(req, res, next);
}

module.exports = { authenticate, adminBypass, JWT_SECRET };
