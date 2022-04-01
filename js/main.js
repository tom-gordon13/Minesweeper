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
let squaresDOM; //cached later, after buttons are generated
let squaresDOMNest;



/*----- event listeners -----*/



/*----- functions -----*/
// TEST FUNCTIONS/VARIABLES
let size = 10
let num = 10;
init(10);

// INITIALIZATION FUNCTIONS //
function init(size) {
    initSquares(size);
    chunkSquares(size);
    initBoard(size);
    initMines(num);
    initMarkers();
}

function initMarkers() {
    markerArr = [];
}

function chunkSquares(size) {
    // Turns squares DOM elements (buttons) into a nested array the same size as the board
    squaresDOMNest = [];
    squaresDOM = [].concat(...squaresDOM)

    while (squaresDOM.length) {
        squaresDOMNest.push(
            squaresDOM.splice(0, size)
        )
    }

    // return squaresDOMNest;
}

function initBoard(size) {
    //populate board data structure based on board size
    boardArr = new Array(size);
    boardArr.fill(new Array(size));
}

function initMines(numMines) {
    // console.log(numMines);
    mineArr = [];
    while (numMines > 0) {
        let arr1 = Math.floor(Math.random() * numMines);
        let arr2 = Math.floor(Math.random() * numMines);
        mineArr.push({ name: `m${numMines}`, arr1: `${arr1}`, arr2: `${arr2}` });
        numMines = numMines - 1;

    }
}

function checkVicinity() {

}

function initSquares(size) {

    //Set board container size to fit squares
    boardDOM.style.height = `${size * sqSize}vmin`
    boardDOM.style.width = `${size * sqSize}vmin`



    if (size > maxSquares) return;
    let numSquares = size ** 2;

    // Initialize new squares based on chosen board size
    while (numSquares > 0) {
        let square = document.createElement('button');
        square.setAttribute('class', 'square');
        square.style.height = `${sqSize}vmin`;
        square.style.width = `${sqSize}vmin`;
        boardDOM.appendChild(square);
        numSquares--;
    }
    squaresDOM = [...document.querySelectorAll('button')];
}


function assignMines() {
    mineArr.forEach(function (mine) {
        // console.log(mine.arr1, mine.arr2)
        squaresDOMNest[mine.arr1][mine.arr2].id = 'mine';
    })
}


// RENDER FUNCTIONS //
function render() {

}

function renderMines() {

}

