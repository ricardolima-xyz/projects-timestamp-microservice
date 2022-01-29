const express = require('express');
const app = express();

// Logger middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.get('/', function (req, res) {
    res.send('This is an implementation of Timestamp Microservice proposed by FreeCodeCamp');
});

app.get('/api', function(req, res) {
    let date = new Date();
    res.json({unix: date.getTime(), utc: date.toUTCString()});
});

app.get('/api/:date', function(req, res) {
    try {
        let date = isNaN(Number(req.params.date)) ?
            new Date(req.params.date):
            new Date(Number.parseInt(req.params.date));
        if (isNaN(date.getTime())) throw "Invalid Date";
        res.json({unix: date.getTime(), utc: date.toUTCString()});
    } catch (error) {
        res.json({ error : error });
    }
});

app.listen(3000);
