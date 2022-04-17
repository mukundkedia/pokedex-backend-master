const express = require('express');
const router = require('./routes');

const port = process.env.PORT || 8000;

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  }
);

app.use(router);


app.listen(port, () => {
    console.log(`App started on Port: ${port}`);
});

module.exports = app;