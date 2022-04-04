// function extractClickedIdx(evt, element, elemName, idFind) {
//     if (evt.target.element !== elemName) {
//         clickedIdx.total = squaresDOM.findIndex(square => square.id === idFind);
//         clickedIdx.arr1 = Math.floor(clickedIdx.total / size)
//         clickedIdx.arr2 = clickedIdx.total % size;
//     }
// }

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

    // Check if clicked button index matches the index of a mine
    let incl = mineArr.some(elem => elem.total == clickedIdx.total);
    console.log(incl)
    if (incl) loseFunction();

    if (evt.target.className === 'marker' || evt.target.className === 'past-clicked') return;
    evt.target.id = 'clicked';




    // Way to test if a mine was clicked without touching the DOM




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

    extractClickedIdx(evt, 'marker'); //should replace commented code above ^^


    // evt.target.id = 'marker';

    // clickedIdx.total = squaresDOM.findIndex(square => square.id === 'marker');
    // clickedIdx.arr1 = Math.floor(clickedIdx.total / size)
    // clickedIdx.arr2 = clickedIdx.total % size;

    //ADD ELEMENT TO MARKER ARRAY (but first check if it is already included)
    markerArr.push(clickedIdx);
    evt.target.id = 'square';
    render();
}


