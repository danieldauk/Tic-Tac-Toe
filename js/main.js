var playerChoice;
var choice;

$(function(){
  
  
  //choosing X or O 
  chooseSide();
  function chooseSide() {
     choice = prompt("X or O?");
    if(choice.toUpperCase() == "X") {
      playerChoice =1;
    } else if(choice.toUpperCase() == "O") {
      playerChoice =2;
    } else {
      chooseSide();
    }
  }
  
  
  //adding X or O on click and preventing from duplicates
  $(".square").on("click", function() {
    if($(this).hasClass("cross") || $(this).hasClass("circle")) {
      var temp = this;
     $(this).addClass("error");
      console.log(temp);
     setTimeout(function(){
       $(temp).removeClass("error");
     }, 300);
    } else if(playerChoice==1) {
      $(this).addClass("cross");
      $(this).find("img").attr("src", "img/x.svg");
    } else {
      $(this).addClass("circle");
      $(this).find("img").attr("src", "img/o.svg");
    }
  });
  
  
  
});