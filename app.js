const express = require('express');
const client = require('prom-client');

const app = express();
const port = 8085;

// í ½í´¥ collect metric há»‡ thá»‘ng (CPU, memory, event loop)
client.collectDefaultMetrics();

// í ½í´¥ custom metric (request count)
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

// í ½í´¥ middleware log + metric
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode,
    });

    console.log(`${req.method} ${req.path} ${res.statusCode}`);
  });
  next();
});

// í ½í´¥ API test
app.get('/', (req, res) => {
  res.send('Hello from app-nodejs í ½íº€');
});

// í ½í´¥ endpoint metrics (QUAN TRá»ŒNG NHáº¤T)
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// start server
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
