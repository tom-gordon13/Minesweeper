// Future function that will allow clicks to expose all squares with vicTotal = 0 in adjacent squares
function openBlanks(x, y) {
    let arr = [['x+1', 'y'], ['x-1', 'y'], ['x', 'y+1'], ['x', 'y-1']]
    let baseX = x;
    let baseY = y;
    arr.forEach(function (elem) {
        let value = 0;
        let sqCheck;
        x = baseX;
        y = baseY;
        while (value === 0) {
            if (sqCheck) value = sqCheck;
            if (eval(elem[0]) < 0 || eval(elem[0]) >= playerOptions[difficulty].size) return;
            if (eval(elem[1]) < 0 || eval(elem[1]) >= playerOptions[difficulty].size) return;
            sqCheck = boardArr[eval(elem[0])][eval(elem[1])]
            if (Number.isInteger(sqCheck) && sqCheck > 0 && typeof (sqCheck) !== 'string') squaresDOMNest[eval(elem[0])][eval(elem[1])].innerText = sqCheck;
            // if (Number.isInteger(sqCheck)) squaresDOMNest[eval(elem[0])][eval(elem[1])].innerText = sqCheck;
            if (typeof (sqCheck) !== 'string') squaresDOMNest[eval(elem[0])][eval(elem[1])].className += '-past-clicked';
            squaresDOMNest[eval(elem[0])][eval(elem[1])].style.color = vicColors[sqCheck]
            x = eval(elem[0]);
            y = eval(elem[1]);
        }
    })
    render();
}