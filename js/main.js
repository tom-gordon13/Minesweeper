/*----- constants -----*/
const sqSize = 4;
const maxSquares = 20;
const checkArray = [
    ['x', 'y - 1'],
    ['x', 'y + 1'],
    ['x - 1', 'y - 1'],
    ['x - 1', 'y'],
    ['x - 1', 'y + 1'],
    ['x + 1', 'y - 1'],
    ['x + 1', 'y'],
    ['x + 1', 'y + 1']
]

/*----- app's state (variables) -----*/
let mineArr;
let markerArr;
let boardArr;
let gameState; // null 
let clickedIdx; // Object that will hold the index value of the most recently clicked array

/*----- cached element references -----*/
//grab board, will be used to create squares
let boardDOM = document.getElementById('board');
let squaresDOM; //cached later, after buttons are generated
let squaresDOMNest; // Nested array of squares

/*----- event listeners -----*/
boardDOM.addEventListener('click', handleClick)


// function checkIdx() {
//     for (var i = 0; i <= squaresDOM.length; i++) {
//         (function (index) {
//             squaresDOM[index].addEventListener('click', function () {
//                 console.log("you clicked region number " + index);
//             })
//         })(i);
//     }
// }

/*----- functions -----*/
// TEST FUNCTIONS/VARIABLES
let size = 15;
let num = 10;
init(size);

// INITIALIZATION FUNCTIONS //
function init(size) {
    gameState = null;
    initSquares(size);
    chunkSquares(size);
    initBoard(size);
    initMines(num);
    assignMines();
    initMarkers();
}

function initMarkers() {
    markerArr = [];
}

function chunkSquares(size) {
    // Turns squares DOM elements (buttons) into a nested array the same size as the board
    squaresDOMNest = [];
    squaresDOMNew = [].concat(...squaresDOM)

    while (squaresDOMNew.length) {
        squaresDOMNest.push(
            squaresDOMNew.splice(0, size)
        )
    }
}

function initBoard(size) {
    //populate board data structure based on board size
    boardArr = new Array(size);
    boardArr.fill(new Array(size));
}

function initMines(numMines) {
    // console.log(numMines);
    mineArr = [];
    start_position: while (mineArr.length < numMines) {
        let arr1 = Math.floor(Math.random() * size);
        let arr2 = Math.floor(Math.random() * size);
        //CHECK IF MINE COORDINATES ALREADY EXIST, IF YES THEN RETURN TO START_POSITION
        if (mineArr.some(elem => elem.arr1 === arr1 && elem.arr2 === arr2)) continue start_position;

        // PUSH NEWLY-CREATED MINE TO mineArr
        mineArr.push({ name: `m${numMines}`, arr1: `${arr1}`, arr2: `${arr2}` });
    }
}



function checkVicinity(x, y) {
    let vicTotal = 0;
    let sqCheck = squaresDOMNest[x][y];
    sqCheck.style.backgroundColor = 'green';
    checkArray.forEach(function (elem) {
        if (squaresDOMNest[eval(elem[0])][eval(elem[1])].id) ++vicTotal;
        squaresDOMNest[eval(elem[0])][eval(elem[1])].style.backgroundColor = 'orange';
    })
    console.log(vicTotal)
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
        squaresDOMNest[mine.arr1][mine.arr2].id = 'mine';
        squaresDOMNest[mine.arr1][mine.arr2].style.backgroundColor = 'red';
    })
}


function handleClick(evt) {
    clickedIdx = { total: null, arr1: null, arr2: null }
    if (evt.target.id === 'mine') loseFunction();
    evt.target.id = 'clicked'
    // if (!evt.target.id) checkVicinity(1, 1);

    ///// TRYING TO EXTRACT INDEX OF CLICKED ELEMENT FROM PARENT NODE LIST
    if (evt.target.id !== 'mine') {
        clickedIdx.total = squaresDOM.findIndex(square => square.id === 'clicked');
        clickedIdx.arr1 = Math.floor(clickedIdx.total / size)
        clickedIdx.arr2 = clickedIdx.total % size;
        // let arr1clicked = clickedIdx
    }
}

function loseFunction() {
    alert('You lose!')
}

// RENDER FUNCTIONS //
function render() {

}

function renderMines() {

}

