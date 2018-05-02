$(document).ready(function() {
   console.log('GAME LOADED');
   document.getElementById('console').innerHTML = 'Current Turn: X';
});

gameActive = true;
currTurn = 'X';
xSquares = [];
oSquares = [];

function clicked(id) {
   sqaure = document.getElementById(id);
   consoleDisplay = document.getElementById('console');
   if (!gameActive) return;
   if (currTurn == 'X') {
      if ($.inArray(id, oSquares) != -1) {
         consoleDisplay.innerHTML = 'Can\'t be on same place as: O';
         setTimeout(function() {
            consoleDisplay.innerHTML = 'Current Turn: X';
         }, 2000);
         return;
      }
      if ($.inArray(id, xSquares) != -1) {
         consoleDisplay.innerHTML = 'Can\'t place in the same square';
         setTimeout(function() {
            consoleDisplay.innerHTML = 'Current Turn: X';
         }, 2000);
         return;
      }
   } else {
      if ($.inArray(id, xSquares) != -1) {
         consoleDisplay.innerHTML = 'Can\'t be on same place as: X';
         setTimeout(function() {
            consoleDisplay.innerHTML = 'Current Turn: O';
         }, 2000);
         return
      }
      if ($.inArray(id, oSquares) != -1) {
         consoleDisplay.innerHTML = 'Can\'t place in the same square';
         setTimeout(function() {
            consoleDisplay.innerHTML = 'Current Turn: O';
         }, 2000);
         return
      }
   }

   possibleWinningSquareCombos = genWinningCombos(id);

   if (currTurn == 'X') {
      xSquares.push(id);
      sqaure.innerHTML = 'X';
      currTurn = 'O';
      consoleDisplay.innerHTML = 'Current Turn: O';
      for (i = 0; i < possibleWinningSquareCombos.length; i++) {
         counter = 0
         for (var j = 0; j < possibleWinningSquareCombos[i].length; j++) {
            if (xSquares.indexOf(possibleWinningSquareCombos[i][j]) != -1) {
               counter++
               if (counter == 3) {
                  gameOver('X', possibleWinningSquareCombos[i]);
                  return;
               }
            }
         }
      }
   } else {
      oSquares.push(id)
      sqaure.innerHTML = 'O';
      currTurn = 'X';
      consoleDisplay.innerHTML = 'Current Turn: X';
      for (i = 0; i < possibleWinningSquareCombos.length; i++) {
         counter = 0
         for (var j = 0; j < possibleWinningSquareCombos[i].length; j++) {
            if (oSquares.indexOf(possibleWinningSquareCombos[i][j]) != -1) {
               counter++
               if (counter == 3) {
                  gameOver('O', possibleWinningSquareCombos[i]);
                  return;
               }
            }
         }
      }
   }

   if (xSquares.length + oSquares.length == 9) {
      draw();
   }

}


function genWinningCombos(id) {
   validSquareIDs = [0,1,2,10,11,12,20,21,22];
   arr = [];
   arr.push([id, id+1, id+2])
   arr.push([id-2, id-1, id])
   arr.push([id-1, id, id+1])
   arr.push([id, id+10, id+20])
   arr.push([id-20, id-10, id])
   arr.push([id+10, id, id-10])
   arr.push([id, id+11, id+22])
   arr.push([id-22, id-11, id])
   arr.push([id-11, id, id+11])
   arr.push([id, id+9, id+18])
   arr.push([id-18, id-9, id])
   arr.push([id-9, id, id+9])
   arrsToRemove = [];
   for (i = 0; i < arr.length; i++) {
      for (j = 0; j < arr[i].length; j++) {
         if (!validSquareIDs.includes(arr[i][j])) {
            arrsToRemove.push(arr[i]);
            break;
         }
      }
   }
   for (i = 0; i < arrsToRemove.length; i++) {
      index = arr.indexOf(arrsToRemove[i]);
      arr.splice(index, 1);
   }
   return arr;
}


function gameOver(winner, squares) {
   pageConsole = document.getElementById('console');
   pageConsole.innerHTML = winner + ' wins';
   pageConsole.style.color = 'red';
   gameActive = false;
   for (var i = 0; i < squares.length; i++) {
      document.getElementById(squares[i]).style.backgroundColor = 'yellow';
   }
   document.getElementById('mask').style.display = 'block';
}

function draw() {
   pageConsole = document.getElementById('console');
   pageConsole.innerHTML = 'Draw';
   pageConsole.style.color = 'red';
   gameActive = false;
   document.getElementById('mask').style.display = 'block';
}
