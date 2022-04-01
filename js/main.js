/*----- constants -----*/
const sqSize = 4;
const maxSquares = 20;

/*----- app's state (variables) -----*/
let mineArr;
let markerArr;
let boardArr;


/*----- cached element references -----*/
//grab board, will be used to create squares
let boardDOM = document.getElementById('board');


/*----- event listeners -----*/



/*----- functions -----*/
// TEST FUNCTIONS/VARIABLES
let size = 10
let num = 10;
initSquares(size);
initBoard(size);
initMines(num)

// INITIALIZATION FUNCTIONS //
function init() {

}

function initBoard(size) {
    //populate board data structure based on board size
    boardArr = new Array(size);
    boardArr.fill(new Array(size))
}

function initMines(num) {
    mineArr = [];
    while (num > 0) {
        let arr1 = Math.floor(Math.random() * num)
        console.log(arr1)
        let arr2 = Math.floor(Math.random() * num)
        console.log(arr2)
        mineArr.push({ name: `m${num}`, arr1: `[${arr1}]`, arr2: `[${arr2}]` });
        num--;
    }
}

function initSquares(size) {

    //Set board container size to fit squares
    boardDOM.style.height = `${size * sqSize}vh`
    boardDOM.style.width = `${size * sqSize}vh`



    if (size > maxSquares) return;
    let numSquares = size ** 2;

    // Initialize new squares based on chosen board size
    while (numSquares > 0) {
        let square = document.createElement('button');
        square.setAttribute('class', 'square');
        square.style.height = `${sqSize}vh`;
        square.style.width = `${sqSize}vh`;
        boardDOM.appendChild(square);
        numSquares--;
    }
}

function initMines(num) {

}






// RENDER FUNCTIONS //
function render() {

}