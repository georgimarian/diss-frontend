const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';

console.log('Help', process.env.PORT);
console.log('Help', process.env.HOST);

const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', (req, res) => res.send('pong'));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port, () => console.log(`listening on ${port}`));
