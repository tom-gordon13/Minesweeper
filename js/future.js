// Future function that will allow clicks to expose all squares with vicTotal = 0 in adjacent squares
function openAdj(x, y) {
    let arr = [['x+1', 'y'], ['x-1', 'y'], ['x', 'y+1'], ['x', 'y-1']]
    let baseX = x;
    let baseY = y;
    arr.forEach(function (elem) {
        let value = 0;
        x = baseX; // set base coordinates of square clicked
        y = baseY;
        value = boardArr[x][y]
        while (value === 0) {
            x = eval(elem[0]); // increment to next square
            y = eval(elem[1]);
            if (x < 0 || x >= playerOptions[difficulty].size) return; //check for edge of board cases
            if (y < 0 || y >= playerOptions[difficulty].size) return;
            sqCheck = boardArr[x][y];
            if (Number.isInteger(sqCheck) && sqCheck > 0 && typeof (sqCheck) !== 'string') squaresDOMNest[x][y].innerText = sqCheck;
            if (typeof (sqCheck) !== 'string' && squaresDOMNest[x][y].className === 'square') squaresDOMNest[x][y].className += '-past-clicked';
            squaresDOMNest[x][y].style.color = vicColors[sqCheck]
            value = sqCheck;
        }
    })
    render();
}