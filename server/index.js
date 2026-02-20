require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const { initializeDatabase } = require('./db');
const authRoutes = require('./routes/auth');
const inventoryRoutes = require('./routes/inventory');
const correctionsRoutes = require('./routes/corrections');
const { startScheduler, checkAndSendMissedDigests } = require('./services/scheduler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from parent directory (the client)
app.use(express.static(path.join(__dirname, '..')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/corrections', correctionsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server with async database init
async function startServer() {
  await initializeDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    startScheduler();
    // Check for missed digests (handles Render sleep wake-up scenario)
    checkAndSendMissedDigests();
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
