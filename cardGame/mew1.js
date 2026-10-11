// js/script.js

//Declaring initial values for variables
let shuff = false;
let clicks = 0;
let gameStarted = false;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;
let boardSize = null;

//function called when the player loses the game, activates the template for the gameover overlay in the html
function gameOver(){
    const template = document.getElementById("GameOver");
    const clone = template.content.cloneNode(true);
    document.getElementById("loss").appendChild(clone);

    document.getElementById('playAgainBtn').addEventListener('click', () => {
        location.reload();
    })
}
//function is called when the user wins the game, calls the template in the html which is the win overlay
function gameWin(){
    const template = document.getElementById("GameOverWin");
    const clone = template.content.cloneNode(true);
    document.getElementById("win").appendChild(clone);
    document.getElementById('playAgain').addEventListener('click', () => {
        location.reload();
    })
}
//Main function that does all the logic and visuals for flipping the cards, also used with the checkwin() function to check if the game is over and if the user has won.
function flipCard(cardElement, imgSrc) {
    console.log(boardValue);
    if(2*(boardValue[0]*boardValue[2])<clicks) gameOver();


    if(!gameStarted) return;
    if (lockBoard) return;

    const img = cardElement.querySelector("img");
    if (img.src.includes(imgSrc)) return;
    img.src = imgSrc;

    if (!firstCard) {
        clicks++;
        if(2*(boardValue[0]*boardValue[2])<clicks) gameOver();
        document.getElementById('counterDisplay').textContent = `${clicks}`;
        firstCard = img;
        return;
    }
    secondCard = img;
    clicks++;
    if(2*(boardValue[0]*boardValue[2])<clicks) gameOver();
    document.getElementById('counterDisplay').textContent = `${clicks}`;
    lockBoard = true;
    checkMatch();
}
function checkMatch() {
    console.log(firstCard.src, secondCard.src);
    console.log(firstCard.src.split("_").pop(), secondCard.src.split("_").pop());
    console.log(firstCard.src.split("_").pop() === secondCard.src.split("_").pop())
    console.log(firstCard)
    const match = firstCard.src.split("_").pop() === secondCard.src.split("_").pop();

    setTimeout(() => {
        if (!match) {
            firstCard.src = "images/back.jpg";
            secondCard.src = "images/back.jpg";
            resetTurn();
        }
        }, 600);
    if(match) {
        firstCard.classList.add("highlight");
        secondCard.classList.add("highlight");
        matches ++;
        document.getElementById('pairsDisplay').textContent= `${matches}`;
        console.log(matches);
        checkWin();
        resetTurn();
    }

}
//function resets the current turn by clearing the first and second card selections and unlocking the board so the player can continue clicking cards
function resetTurn(){
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

//function shuffles the cards randomly using the Fisher-Yates shuffle algorithm this is called when the player presses the shuffle button before starting the game
function getShuffled(cards) {

    const shuffled = [...cards];
    shuff = true;
    //this loops through the array backwards and swaps each card with a random index to shuffle the cards.
    for (let i = shuffled.length -1; i>0; i--) {
        const randomIndex = Math.floor(Math.random()* (i+1));
        [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
    }

    return shuffled;
}
//function checks whether the player has matched all the pairs on the board if the number of matches equals the total number of pairs then the player wins and the gamewin() function is called
function checkWin(){
    if(matches===((boardValue[0]*boardValue[2])/2)) gameWin();
    return;
}

//event listener that runs once the page has finished loading used to initialise the start menu, counters and button event listeners all the things that have to run after the page has loaded.
document.addEventListener('DOMContentLoaded', () => {

    //initialises the click and pair counters on the page
    document.getElementById('counterDisplay').textContent = `${clicks}`;
    document.getElementById('pairsDisplay').textContent = `${matches}`;
    const button = document.getElementById('startGameBtn');
    //loads the start menu template to the html page
    const template = document.getElementById("temp");
    const clone = template.content.cloneNode(true);
    document.getElementById("startMenu").appendChild(clone);
    //event listener for the start button which begins the game and checks if the player has shuffled the cards before allowing them to start, also clears the start menu from the page once the game starts.
    document.getElementById("Start").addEventListener("click", () => {
        if (!shuff) return alert("Please shuffle the cards first!");
        clicks = 0;
        gameStarted = true;
        document.getElementById("startMenu").innerHTML = "";
    })

    //event listener for the initialise cards button this loads the correct board layout depending on the size selected by the user i felt this was better than just automatically loading the first size they press as it adds a security layer to stop missclicks
    document.getElementById('startGameBtn').addEventListener('click', () => {
        //reset counters when starting a new game
        clicks = 0;
        document.getElementById('counterDisplay').textContent = `${clicks}`;
        document.getElementById('pairsDisplay').textContent = `${matches}`;
        console.log(clicks);

        shuff = false;

        //gets the selected board size from the radio buttons
        const selected = document.querySelector('input[name="boardSize"]:checked');
        //if no board size is selected show an alert and return early to prevent the rest of the code from running
        if (!selected) {
            return alert("Please select a board size!");
            return;
        }else {
            //show the shuffle/start buttons and the card board area
            document.getElementById("SSbuttons").style.visibility = "visible";
            document.getElementById("cardbg").style.visibility = "visible";

            //store the selected board size value (2x4, 4x4, 6x4) in a global variable so i can access it later to work out number of clicks before loss
            boardValue = selected.value;
            const activeBoard = document.getElementById('activeBoard');
            console.log(boardValue);

            //clear any existing board before loading a new one
            activeBoard.innerHTML = '';

            //determine which template should be used depending on board size
            const templateId = boardValue === '2x4' ? 'board2x4Template' :
                boardValue === '4x4' ? 'board4x4Template' :
                    'board6x4Template';

            //clone the selected board template
            const template = document.getElementById(templateId);
            const clone = template.content.cloneNode(true);

            //add the board to the page
            activeBoard.appendChild(clone);

            //make the board visible
            const boardSection = activeBoard.querySelector('section');
            boardSection.style.visibility = 'visible';

            //set up the shuffle button functionality
            const btnShuffle = document.getElementById('btnShuffle');
            document.getElementById('counterDisplay').textContent = `${clicks}`;
            //when shuffle is clicked the cards are randomly rearranged using the getShuffled function and the click counter is reset to 0 to prevent the player from losing immediately after shuffling
            btnShuffle.onclick = () => {
                const cards = Array.from(boardSection.querySelectorAll('.card'));
                boardSection.innerHTML = '';
                getShuffled(cards).forEach(card => boardSection.appendChild(card));
            };

        }
    });
    //event listener attached to the initialise cards button adds additional shuffle behaviour depending on board size
    //Does similiar things to the code above but has critical lines i couldn't move so i had to leave it
    button.addEventListener('click', () => {
        btnShuffle = document.querySelector('#btnShuffle');
        if(btnShuffle) {
            btnShuffle.addEventListener('click', () =>{
                //2x4 logic below
                if(boardSize === "2x4") {
                    //shuffle logic for cards depending on board size
                    btnShuffle = document.querySelector('#btnShuffle')
                    btnShuffle.addEventListener('click', () =>{
                        const section = document.getElementById('board2x4');
                        const cards = section.querySelectorAll('.card');
                        section.innerHTML = ''
                        getShuffled(cards).forEach((card) => section.appendChild(card))

                    })
                    //Shuffle logic for the 4x4 board
                } else if(boardSize === "4x4") {
                    btnShuffle = document.querySelector('#btnShuffle')
                    btnShuffle.addEventListener('click', () =>{
                        const section = document.getElementById('board4x4');
                        const cards = section.querySelectorAll('.card');
                        section.innerHTML = ''
                        getShuffled(cards).forEach((card) => section.appendChild(card))
                    })
                    //shuffle logic for the 6x4 board size
                } else if(boardSize === "6x4") {
                    btnShuffle = document.querySelector('#btnShuffle')
                    btnShuffle.addEventListener('click', () =>{
                        const section = document.getElementById('board6x4');
                        const cards = section.querySelectorAll('.card');
                        section.innerHTML = ''
                        getShuffled(cards).forEach((card) => section.appendChild(card))
                    })
                }

            });
        }


    });
});



