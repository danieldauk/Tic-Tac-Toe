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
      //putting moves into firstBoard array
      firstBoard[$(this).attr("value")] = humanPlayer;
    } else {
      $(this).addClass("circle");
      $(this).find("img").attr("src", "img/o.svg");
      //putting moves into firstBoard array
      firstBoard[$(this).attr("value")] = humanPlayer;
    }
  });
  
  //defining gaming firstBoard
  var firstBoard = [0,1,2,
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

  
  
  
});