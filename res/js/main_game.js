		/*
		Written by LeFizzy [2016]
		Usterix.io main_game's javascript.

		This javascript used to generate randomized numbers,then render two background images on the screen(seperated by two container) with their headings.
		Let's say the Math()_1 selector generate the number 3, our first container gets the image "Ib_game.jpg" and text "Ib (RPG)" with score "9".

		p.s => Maybe I need to minify this concept for better load performance.
		*/
		var comp2GameScore, comp2GameImage, comp2GameTitle;
		var cGamePic, cGameName, cGameScore;
		var usedImg, higherThan, current_score, current_highscore, global_score = 0, high_score = 0;
		var randomItemContainer1, randomItemContainer2;
		var comp1GameScore, comp1GameImage, comp1GameTitle;
		var storeHighscore = document.cookie;
		var formatted_num;
function animate_score(){
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

function stage_splash(){
	$('.stage--gameover').hide();
	$('.stage--game').hide();
};

window.onload = function(){
		stage_splash();
};

function stage_game() {
	$('.stage--splashMain').hide();
	$('.stage--gameover').hide();
	$('.stage--game').show();
	firstGamePic = new Array(			//Future => These should be stored in another server for faster load times! :)
			"res/images/donald_trump.jpg",
			"res/images/flowers.jpg");

  	firstGameName = new Array(
			'"Donald Trump"',
			'"Flowers"');

  	firstGameScore = new Array(
			100000,
			88888);
	
	secGamePic = new Array(			//Future => These should be stored in another server for faster load times! :)
			"res/images/hillary_clinton.jpg",
			"res/images/toys.jpg");

  	secGameName = new Array(
  			'"Hillary Clinton"',
  			'"Toys"');

  	secGameScore = new Array(
			32000,
			77777777);

  		randomItemContainer1 = Math.floor(Math.random() * firstGamePic.length);
		randomItemContainer2 = Math.floor(Math.random() * secGamePic.length);
  		comp1GameTitle = document.querySelector(".div--dockGame1_cross h1");
  		comp1GameImage = document.querySelector(".div--dockGame1_cross");

 		comp2GameTitle = document.querySelector(".div--dockGame2_cross h1");
  		comp2GameScore = document.querySelector(".div--dockGame2_cross h2");
  		comp2GameImage = document.querySelector(".div--dockGame2_cross");
		current_score = document.querySelector(".div--currentGamescore_cross h2");
		high_score = document.querySelector(".div--currentGamehiscore_desktop h2");
		higherThan = document.querySelector(".div--dockGame1_cross h3");

		comp1GameTitle.innerHTML = firstGameName[randomItemContainer1];

		comp1GameImage.style.backgroundImage = "linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url('" + firstGamePic[randomItemContainer1] + "')";
		comp2GameTitle.innerHTML = secGameName[randomItemContainer2];
		comp2GameScore.innerHTML = secGameScore[randomItemContainer2];
		comp2GameImage.style.backgroundImage = "linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url('" + secGamePic[randomItemContainer2] + "')";
		higherThan.innerHTML = "searches than " + secGameName[randomItemContainer2];
		current_score.innerHTML = "Score:0";
		animate_score();
};
function question_answer(event_sender, sent_answer) {
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

function gen_next() {
			comp2GameImage.style.backgroundImage = "linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url('" + firstGamePic[randomItemContainer2] + "')";
			comp2GameTitle.innerHTML = firstGameName[randomItemContainer1];
			comp2GameScore.innerHTML = firstGameScore[randomItemContainer1];
			secGameName[randomItemContainer2] = firstGameName[randomItemContainer1]; 
			secGameScore[randomItemContainer2] = firstGameScore[randomItemContainer1];

			//Generate new random to the right_container
			var randomItemContainer3 = Math.floor(Math.random() * firstGamePic.length);
			comp1GameTitle.innerHTML = firstGameName[randomItemContainer3];
  			comp1GameImage.style.backgroundImage = "linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url('" + firstGamePic[randomItemContainer3] + "')";
			firstGameScore[randomItemContainer1] = firstGameScore[randomItemContainer3];
			higherThan.innerHTML = "searches than " + secGameName[randomItemContainer2];
};

function gameover() {
	$('.stage--game').hide();
	$('.stage--splashMain').hide();
	$('.stage--gameover').show();
};