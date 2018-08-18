const express = require('express');
const app = express();
const googleTrends = require('google-trends-api');
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

app.listen('8080', () => { console.log('Server started on 8080'); });