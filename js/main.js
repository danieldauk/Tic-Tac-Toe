var humanPlayer;
var aiPlayer;
var choice;

$(function(){
  
  
  //choosing X or O 
  chooseSide();
  function chooseSide() {
     choice = prompt("X or O?");
    if(choice.toUpperCase() == "X") {
      humanPlayer = "X";
      aiPlayer = "O";
    } else if(choice.toUpperCase() == "O") {
      humanPlayer = "O";
      aiPlayer = "X";
    } else {
      chooseSide();
    }
  }
  
  
  //on square click 
  $(".square").on("click", function() {
    
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
  });
  
  //defining nexAiMove function to get AI move
  
  function nextAiMove() {
   var aiMove =  minmax(originalBoard, aiPlayer);
   var aiMoveIndex = aiMove.index;
    
    //updating original board
    originalBoard[aiMoveIndex] = aiPlayer;
    var moveId = "#sq" + aiMoveIndex;
    //making move
    if(aiPlayer == "O"){
      console.log(moveId);
      $(moveId).addClass("circle");
      $(moveId).find("img").attr("src", "img/o.svg");
    } else if(aiPlayer == "X") {
      $(moveId).addClass("cross");
      $(moveId).find("img").attr("src", "img/x.svg");
    }
    
  }
  
  //defining gaming originalBoard
  var originalBoard = ["X","O","X",
                      3,4,5,
                       6,7,8];
  
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
      if(val != "O" && val !="X"){
        return val;
      }
    });
  }
  
  //minmax function
  
  
  function minmax(newBoard, player) {

    //array for all available moves and their score
    var moves = [];    
    
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
    
    
    //checking available moves and score of available moves
    for(i=0; i<availableSpots.length; i++) {
      
      
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
      
      //stop looping if best move is found 
      //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
       if(player == humanPlayer) {
        if(move.score == -10) {
          break;
        }
      } else if (player == aiPlayer) {
        if(move.score == 10) {
          break;
        }
      }
      
    }
    //evaluating best move 
    //highest for AI
    //lowest for human
    var bestMove;
    
    if(player == aiPlayer) {
      bestScore = -100;
      for(i=0; i<moves.length; i++) {
        if(moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;

        }
      }
    } else if(player == humanPlayer) {
      bestScore = 100;
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