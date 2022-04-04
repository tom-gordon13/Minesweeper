function extractClickedIdx(evt, idName) {
    evt.target.id = idName;
    clickedIdx.total = squaresDOM.findIndex(square => square.id === idName);
    clickedIdx.arr1 = Math.floor(clickedIdx.total / size)
    clickedIdx.arr2 = clickedIdx.total % size;
}


// LEFT CLICK EVENT LISTENER
let handleClick = function handleClick(evt) {

    clickedIdx = { total: null, arr1: null, arr2: null }

    // Extract the index of a square that was clicked
    extractClickedIdx(evt, 'clicked');

    // Check if clicked button matches the index of a marker
    if (markerArr.some(elem => elem.total === clickedIdx.total)) return;

    // Check if clicked button index matches the index of a mine
    if (mineArr.some(elem => elem.total == clickedIdx.total)) loseFunction();

    if (evt.target.className === 'marker' || evt.target.className === 'past-clicked') return;
    evt.target.id = 'clicked';


    let vicTotal = checkVicinity(clickedIdx.arr1, clickedIdx.arr2)
    evt.target.innerText = vicTotal;
    evt.target.style.color = vicColors[vicTotal];

    // Remove 'clicked' id so that it does not interfere with next square clicked
    evt.target.removeAttribute('id')
    evt.target.className += '-past-clicked' // Obtain "square-past-clicked" styling

    render();
}








// RIGHT CLICK EVENT LISTENER
let handleRightClick = function handleRightClick(evt) {


    evt.preventDefault(); // Prevents default "right click" action from occuring
    clickedIdx = { total: null, arr1: null, arr2: null }
    if (evt.target.innerText) return; // ignores right clicks on pieces that have already been left-clicked

    extractClickedIdx(evt, 'clicked');
    let boardArrClick = boardArr[clickedIdx.arr1][clickedIdx.arr2]
    if (boardArrClick === 'marker') return;
    boardArrClick = 'marker';


    if (evt.target.className === 'markerImg') {
        console.log(evt.target.parentElement)
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


    ///// EXTRACT INDEX OF CLICKED ELEMENT FROM PARENT NODE LIST, ASSIGN TO CLASS 'MARKER'
    clickedIdx = { total: null, arr1: null, arr2: null };

    extractClickedIdx(evt, 'marker');

    //ADD ELEMENT TO MARKER ARRAY (but first check if it is already included)
    markerArr.push(clickedIdx);
    evt.target.id = 'square';
    render();
}



