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

let gameData;

$(document).ready(function() {
	showStartScreenSplash();
});

const showStartScreenSplash = function () {
	$('.stage--gameover').hide();
	$('.stage--game').hide();
};

const showEndSplash = function () {
	$('.stage--game').hide();
	$('.stage--splashMain').hide();
	$('.stage--gameover').show();
};

const showPlayGameSplash = function () {
	gameData = requestAPIData();
	console.log(gameData);

	if(gameData) {
		$('.stage--splashMain').hide();
		$('.stage--gameover').hide();
		$('.stage--game').show();

		let leftContainerTitle = $('.div--dockGame2_cross h1'),
			leftContainerImage = $('.div--dockGame2_cross'),
			leftContainerScore = $('.div--dockGame2_cross h2');

		let rightContainerTitle = $('.div--dockGame1_cross h1'),
			rightContainerImage = $('.div--dockGame1_cross'),
			rightContainerScore = $('.div--dockGame1_cross h3');

		let highGameScore = $('.div--currentGamehiscore_desktop'),
			currentGameScore = $('.div--currentGamescore_cross');

		leftContainerTitle.html(gameData[0].name);
		leftContainerScore.html("312312");
		leftContainerImage.css("background", "linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url('" + gameData[0].url + "')");

		rightContainerTitle.html(gameData[1].name);
		rightContainerScore.html(gameData[1].name);
		rightContainerImage.css("background", "linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url('" + gameData[1].url + "')");
		rightContainerScore.html("searches than " + gameData[0].name);
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
	if( sent_answer == "higher" ) {
			if( firstGameScore[randomItemContainer1] >= secGameScore[randomItemContainer2] ){
				//jq_slide();
				global_score++;
				current_score.innerHTML = "Score:" + global_score;
				gen_next();
			}
		else {
			gameover();
		}
	}else if( sent_answer == "lower" ) {
			if( firstGameScore[randomItemContainer1] <= secGameScore[randomItemContainer2] ){
				//jq_slide();
				global_score++;
				current_score.innerHTML = "Score:" + global_score;
				gen_next();
			}
			else {
				gameover();
			}
	}
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