

var humanPlayer = 0;
var aiPlayer =0;
var choice;
var diffLevel = 0;
var diffLevel2 = 0;
//defining gaming originalBoard
var originalBoard = [0,1,2,
                    3,4,5,
                    6,7,8];


$(function(){
  
  //choosing X or O 
  $(".wrapper").fadeOut();
  $("#naughts").on("click", function() {
    humanPlayer = "X";
    aiPlayer = "O";
  });
  $("#crosses").on("click", function() {
    humanPlayer = "O";
    aiPlayer = "X";
  });
    
  //choosing difficulty level
   $("#diff1").on("click", function() {
    diffLevel =1;
  });
  $("#diff2").on("click", function() {
    diffLevel =2;
  });
  $("#diff3").on("click", function() {
    diffLevel =3;
  });
  
  //start game
   $("#startGame").on("click", function() {
    if(diffLevel !=0 && humanPlayer !=0) {
      resetBoard();
      $(".menu").fadeOut();
      $(".wrapper").fadeIn();
    } else {
      if(diffLevel == 0 && humanPlayer == 0) {
        alert("Please select difficulty and Naughts or Crosses");
      } else if(diffLevel ==0 ) {
        alert("Please select difficulty level");
      } else if (humanPlayer == 0) {
        alert("Please select Naughts or Crosses");
      }
    }
  });
  
  //menu button
  $("#menuBtn").on("click", function(){
    $(".wrapper").fadeOut();
    $(".menu").fadeIn();
  });
  //reset button
  $("#resetBtn").on("click", function(){
    resetBoard();
  });
  
//declaring resetBoard function
  function resetBoard() {
    $(".wrapper img").removeAttr("src");
    $(".square").removeClass("circle");
    $(".square").removeClass("cross");
    originalBoard = [0,1,2,
                    3,4,5,
                    6,7,8];
  }
  
  
      //if player chose "O" computer moves first
    if(humanPlayer == "O") {
    nextAiMove(); 
    }

    //on square click 
    $(".square").on("click", function() {
      console.log(originalBoard);

      //preventing from duplicates and error message
      if($(this).hasClass("cross") || $(this).hasClass("circle")) {
        var temp = this;
       $(this).addClass("error");
       setTimeout(function(){
         $(temp).removeClass("error");
       }, 300);

        //if player chose x than x.svg if "o" than o.svg
      } else if(humanPlayer=="X") {
        $(this).addClass("cross");
        $(this).find("img").attr("src", "img/x.svg");
        //putting moves into originalBoard array
        originalBoard[$(this).attr("value")] = humanPlayer;
           nextAiMove();
      } else {
        $(this).addClass("circle");
        $(this).find("img").attr("src", "img/o.svg");
        //putting moves into originalBoard array
        originalBoard[$(this).attr("value")] = humanPlayer;
        nextAiMove();
      }

      //check results
      //checking for win and allerting the player
        if(checkForWin(originalBoard, humanPlayer)) {
          setTimeout(function() {
            alert("you won");
          }, 500);
        } else if(checkForWin(originalBoard, aiPlayer)) {
          setTimeout(function() {
            alert("PC won");
          }, 500);
        } else {
          var availableSpots = checkForAvailableSpots(originalBoard);
          if(availableSpots.length === 0) {
            setTimeout(function() {
            alert("Tie");
          }, 500);
          }
        }             

    });

    //defining nexAiMove function to get AI move

    function nextAiMove() {

       //difficulty level
        if(diffLevel==1) {
          var availableSpots = checkForAvailableSpots(originalBoard);
          var randNumber = Math.floor(Math.random() *availableSpots.length);
          var aiMoveIndex = availableSpots[randNumber];
        } else if(diffLevel == 2){
          if(diffLevel2 == 0) {
            console.log("minmax");
            diffLevel2 = 1;
            var aiMove =  minmax(originalBoard, aiPlayer);
            var aiMoveIndex = aiMove.index;
          } else {
            console.log("random");
            diffLevel2 = 0;
            var availableSpots = checkForAvailableSpots(originalBoard);
            var randNumber = Math.floor(Math.random() *availableSpots.length);
            var aiMoveIndex = availableSpots[randNumber];
          }
        } else {
          var aiMove =  minmax(originalBoard, aiPlayer);
          var aiMoveIndex = aiMove.index;
        }


      //updating original board
      originalBoard[aiMoveIndex] = aiPlayer;
      var moveId = "#sq" + aiMoveIndex;
      //making move
      if(aiPlayer == "O"){
        $(moveId).addClass("circle");
        $(moveId).find("img").attr("src", "img/o.svg");
      } else if(aiPlayer == "X") {
        $(moveId).addClass("cross");
        $(moveId).find("img").attr("src", "img/x.svg");
      }

    }

    //checking for winning combos
    function checkForWin(board, player) {

      if((board[0] == player && board[1] == player && board[2] == player) ||
         (board[3] == player && board[4] == player && board[5] == player) ||
         (board[6] == player && board[7] == player && board[8] == player) ||
         (board[0] == player && board[3] == player && board[6] == player) ||
         (board[1] == player && board[4] == player && board[7] == player) ||
         (board[2] == player && board[5] == player && board[8] == player) ||
         (board[0] == player && board[4] == player && board[8] == player) ||
         (board[2] == player && board[4] == player && board[6] == player)) {
        return true;
      } else {
        return false;
      }

    }

    //checking for available spots 
    function checkForAvailableSpots(board) {
      return board.filter(function(val) {
        if(val !== "O" && val !=="X"){
          return true;
        }
      });
    }

    //minmax function


    function minmax(newBoard, player) {

      //checking for available spots

      var availableSpots = checkForAvailableSpots(newBoard);


      //terminal states for recursion termination
      if(checkForWin(newBoard, humanPlayer)) {
        return {score:-10};
      } else if(checkForWin(newBoard, aiPlayer)){
        return {score:10};
      } else if(availableSpots.length === 0) {
        return {score:0};
      }


      //array for all available moves and their score
      var moves = [];    

      //checking available moves and score of available moves
      for(var i=0; i<availableSpots.length; i++) {

        //creating move object for storage of index and score
        var move = {};
        move.index = availableSpots[i];

        //setting available move into newBoard and calling minmax
        newBoard[availableSpots[i]] = player;

        //calling minmax (recursion happens here) with different player
        if(player == humanPlayer) {
          var result = minmax(newBoard, aiPlayer);
          //pushing score of the move
          move.score = result.score;
        } else {
          var result = minmax(newBoard, humanPlayer);
          //pushing score of the move to move object
          move.score = result.score;
        }


        //resetting newBoard
        newBoard[availableSpots[i]] = move.index;

        //pushing move and score to moves array
        moves.push(move);

      }

      //evaluating best move 
      //highest for AI
      //lowest for human
      var bestMove;

      if(player == aiPlayer) {
        var bestScore = -100;
        for(i=0; i<moves.length; i++) {
          if(moves[i].score > bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      } else {
        var bestScore = 100;
        for(i=0; i<moves.length; i++) {
          if(moves[i].score < bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      }

      return moves[bestMove];
    
  }
  
  
});