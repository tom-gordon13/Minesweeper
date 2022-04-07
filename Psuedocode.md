1) Define required constants
    1.1) size of game board (could move to "state of the game" if I'm able to implement a player option for size)
    1.2) number of mines (similar to above, could move to "state of the game" if I am able to implement difficulty options)

2) Define required variables used to track the state of the game
    2.1) use an array (or nested arrays?) to represent the game board
    2.2) Ten mines with randomly-generated coordinates
        2.2.1) coordinates will correspond to 1) the mine's array and 2) the mine's position within that array
        2.2.2) after coordinates are initialized, a function will parse each square on the board and determine how many mines are in that square's vicinity
            2.2.2.1) DOM will assign a numerical value to that square indicating number of mines, will be set to "hidden" to start
    2.3) Markers (event listeners with right clicks)
        2.3.1) Will also keep these in a separate array - render function will display them on the board
        2.3.2) counter for total number of markers laid down
    2.3) Timer which counts up to see how much time has elapsed since the player began
        2.3.1) If I get to it, could try to implement an option where this counts down to zero (should be doable with a setTimeout() function)
    2.4) Define 'gameState', which will be null if player has not won, L if player clicks on a mine, or W if player marks all of the mines


3) Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant.
    3.1) Store the square elements that will be the board pieces in the game (81 squares if 9x9 board, 100 squares if 10x10, etc)
    3.2) Store the marker counter which will increase every time the player lays down a new marker

4) Upon loading the app should:
	4.1) Initialize the state variables
        4.1.1) Randomly assign mine positions
            4.1.1.1) create a "Mines" class, then generate 10 mine objects with coordinates randomly-generated
        4.1.2) For each square on the board, run a function to determine how many mines are within its vicinity 
            4.1.2.1) Assign these vicinity values to the board array (numbers will be hidden)
        4.1.2) Set timer to 0:00
        4.1.3) initialize "Marker counter" to zero
	4.2) Render those values to the page
        4.2.1) Render "blank" game board
        4.2.2) Timer begins counting up
	4.3) Wait for the user to click a square

5) Handle a player clicking a square
    5.1) If left click:
        5.1.1) Check if spot holds a mine
            5.1.1.1) If so, player loses - render board showing all mines, loser message, etc
            5.1.1.2) If no mine, for the given square, assign visibility to "visible" then re-render board
    5.2) If right click:
        5.2.1) Log a marker in the marker array for the spot that was clicked - render board showing changes

6) Handle a player clicking the replay button
    6.1) Mine placements are regenerated, function is re-run to determine vicinity of mines to squares
    6.2) Marker array cleared out
    6.3) Timer resets to zero