const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');

const app = express();

app.all('*', function(req, res, next){
    origin = req.get('Origin') || '*';
    res.set('Access-Control-Allow-Origin', origin);
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Expose-Headers', 'Content-Length');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type'); // add the list of headers your site allows.
if ('OPTIONS' == req.method) return res.send(200);
    next();
});
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3001';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Running`));