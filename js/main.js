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
let boardDOM = document.getElementById('board');
let squaresDOM; //cached later, after buttons are generated
let squaresDOMNest; // Nested array of squares
let markerCounter = document.getElementById('markerCount'); // Marker counter in upper lefthand corner of the screen

/*----- event listeners -----*/
boardDOM.addEventListener('click', handleClick)
boardDOM.addEventListener('contextmenu', handleRightClick)



/*----- functions -----*/
// TEST FUNCTIONS/VARIABLES
let size = 20; //width of game board
let num = 50; // number of mines
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
        mineArr.push({ name: `m${mineArr.length}`, arr1: `${arr1}`, arr2: `${arr2}` });
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
        squaresDOMNest[mine.arr1][mine.arr2].class = 'mine';
        squaresDOMNest[mine.arr1][mine.arr2].style.backgroundColor = 'red';
    })
}


function handleClick(evt) {
    clickedIdx = { total: null, arr1: null, arr2: null }
    if (evt.target.class === 'mine') loseFunction();
    if (evt.target.className === 'marker' || evt.target.className === 'past-clicked') return;
    evt.target.id = 'clicked';

    ///// EXTRACT INDEX OF CLICKED ELEMENT FROM PARENT NODE LIST
    if (evt.target.class !== 'mine') {
        clickedIdx.total = squaresDOM.findIndex(square => square.id === 'clicked');
        clickedIdx.arr1 = Math.floor(clickedIdx.total / size)
        clickedIdx.arr2 = clickedIdx.total % size;
    }
    let vicTotal = checkVicinity(clickedIdx.arr1, clickedIdx.arr2)
    evt.target.innerText = vicTotal;
    evt.target.style.color = vicColors[vicTotal];

    // Remove 'clicked' id so that it does not interfere with next square clicked
    evt.target.removeAttribute('id')
    evt.target.className += '-past-clicked'

    render();
}


function handleRightClick(evt) {
    // Prevents default "right click" action from occuring
    evt.preventDefault();


    if (evt.target.className === 'square-past-clicked') return;
    if (evt.target.className === 'markerImg') {
        evt.target.parentElement.className = 'square';


        // If right click on a market, remove that marker from the markerArr
        clickedIdx = { total: null, arr1: null, arr2: null };
        evt.target.parentElement.id = 'rmv-marker';
        clickedIdx.total = squaresDOM.findIndex(square => square.id === 'rmv-marker');
        let idx = markerArr.findIndex(elem => elem.total = clickedIdx.total);
        markerArr.splice(idx, 1);

        //Remove marker image
        evt.target.remove();

        renderMarkerCount();
        return;
    }

    let img = document.createElement('img')
    img.src = imgMarker;
    img.className = 'markerImg'
    evt.target.appendChild(img)

    ///// EXTRACT INDEX OF CLICKED ELEMENT FROM PARENT NODE LIST, ASSIGN TO CLASS 'MARKER'
    clickedIdx = { total: null, arr1: null, arr2: null };
    evt.target.id = 'marker';
    clickedIdx.total = squaresDOM.findIndex(square => square.id === 'marker');
    clickedIdx.arr1 = Math.floor(clickedIdx.total / size)
    clickedIdx.arr2 = clickedIdx.total % size;

    //ADD ELEMENT TO MARKER ARRAY (but first check if it is already included)
    markerArr.push(clickedIdx);
    evt.target.id = 'square';
    render();
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

