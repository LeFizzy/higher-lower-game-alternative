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

app.get('/api/getgamescore/:keyword', (req, res) => {
    let keywordRequest = req.params.keyword;

    console.log(keywordRequest);
    let keywordScore = 0;

    googleTrends.interestOverTime({
        keyword: "aceofspades", 
        startTime: new Date(Date.now() - (31556926 * 1000)),
        granularTimeResolution: true,
    })
    .then(function(results){
        console.log('These results are awesome', results);
    })
    .catch(function(err){
        console.error('Oh no there was an error', err);
    });
});

app.listen('8080', () => { console.log('Server started on 8080'); });