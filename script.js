var player1 = prompt("Player one enter your name, you will be blue")
var player1Color = "red";
var player2 = prompt("Player two enter your name, you will be red");
var player2Color = "blue";

var table = $('table tr')

function chkLine(a,b,c,d) {
    return ((a !== 'rgb(99, 90, 90)') && (a == b) && (a == c) && (a == d));
}

function isGameOver() {
  // Check if all 4 cells are connected
  // Check down
  for (r = 0; r < 3; r++)
      for (c = 0; c < 7; c++)
          if (chkLine(returncolor(r,c), returncolor(r+1,c), returncolor(r+2,c), returncolor(r+3,c)))
              return true;

  // Check right
  for (r = 0; r < 6; r++)
      for (c = 0; c < 4; c++)
          if (chkLine(returncolor(r,c), returncolor(r,c+1), returncolor(r,c+2), returncolor(r,c+3)))
              return true;

  // Check down-right
  for (r = 0; r < 3; r++)
      for (c = 0; c < 4; c++)
          if (chkLine(returncolor(r,c), returncolor(r+1,c+1), returncolor(r+2,c+2), returncolor(r+3,c+3)))
              return true;

  // Check down-left
  for (r = 3; r < 6; r++)
      for (c = 0; c < 4; c++)
          if (chkLine(returncolor(r,c), returncolor(r-1,c+1), returncolor(r-2,c+2), returncolor(r-3,c+3)))
              return true;

  return false;

}

function reportWin(row, col) {
  console.log("you've won, last Move"+row+","+col);
}

function changeColor(row, col, color) {
  return table.eq(row).find('td').eq(col).css('background-color', color)
}

function returncolor(row, col) {
  return table.eq(row).find('td').eq(col).css('background-color')
}

function checkBottom(col) {
  for (var row = 5; row >= 0; row--) {
    if ('rgb(99, 90, 90)' === returncolor(row, col)) {
      return row;
    }
  }
  alert("Invalid Move")
  return -1;
}

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

message = player1 + " : It's your turn, please pick a column to drop a " + player1Color + " chip";
$("h3").text(message)

$('table td').on('click', function() {
  var col = $(this).index();
  changeColor(checkBottom(col), col, currentColor);
  var win = isGameOver();
  if (win) {
    $('h1').text(currentName+" you have won!");
    $('h2').fadeOut('slow');
    $('h3').fadeOut('slow')
  }

  currentPlayer *= -1;
  if(currentPlayer === 1) {
    currentName = player1;
    currentColor = player1Color;
  }
  else{
    currentName = player2;
    currentColor = player2Color;
  }
  $("h3").text(currentName + " : It's your turn, please pick a column to drop a " + currentColor + " chip")
})
