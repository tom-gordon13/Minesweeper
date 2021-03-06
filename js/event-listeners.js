function extractClickedIdx(evt, idName) {
    if (evt.target.id === 'board') return;
    evt.target.id = idName;
    clickedIdx.total = squaresDOM.findIndex(square => square.id === idName);
    clickedIdx.arr1 = Math.floor(clickedIdx.total / size)
    clickedIdx.arr2 = clickedIdx.total % size;
    evt.target.removeAttribute('id'); // Remove 'clicked' id so that it does not interfere with next square clicked
}

// LEFT CLICK EVENT LISTENER
let handleClick = function handleClick(evt) {
    if (gameState) return; // Ignore clicks if gameState is 'W' or 'L'
    clickedIdx = { total: null, arr1: null, arr2: null } // Reset Clicked Index object
    extractClickedIdx(evt, 'clicked'); // Extract the index of a square that was clicked
    let leftClickIdx = clickedIdx;
    if (!Number.isInteger(clickedIdx.total)) return;
    if (leftClickIdx.total === -1) return;
    if (boardArr[leftClickIdx.arr1][leftClickIdx.arr2] === 'marker') return; // Ignore click if click index matches a marker index
    if (mineArr.some(elem => elem.total == leftClickIdx.total)) { loseFunction(); return; }; // Check if clicked button index matches the index of a mine

    let vicTotal = checkVicinity(leftClickIdx.arr1, leftClickIdx.arr2)
    boardArr[leftClickIdx.arr1][leftClickIdx.arr2] = vicTotal; // add vicinity mines to boardArr
    openAdj(leftClickIdx.arr1, leftClickIdx.arr2) // Opens up adjacent zeros when a square is clicked, currently only on same x and y axis of the square
    leftClickedSq = evt.target;
    render();
}

// RIGHT CLICK EVENT LISTENER
let handleRightClick = function handleRightClick(evt) {
    evt.preventDefault(); // Prevents default "right click" action from occuring
    if (gameState) return;
    clickedIdx = { total: null, arr1: null, arr2: null } // Reset Clicked Index object
    if (evt.target.className === 'markerImg') { evt.target.parentElement.id = 'clicked' };
    extractClickedIdx(evt, 'clicked'); // return index of element that was clicked
    let rightClickIdx = clickedIdx;

    if (squaresDOMNest[rightClickIdx.arr1][rightClickIdx.arr2].className === 'square-past-clicked') return; // ignores right clicks on pieces that have already been left-clicked
    if (boardArr[rightClickIdx.arr1][rightClickIdx.arr2] === 'marker') {
        boardArr[rightClickIdx.arr1][rightClickIdx.arr2] = '';
        let idx = markerArr.findIndex(elem => elem.total === rightClickIdx.total);
        markerArr.splice(idx, 1);
        rightClickedSq = squaresDOMNest[rightClickIdx.arr1][rightClickIdx.arr2];
        rightClickedSq.removeChild(rightClickedSq.firstElementChild);
        render();
        return;
    };

    boardArr[rightClickIdx.arr1][rightClickIdx.arr2] = 'marker'; // Add marker to the boardArr that warightClickIdx
    extractClickedIdx(evt, 'marker');

    //ADD ELEMENT TO MARKER ARRAY (but first check if it is already included)
    markerArr.push(rightClickIdx);
    evt.target.id = 'square';
    render();
}

function handleOptClick(evt) {
    if (evt.target.className !== 'opt-btn') return;
    difficulty = evt.target.innerText;
    init();
}
