const express = require('express');
const app = express();
const gameShuffle = require('./lib/randomizeElements.js');
const gameData = require('./lib/objectProvider.json');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('index.html');
});

app.get('/api/getgamedata', (req, res) => {
    let shuffledData = gameShuffle(gameData);
    res.send(shuffledData);
});

app.listen(process.env.PORT || 8080, () => { 
    console.log('Server started on port 8080!'); 
});