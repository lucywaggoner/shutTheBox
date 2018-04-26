// global variables initiated
var rand, rand2, total, score, c, tempTotal, selectCount=0, player=1, previousTotal;

//making new arrays to hold total tile value and score of leftover tiles
tileTotal = new Array();
currentTiles = new Array(1,2,3,4,5,6,7,8,9);
//rolling the dice
//allScoresP1 = new Array(); removed because I didn't want this feature
//allScoresP2 = new Array();
var tempAllScores1 = 0;
var tempAllScores2 = 0;

function endGame () {
    //put score in games paragraph depending on player 0 or 1
    //add player to var list at top set to 1 to start
    if (player==1){
        //allScoresP1[games-1]=score;  <don't really like this featur
        $("#p1Games").text(score);
        tempAllScores1 += score;
        /*for (var i = allScoresP1.length - 1; i >= 0; i--) {
            tempAllScores += allScoresP1[i];
        }*/
        $("#totalscore1").text(tempAllScores1);
        player=2;
    }
    else {
        //allScoresP2[games-1]=score;
        $("#p2Games").text(score);
        tempAllScores2 += score;
        /*for (var i = allScoresP1.length - 1; i >= 0; i--) {
            tempAllScores += allScoresP2[i];
        }*/
        $("#totalscore2").text(tempAllScores2);
        player=1;
    }
        
    // hid the reset button and end button and show all tiles
    $("#resetButton").hide();
    $("#endButton").hide();
    currentTiles = Array(1,2,3,4,5,6,7,8,9);

    for (var i = 0; i < currentTiles.length; i++) {
        c=currentTiles[i];
        flipBack(c);
    }

    score=45;
    $("#p1Games").text(score);
    $("#p2Games").text(score);

    //reset temporary tile total array and show roll button div
    tileTotal = Array();
    document.getElementById("leftside").style.visibility="visible";

    //I suggest to reset total to 0 and score to 45

    // as well as the dice images and #score text for new player

}  // end of endGame()
                   
function select(obj) {
      // sum current tiles
    if (document.getElementById("leftside").style.visibility=="visible") {
        return;
    }
    tempTotal=0;
    var img = document.getElementById(obj);
    tileTotal[selectCount]=obj;
    for (var i=0; i<tileTotal.length; i++) {
        tempTotal += tileTotal[i];
        updateCurrentTotal(tempTotal);
    };
    //alert("tempTotal",tempTotal);
    $("#debug").text(tempTotal);


    if (tempTotal<total) {
        flip(obj)

        //change the array holding current tiles
        // to input a zero for the original value
        currentTiles.splice(obj-1,1,0);
        
        //increase selectCount which tracks how many tiles are selected
        selectCount ++;
    }
      else if (tempTotal==total) {
        //show roll button in leftside div.
        document.getElementById("leftside").style.visibility="visible";
        flip(obj);

        //change the array holding current tiles
        // to input a zero for the original value
        currentTiles.splice(obj-1,1,0);

        //make our temporary tileTotal back to empty and reset selectCount to zero.  
        tileTotal = Array();
        selectCount=0;
        updateCurrentTotal(0);
        getScore();
    }
    else    {
        updateCurrentTotal("Too High");
        function callback() {
            return function() {
                reset();
            }
        }
        setTimeout(callback(), 1000);
    }
}

function getScore() {
    score=0;
    
    //loops through array and adds each element
    for (var i = 0; i < currentTiles.length; i++) {
        score += currentTiles[i];
    };

    //place the score in a paragraph with jquery command
    if (player == 1) {
        $("#p1Games").text(score);
    }
    else {
        $("#p2Games").text(score);
    }
    $("#die1").toggleClass("spin");
    $("#die2").toggleClass("spinLong");
};

function updateCurrentTotal(total) {
    //keeps track of what our current total is for the player 
    $("#currentTotal").text(total);
}


function flip(obj){
    $(`#${obj}`).animate({
        width: 0,
        marginLeft: 0,
        marginRight: 0,
    }, function () {    
        $(this).animate({
            marginLeft: 0,
            marginRight: 0,
        })
    })
}

function roll(){
    $("#die1").toggleClass("spin");
    $("#die2").toggleClass("spinLong");
    // randomly choose dice
    rand = Math.floor((Math.random() * 6) + 1);
    rand2 = Math.floor((Math.random() * 6) + 1);
    
    //img = document.getElementById("die1")
    path='images/'+'dice' +rand+'.jpg';
    path2='images/'+'dice' +rand2+'.jpg';
    document.images["die1"].src = path;
    document.images["die2"].src = path2;
    //get new totals of dice
    total = rand+rand2;
    document.getElementById("leftside").style.visibility="hidden";
};

function reset() {
    for (var i =0; i <tileTotal.length; i++) {
        c=tileTotal[i];
        flipBack(c);
        currentTiles.splice(c-1, 1, c);
    }
    tileTotal = Array();
    selectCount=0;
    tempTotal=0;
    updateCurrentTotal(tempTotal);
};

function flipBack(obj) {
    $(`#${obj}`).animate({
        width: 120,
        marginLeft: 0,
        marginRight: 0,
    }, function () {    
        $(this).animate({
            marginLeft: 0,
            marginRight: 0,
        })
    })
}