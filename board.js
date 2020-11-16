console.log("connected");
var player1 = prompt("Player One,Enter your name, you will be blue ");
var player2 = prompt("Player One,Enter your name, you will be red ");
p1color = "rgb(0, 255, 255)";
p2color = "rgb(255,182,193)";

var table= $("table tr");

function colorchange(rowindex,colindex,color) {
  return table.eq(rowindex).find('td').eq(colindex).find('button').css('background-color',color);
}

function returnColor(rowIndex,colIndex) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex) {
  var colorReport = returnColor(5,colIndex);
  for (var row = 5; row > -1; row--) {
    colorReport = returnColor(row,colIndex);
    if (colorReport === 'rgb(255, 255, 0)') {
      return row
    }
  }
}

function colorMatchCheck(one,two,three,four){
  return (one===two && one===three && one===four && one !== 'rgb(255, 255, 0)' && one !== undefined);
}

// Check for Horizontal Wins
function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2), returnColor(row,col+3))) {
        console.log('horiz');
        //reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Vertical Wins
function verticalWinCheck() {
  for (var col = 0; col < 6; col++) {
    for (var row = 0; row < 3; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col))) {
        console.log('vertical');
        //reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}


var currentPlayer = 1
var currentName = player1
var currentColor = p1color
$('h3').text(player1+" it is your turn, please pick a column to drop your blue chip");

$('.board button').on('click',function() {

  var col= $(this).closest("td").index();
  console.log(col);

  var botavail = checkBottom(col);

  colorchange(botavail,col,currentColor);

  if (horizontalWinCheck() || verticalWinCheck()) {
    $('h3').fadeOut('fast')
    $('h1').text(currentName+" You have won!")
    $('h2').text("Refresh to play again").slideIn()

    return true
  }

  // If no win or tie, continue to next player
  currentPlayer = currentPlayer * -1 ;

  // Re-Check who the current Player is.
  if (currentPlayer === 1) {
    currentName = player1;
    $('h3').text(currentName+": it is your turn, please pick a column to drop your blue chip.");
    currentColor = p1color;
  }else {
    currentName = player2
    $('h3').text(currentName+": it is your turn, please pick a column to drop your red chip.");
    currentColor = p2color;
  }




  //if (current_player === player1){
    //$('t').css('background-color',p1color);
    //onsole.log("change");
    //current_player = player2
  //}
  //else{
    //$('t').css('background-color',p2color);
    //current_player = player1
  //}


})
