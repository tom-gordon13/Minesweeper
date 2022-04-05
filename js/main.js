/*----- constants -----*/
const sqSize = 4;
const maxSquares = 20;
const imgMarker = 'images/flag-marker.png';
const imgMine = 'images/mine.png'
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
let gameState = null;
let clickedIdx = { total: null, arr1: null, arr2: null }; // Object that will hold the index value of the most recently clicked array

/*----- cached element references -----*/
//grab board, will be used to create squares
let containerDOM = document.getElementById('game-contain');
let boardDOM = document.getElementById('board');
let squaresDOM; //cached later, after buttons are generated
let squaresDOMNest; // Nested array of squares
let markerCounter = document.getElementById('markerCount'); // Marker counter in upper lefthand corner of the screen
let timerDOM = document.getElementById('timer');

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
    chunkSquares(size); //
    initBoard(size); //
    initMines(num); //
    assignMines(); //
    initMarkers(); //
}

function initMarkers() {
    markerArr = [];
    document.getElementById('markerCount').innerText = num;
}


let timerID = setInterval(timerFunc, 1000);

function timerFunc() {
    let seconds = parseInt(timerDOM.innerText)
    timerDOM.innerText = seconds + 1;
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

    boardArr = new Array(size);

    for (let i = 0; i < boardArr.length; i++) {
        boardArr[i] = new Array(size).fill('')
    }
}


function initMines(numMines) {
    mineArr = [];
    while (mineArr.length < numMines) {
        let arr1 = Math.floor(Math.random() * size);
        let arr2 = Math.floor(Math.random() * size);
        //CHECK IF MINE COORDINATES ALREADY EXIST, IF YES THEN RETURN TO START_POSITION
        if (mineArr.some(elem => eval(elem.arr1) === arr1 && eval(elem.arr2) === arr2)) continue;

        // PUSH NEWLY-CREATED MINE TO mineArr
        mineArr.push({ name: `m${mineArr.length}`, arr1: arr1, arr2: arr2, total: size * arr1 + arr2 });
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
    gameState = 'L';
    squaresDOMNest[clickedIdx.arr1][clickedIdx.arr2].style.backgroundColor = 'red';
    render();
    // init(size);
}

// RENDER FUNCTIONS //
function render() {
    renderMines(gameState);
    renderMarkers();
    checkWin();
}

function renderMines(gameState) {
    if (gameState === null) return;
    mineArr.forEach(function (elem) {
        let img = document.createElement('img')
        img.src = imgMine;
        img.className = 'mineImg'
        let sqDOM = squaresDOMNest[elem.arr1][elem.arr2];
        // sqDOM.removeChild(sqDOM.firstElementChild); // remove marker image
        sqDOM.appendChild(img); // add mine image
        sqDOM.style.backgroundColor = '#E8E8E8';
    })
}

function checkWin() {
    let matchCount = 0;
    mineArr.forEach(function (mine) {
        if (markerArr.some(marker => marker.total === mine.total)) matchCount += 1;
    })
    if (matchCount === size && markerArr.length === num) winFunction();
}

function winFunction() {
    alert('You win!')
}


function renderMarkers() {
    let img = document.createElement('img')
    img.src = imgMarker;
    img.className = 'markerImg'

    // markerArr.forEach(elem => squaresDOMNest[elem.arr1][elem.arr2].appendChild(img));
    markerArr.forEach(function (elem) {
        if (!squaresDOMNest[elem.arr1][elem.arr2].hasChildNodes()) squaresDOMNest[elem.arr1][elem.arr2].appendChild(img)
    })
    markerCounter.innerText = num - markerArr.length; // Update marker counter
}


function renderVic() {

}

