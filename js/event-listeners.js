function extractClickedIdx(evt, idName) {
    evt.target.id = idName;
    clickedIdx.total = squaresDOM.findIndex(square => square.id === idName);
    clickedIdx.arr1 = Math.floor(clickedIdx.total / size)
    clickedIdx.arr2 = clickedIdx.total % size;
    evt.target.removeAttribute('id'); // Remove 'clicked' id so that it does not interfere with next square clicked
}


// LEFT CLICK EVENT LISTENER
let handleClick = function handleClick(evt) {
    clickedIdx = { total: null, arr1: null, arr2: null } // Reset Clicked Index object
    extractClickedIdx(evt, 'clicked'); // Extract the index of a square that was clicked

    if (boardArr[clickedIdx.arr1][clickedIdx.arr2]) return; // Ignore click if click index matches a marker index
    if (mineArr.some(elem => elem.total == clickedIdx.total)) loseFunction(); // Check if clicked button index matches the index of a mine

    let vicTotal = checkVicinity(clickedIdx.arr1, clickedIdx.arr2)
    boardArr[clickedIdx.arr1][clickedIdx.arr2] = vicTotal; // add vicinity mines to boardArr
    evt.target.innerText = vicTotal;
    evt.target.style.color = vicColors[vicTotal];

    evt.target.className += '-past-clicked' // Obtain "square-past-clicked" styling

    render();
}


// RIGHT CLICK EVENT LISTENER
let handleRightClick = function handleRightClick(evt) {
    evt.preventDefault(); // Prevents default "right click" action from occuring
    clickedIdx = { total: null, arr1: null, arr2: null } // Reset Clicked Index object

    if (evt.target.className === 'markerImg') { evt.target.parentElement.id = 'clicked' };
    extractClickedIdx(evt, 'clicked'); // return index of element that was clicked

    if (Number.isInteger(boardArr[clickedIdx.arr1][clickedIdx.arr2])) return; // ignores right clicks on pieces that have already been left-clicked

    if (boardArr[clickedIdx.arr1][clickedIdx.arr2] === 'marker') {
        boardArr[clickedIdx.arr1][clickedIdx.arr2] = '';
        let idx = markerArr.findIndex(elem => elem.total === clickedIdx.total);
        markerArr.splice(idx, 1);
        let sqDOM = squaresDOMNest[clickedIdx.arr1][clickedIdx.arr2];
        sqDOM.removeChild(sqDOM.firstElementChild);

        render();
        return;
    };

    boardArr[clickedIdx.arr1][clickedIdx.arr2] = 'marker'; // Add marker to the boardArr that was clicked

    extractClickedIdx(evt, 'marker');

    //ADD ELEMENT TO MARKER ARRAY (but first check if it is already included)
    markerArr.push(clickedIdx);
    evt.target.id = 'square';
    render();
}



