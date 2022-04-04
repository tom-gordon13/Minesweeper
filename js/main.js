/*----- constants -----*/
const sqSize = 4;
const maxSquares = 20;
const imgMarker = 'images/flag-marker.png';
const vicColors = {
    1: 'blue',
    2: 'green',
    3: 'red',
    4: 'darkblue',
}
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
let containerDOM = document.getElementById('game-contain');
let boardDOM = document.getElementById('board');
let squaresDOM; //cached later, after buttons are generated
let squaresDOMNest; // Nested array of squares
let markerCounter = document.getElementById('markerCount'); // Marker counter in upper lefthand corner of the screen

/*----- event listeners -----*/
boardDOM.addEventListener('click', handleClick)
boardDOM.addEventListener('contextmenu', handleRightClick)



/*----- functions -----*/
// TEST FUNCTIONS/VARIABLES
let size = 10; //width of game board
let num = 10; // number of mines
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
    // Turns 'squares' DOM elements (buttons) into a nested array the same size as the board
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
    mineArr = [];
    while (mineArr.length < numMines) {
        let arr1 = Math.floor(Math.random() * size);
        let arr2 = Math.floor(Math.random() * size);
        //CHECK IF MINE COORDINATES ALREADY EXIST, IF YES THEN RETURN TO START_POSITION
        if (mineArr.some(elem => elem.arr1 === arr1 && elem.arr2 === arr2)) continue;

        // PUSH NEWLY-CREATED MINE TO mineArr
        mineArr.push({ name: `m${mineArr.length}`, arr1: `${arr1}`, arr2: `${arr2}`, total: `${size * arr1 + arr2}` });
    }
}


function checkVicinity(x, y) {
    let vicTotal = 0; //vicTotal === vicinity total, i.e. number of mines in adjacent squares

    checkArray.forEach(function (elem) {
        // First line adjusts for squares on the edge of board, second line checks for mines
        if (eval(elem[0]) < 0 || eval(elem[0]) > size - 1 || squaresDOMNest[eval(elem[0])][eval(elem[1])] === undefined) return; // ignores undefined, coordinates < 0
        if (squaresDOMNest[eval(elem[0])][eval(elem[1])].class === 'mine') ++vicTotal;
    })
    return vicTotal;
}


function initSquares(size) {

    //Set board container size to fit squares
    containerDOM.style.width = `${size * sqSize}vmin`
    boardDOM.style.height = `${size * sqSize}vmin` //needs to be different than container because container also contains the header
    // boardDOM.style.width = `${size * sqSize}vmin`

    // Initialize new squares based on chosen board size
    let numSquares = size ** 2;
    while (numSquares > 0) {
        let square = document.createElement('button');
        square.setAttribute('class', 'square');
        square.style.height = `${sqSize}vmin`;
        square.style.width = `${sqSize}vmin`;
        boardDOM.appendChild(square);
        numSquares--;
    }
    // Add button elements to an array that can be queried to match with board array
    squaresDOM = [...document.querySelectorAll('button')];
}


function assignMines() {
    // Assign mines to the board element, MAY BE ABLE TO REMOVE THIS FUNCTION
    mineArr.forEach(function (mine) {
        squaresDOMNest[mine.arr1][mine.arr2].class = 'mine';
        squaresDOMNest[mine.arr1][mine.arr2].style.backgroundColor = 'red';
    })
}



function loseFunction() {
    alert('You lose!')
    init(size);
}

// RENDER FUNCTIONS //
function render() {
    renderMines();
    renderMarkerCount();
}

function renderMines() {

}

function renderMarkerCount() {
    markerCounter.innerText = markerArr.length;
}

