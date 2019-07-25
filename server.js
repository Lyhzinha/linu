const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json('Build REST API with node.js');
});

app.listen(80, () => {
    console.log('Node server listening on port 80');
});
