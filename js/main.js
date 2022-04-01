/*----- constants -----*/



/*----- app's state (variables) -----*/



/*----- cached element references -----*/
//grab board, will be used to create squares
let boardDOM = document.getElementById('board');


/*----- event listeners -----*/



/*----- functions -----*/

// INITIALIZATION FUNCTIONS //
function init() {

}

function initBoard(size) {
    if (size > 10) return;
    let numSquares = size ** 2;
    console.log(numSquares)
    while (numSquares > 0) {
        let square = document.createElement('div');
        square.setAttribute('class', 'square');
        square.style.height = `${boardDOM.clientHeight / size}px`
        square.style.width = `${boardDOM.clientWidth / size}px`
        boardDOM.appendChild(square);
        numSquares--;
    };
}

initBoard(9);


// RENDER FUNCTIONS //
function render() {

}