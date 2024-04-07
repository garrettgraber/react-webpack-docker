const fs = require('fs');
const path = require('path');
const express = require('express');
const ip = require('ip');

// const bundlePath = path.join(__dirname, '/public/build/index.html');
// const bundleFolder = path.join(__dirname, '/public/build');

const NodeEnvironment = process.env.NODE_ENV;

console.log('Node Environment: ', NodeEnvironment);

const bundlePath = path.join(__dirname, '/dist/index.html');
const bundleFolder = path.join(__dirname, '/dist');
const port = 3001;
// const hostname = 'localhost';
const hostname = ip.address();
const app = express();

app.get('/', function(req, res) {
app.use(express.static(bundleFolder));
	console.log('\ncall made to webpack --> Production <-- ');
	console.log(`Static Call ==> 🌎 Listening on port ${port}. ⚡️ Open up http://${hostname}:${port}`);
	res.sendFile(bundlePath);
});

const server = app.listen(port, hostname, function onStart(err) {
  console.log('hostname: ', hostname);
  if (err) {
    console.log(err);
  }
  console.info(`==> 🌎 Listening on port ${port}. ⚡️ Open up http://${hostname}:${port} in your browser.`)
});

