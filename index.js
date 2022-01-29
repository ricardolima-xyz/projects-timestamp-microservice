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
    res.json({unix: date.getTime(), utc: date});
});

app.get('/api/:date', function(req, res) {
    try {
        let timestamp = Date.parse(req.params.date);
        if (isNaN(timestamp)) throw "Invalid Date";
        res.json({unix: timestamp, utc: timestamp});
    } catch (error) {
        res.json({ error : error });
    }
});

app.listen(3000);