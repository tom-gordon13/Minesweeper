/*----- constants -----*/
const playerOptions = {
    Beginner: { size: 9, numMines: 10, sqSize: 5, fontSize: 3.5, factor: 1.3 },
    Intermediate: { size: 20, numMines: 50, sqSize: 3, fontSize: 2.5, factor: 1.235 },
    Expert: { size: 30, numMines: 80, sqSize: 1.8, fontSize: 1.75, factor: 1.6 }
}
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
let difficulty = 'Beginner';
let clickedCounter;
let markerArr;
let boardArr;
let gameState = null;
let seconds;
let clickedIdx = { total: null, arr1: null, arr2: null }; // Object that will hold the index value of the most recently clicked array

/*----- cached element references -----*/
//grab board, will be used to create squares
let containerDOM = document.getElementById('game-contain');
let boardDOM = document.getElementById('board');
let squaresDOM; //cached later, after buttons are generated
let squaresDOMNest; // Nested array of squares
let markerCounter = document.getElementById('markerCount'); // Marker counter in upper lefthand corner of the screen
let timerDOM = document.getElementById('timer');
let resetDOM = document.getElementById('reset');
let footerDOM = document.querySelector('footer');

/*----- event listeners -----*/
boardDOM.addEventListener('click', handleClick) // Left click event listener
boardDOM.addEventListener('contextmenu', handleRightClick) // Right click event listener
resetDOM.addEventListener('click', handleResetClick) // Reset button event listener
footerDOM.addEventListener('click', handleOptClick)

/*----- functions -----*/
// TEST FUNCTIONS/VARIABLES
let size;
let num;
init();

// INITIALIZATION FUNCTIONS //
function init() {
    size = playerOptions[difficulty].size; //width of game board
    num = playerOptions[difficulty].numMines; // number of mines
    timerDOM.innerText = 0;
    gameState = null;
    initSquares(size);
    chunkSquares(size); //
    initBoard(size); //
    initMines(num); //
    assignMines(); //
    initMarkers(); //
    let timerID = setInterval(timerFunc, 1000);

    function timerFunc() {
        seconds = parseInt(timerDOM.innerText)
        timerDOM.innerText = seconds + 1;
    }
}

function initMarkers() {
    markerArr = [];
    document.getElementById('markerCount').innerText = num;
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
        // console.log(eval(elem[0]), eval(elem[1]));
        // squaresDOMNest[eval(elem[0])][eval(elem[1])].style.backgroundColor = 'orange';
    })
    return vicTotal;
}


function initSquares(size) {

    //Set board container size to fit squares
    containerDOM.style.width = `${(size * playerOptions[difficulty].sqSize) * 1.05}vmin`
    containerDOM.style.height = `${size * playerOptions[difficulty].sqSize * playerOptions[difficulty].factor}vmin`
    boardDOM.style.height = `${size * playerOptions[difficulty].sqSize}vmin` //needs to be different than container because container also contains the header

    // Delete all existing squares within the boardDOM element
    const remSq = [...document.querySelectorAll('.square, .square-past-clicked')];
    remSq.forEach(elem => { elem.remove() });

    // Initialize new squares based on chosen board size
    let numSquares = size ** 2;
    while (numSquares > 0) {
        let square = document.createElement('button');
        square.setAttribute('class', 'square');
        square.style.height = `${playerOptions[difficulty].sqSize}vmin`;
        square.style.width = `${playerOptions[difficulty].sqSize}vmin`;
        square.style.fontSize = `${playerOptions[difficulty].fontSize}vmin`;
        boardDOM.appendChild(square);
        numSquares--;
    }
    // Add button elements to an array that can be queried to match with board array
    squaresDOM = [...document.getElementsByClassName('square')];
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
    console.log(squaresDOMNest[clickedIdx.arr1][clickedIdx.arr2].style.backgroundColor);
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
        if (boardArr[elem.arr1][elem.arr2] !== 'marker') sqDOM.appendChild(img); // add mine image
        sqDOM.style.backgroundColor = '#E8E8E8';
    })
}

function checkWin() {
    let matchCount = 0;
    mineArr.forEach(function (mine) {
        if (markerArr.some(marker => marker.total === mine.total)) matchCount += 1;
    })
    console.log(matchCount)
    if (matchCount === num && markerArr.length === num) winFunction();
    clickedCounter = boardArr.flat().filter(elem => Number.isInteger(elem)).length;
    if (clickedCounter === (size * size) - num) winFunction();
}

function winFunction() {
    alert('You win!');
    init(size);
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



function handleResetClick() {
    init(size);
}
