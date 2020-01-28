const http = require('http');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Server Serving');
});

const server = http.createServer(app);
server.listen(3000);
console.log('Server listening on port 3000');