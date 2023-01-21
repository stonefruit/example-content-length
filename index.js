const express = require('express');
const bodyParser = require('body-parser');
const request = require('./request');

const app = express();
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.json());
const port = 3000;

app.get('/example1', async (req, res) => {
  const data = `stonefruit's data`;
  const result = await request.post(data, 'text/html', data.length);
  res.send(result);
});

app.get('/example2', async (req, res) => {
  const data = `stonefruit's data`;
  const result = await request.post(data, 'text/html', 1);
  res.send(result);
});

app.get('/example3', async (req, res) => {
  const data = `stonefruit’s data`;
  const result = await request.post(data, 'text/html', data.length);
  res.send(result);
});

app.get('/example4', async (req, res) => {
  const data = `stonefruit’s data`;
  const result = await request.post(data, 'text/html', Buffer.byteLength(data));
  res.send(result);
});

app.get('/example-main-fixed', async (req, res) => {
  const data = JSON.stringify({ data: `stonefruit’s data` });
  const result = await request.post(
    data,
    'application/json',
    Buffer.byteLength(data)
  );
  res.send(result);
});

app.get('/example-main-broken', async (req, res) => {
  const data = JSON.stringify({ data: `stonefruit’s data` });
  const result = await request.post(data, 'application/json', data.length);
  res.send(result);
});

// This endpoint is used to reflect how the body is parsed when different
// content-length values are used for strings
app.post('/endpoint-text', async (req, res) => {
  res.send(
    `Response from Endpoint 2:\nParsed body: ${req.body}\nReceived content-length header: ${req.headers['content-length']}\n`
  );
});

// This endpoint is used to reflect how the body is parsed when different
// content-length values are used for json
app.post('/endpoint-json', async (req, res) => {
  res.send(
    `Response from Endpoint 2:\nParsed body: ${req.body}\nReceived content-length header: ${req.headers['content-length']}\n`
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
