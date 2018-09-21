/** 
* Written by LeFizzy [2016] - refactored in 2018.
* It's amazing to look back to your old code years later, 
* to see what you did wrong, what you should did better.  
* 
* I'm going to refactor my codebase, and implement my new 
* game API to work with this client thing.
* I really whish I could do. :)
* 
* First, I'm going to use jQuery, because at that time
* it was loaded for some reason. 
*/

let gameData,
	gamePositionTracker = 0,
	gamePositionTrackerLeft = 0,
	gamePositionTrackerRight = 0,
	gamePlayerScore = 0;

$(document).ready(function() {
	showStartScreenSplash();
});

const showStartScreenSplash = function () {
	$('.stage--gameover').hide();
	$('.stage--game').hide();
};

const showEndSplash = function () {
	$('.div--endGameScore').html('You scored: ' + gamePlayerScore);
	resetGameData();
	$('.stage--game').hide();
	$('.stage--splashMain').hide();
	$('.stage--gameover').show();
};

const showPlayGameSplash = function () {
	gameData = requestAPIData();
	gamePositionTrackerLeft = gameData[gamePositionTracker];
	gamePositionTrackerRight = gameData[gamePositionTracker + 1];

	if(gameData) {
		$('.stage--splashMain').hide();
		$('.stage--gameover').hide();
		$('.stage--game').show();

		let leftContainerTitle = $('.div--dockGame2_cross h1'),
			leftContainerImage = $('.div--dockGame2_cross'),
			leftContainerScore = $('.div--dockGame2_cross h2');

		let rightContainerTitle = $('.div--dockGame1_cross h1'),
			rightContainerImage = $('.div--dockGame1_cross'),
			rightContainerScore = $('.div--dockGame1_cross h3'),
			currentGameScore = $('.div--currentGamescore_cross h2');

		leftContainerTitle.html(gameData[gamePositionTracker].keyword);
		leftContainerScore.html(gameData[gamePositionTracker].searchVolume);
		leftContainerImage.css("background", "linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url('" + gameData[gamePositionTracker].link + "')");

		rightContainerTitle.html(gameData[gamePositionTracker + 1].keyword);
		rightContainerImage.css("background", "linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url('" + gameData[gamePositionTracker + 1].link + "')");
		rightContainerScore.html("searches than " + gameData[gamePositionTracker].keyword);
		currentGameScore.html("Score:" + gamePlayerScore);
		animateDataScore();
	}
};

const animateDataScore = function () {
	$('.div--dockGame2_cross h2').each(function () {
    	$(this).prop('Counter',0).animate({
        	Counter: $(this).text()
    	}, {
			duration: 1000,
			easing: 'swing',
			step: function (now) {
				$(this).text(Math.ceil(now));
			}
    	});
	});
};

const compareQuestionScore = function (event_sender, sent_answer) {
	let highGameScore = $('.div--currentGamehiscore_desktop h2'),
			currentGameScore = $('.div--currentGamescore_cross h2');

	if( sent_answer == "higher" ) {
		if( gamePositionTrackerRight.searchVolume >= gamePositionTrackerLeft.searchVolume ) {
			if( gamePositionTracker +1 == gameData.length - 1 ) {
				showEndSplash();
			} else {
				gamePlayerScore = gamePlayerScore += 1;
				gamePositionTracker = gamePositionTracker += 1;
				gamePositionTrackerLeft = gameData[gamePositionTracker];
				gamePositionTrackerRight = gameData[gamePositionTracker + 1];
				currentGameScore = $('.div--currentGamescore_cross h2').html("Score:" + gamePlayerScore);
				moveToNextQuestion();
			}
		}
		else {
			showEndSplash();
		}
	} else if( sent_answer == "lower" ) {
		if( gamePositionTrackerRight.searchVolume <= gamePositionTrackerLeft.searchVolume ) {
			if( gamePositionTracker +1 == gameData.length - 1) {
				showEndSplash();
			} else {
				gamePlayerScore = gamePlayerScore += 1;
				gamePositionTracker = gamePositionTracker += 1;
				gamePositionTrackerLeft = gameData[gamePositionTracker];
				gamePositionTrackerRight = gameData[gamePositionTracker + 1];
				currentGameScore = $('.div--currentGamescore_cross h2').html("Score:" + gamePlayerScore);
				moveToNextQuestion();
			}
		}
		else {
			showEndSplash();
		}
	}
};

const moveToNextQuestion = function() {
		let leftContainerTitle = $('.div--dockGame2_cross h1'),
			leftContainerImage = $('.div--dockGame2_cross'),
			leftContainerScore = $('.div--dockGame2_cross h2');

		let rightContainerTitle = $('.div--dockGame1_cross h1'),
			rightContainerImage = $('.div--dockGame1_cross'),
			rightContainerScore = $('.div--dockGame1_cross h3');

		leftContainerTitle.html(gameData[gamePositionTracker].keyword);
		leftContainerScore.html(gameData[gamePositionTracker].searchVolume);
		leftContainerImage.css("background", "linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url('" + gameData[gamePositionTracker].link + "')");

		rightContainerTitle.html(gameData[gamePositionTracker + 1].keyword);
		rightContainerImage.css("background", "linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url('" + gameData[gamePositionTracker + 1].link + "')");
		rightContainerScore.html("searches than " + gameData[gamePositionTracker].keyword);
		animateDataScore();
};

const resetGameData = function() {
	gamePositionTracker = 0;
	gamePositionTrackerLeft = 0;
	gamePositionTrackerRight = 0;
	gamePlayerScore = 0;
};

const requestAPIData = function() {
	let gameData;
	$.get({
		url: "/api/getgamedata",
		async: false,
		success:function(data) {
			gameData = data; 
		 }   
		});

	return gameData;
};