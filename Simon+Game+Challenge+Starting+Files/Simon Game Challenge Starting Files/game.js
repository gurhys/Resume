var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$("html").keydown(function(){
    if(started === false){
        userClickedPattern = [];
        $("h1").text("Level 0");
        setTimeout(function(){
            nextSequence();
            userClickedPattern = [];
           }, 500);
        started = true;
    }
})

$("[type='button']").click(function(){

    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    
    checkAnswer(level);
    

    //console.log(userClickedPattern);
    playSound("sounds/" + userChosenColor + ".mp3");
    animatePress("#"+userChosenColor);
})



function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4 );;
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    var id = "#"+randomChosenColour;

    $(id).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound("sounds/" + randomChosenColour + ".mp3")

    level ++;
    $("h1").text("Level " + level);
    
}


function playSound(name){
    var audio = new Audio(name);
    audio.play();
}

function animatePress(currentColour){
    $(currentColour).addClass("pressed");
    setTimeout(function(){
        $(currentColour).removeClass("pressed");
       }, 100);
}

function checkAnswer(currentLevel){

    if(userClickedPattern.length === currentLevel){
        console.log(gamePattern);
        console.log(userClickedPattern);
        console.log("current level " + currentLevel)
        for (var i = 0; i<currentLevel; i++){
           if (gamePattern[i] != userClickedPattern[i]){
                $("body").addClass("game-over");
                $("h1").text("Game Over!, Press any key to re-Start");
                setTimeout(function(){
                $("body").removeClass("game-over");
                startOver();
            }, 500);
        }
    }
}

    if (userClickedPattern.length === currentLevel){
        setTimeout(function(){
            nextSequence();
            userClickedPattern = [];
           }, 1000);
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}