const express = require('express');
const bcrypt = require('bcryptjs');
const { query } = require('../db');
const { generateToken, authenticateToken } = require('../middleware/auth');
const { triggerDigestForUser, getAlertsForUser } = require('../services/scheduler');

const router = express.Router();

// Sign up
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    const existingResult = await query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
    if (existingResult.rows[0]) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
      [email.toLowerCase(), hashedPassword]
    );

    const user = { id: result.rows[0].id, email: email.toLowerCase() };
    const token = generateToken(user);

    res.status(201).json({ user: { id: user.id, email: user.email }, token });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Find user
    const userResult = await query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
    const user = userResult.rows[0];
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.json({ user: { id: user.id, email: user.email }, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get current user
router.get('/me', authenticateToken, (req, res) => {
  res.json({ user: { id: req.user.id, email: req.user.email } });
});

// Get current alerts
router.get('/alerts', authenticateToken, async (req, res) => {
  try {
    const alerts = await getAlertsForUser(req.user.id);
    res.json(alerts);
  } catch (err) {
    console.error('Alerts error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Trigger digest email
router.post('/send-digest', authenticateToken, async (req, res) => {
  try {
    const result = await triggerDigestForUser(req.user.id, req.user.email);
    res.json(result);
  } catch (err) {
    console.error('Digest error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
