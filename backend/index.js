const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Todo = require('./Todo');
const client = require('prom-client');

const app = express();
const PORT = 5000;

// ✅ Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/todos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

app.use(cors());
app.use(express.json());

// ✅ Prometheus metrics setup
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // collects default Node.js metrics

const register = client.register;

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

// ✅ HTTP metrics middleware
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.labels(req.method, req.path, res.statusCode.toString()).inc();
  });
  next();
});

// ✅ Expose Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// ✅ GET all todos
app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
});

// ✅ POST new todo
app.post('/api/todos', async (req, res) => {
  const { text } = req.body;
  console.log('📥 Received new todo:', text);

  if (!text) return res.status(400).json({ error: 'Missing text' });

  const newTodo = await Todo.create({ text });
  res.status(201).json(newTodo);
});

// ✅ DELETE a todo by ID
app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
