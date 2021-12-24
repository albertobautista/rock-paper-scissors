const btns = ['rock', 'paper', 'scissors'];

const inputUser = document.getElementById("user")
const inputPassword = document.getElementById("password")
const buttonLogin = document.getElementById("loginButton")


const spanUser = document.getElementById("testUser")
const spanPassword = document.getElementById("testPassword")

const divLoginContainer = document.getElementById("loginContainer")
const divGameContainer = document.getElementById("gameContainer")


const spanPlayerScore = document.getElementById('playerScore');
const spanGameTurn = document.getElementById('gameTurn');
const olScoreList = document.getElementById("scoreList")
const spanGameResult = document.getElementById("gameResult")
const pPlayerOption = document.getElementById("playerOption")
const pComputerOption = document.getElementById("computerOption")
const pEmptyResults = document.getElementById("emptyResults")

const maxTurns = 10;
let currentTurn = 0;

const USER = "cursojs"
const PASSWORD = "12345"

const OPTIONS = [
    {
        name: 'rock',
        emoji: '✊',
        winsTo: 'scissors'
    }, {
        name: 'paper',
        emoji: '✋',
        winsTo: 'rock'
    }, {
        name: 'scissors',
        emoji: '✌',
        winsTo: 'paper'
    },
];


initGame()


function initGame() {
    printScoreList()
    prepareButtons()

    spanGameTurn.innerText = "Comenzar";
    spanUser.innerText = USER
    spanPassword.innerText = PASSWORD
}

function prepareButtons() {
    buttonLogin.addEventListener("click", () => {
        if (inputUser.value.length > 0 && inputPassword.value.length > 0) {
            if (validateUser()) {
                divGameContainer.classList.remove("display_none")
                divLoginContainer.classList.add("display_none")
            } else {
                alert("Usuario y contraseña inválidos")
            }
        } else {
            alert("Favor de introducir login y password")
        }
    })

    btns.forEach((selectionButton) => {
        const btn = document.getElementById(selectionButton);
        btn.addEventListener('click', (e) => {
            const selection = OPTIONS.find((selection) => selection.name === selectionButton);

            if (currentTurn < maxTurns) {
                makeSelection(selection);
                currentTurn++;
                spanGameTurn.innerText = `Turno ${currentTurn}`;
            } else {
                alert(`Final del juego - Puntuación: ${
                    spanPlayerScore.innerText
                }`);
                saveInLocalStorage(spanPlayerScore.innerText);
                printScoreList()
                resetGame()
            }
        });
    });
}

function validateUser() {
    return inputUser.value === USER && inputPassword.value === PASSWORD
}

function resetGame() {
    spanPlayerScore.innerText = 0;
    currentTurn = 0;
    spanGameTurn.innerText = "Comenzar";

    spanGameResult.innerText = "-"
    pPlayerOption.innerText = "❔"
    pComputerOption.innerText = "❔"
    spanGameResult.classList.remove("text_red", "text_green", "text_yellow")
}

function printScoreList() {
    const arrayScore = JSON.parse(localStorage.getItem('gameScore'))


    olScoreList.innerHTML = ""
    if (arrayScore) {
        const arrayScoreReversed = arrayScore.reverse()
        arrayScoreReversed.forEach(elemento => {
            const li = document.createElement('li');
            li.innerText = elemento
            olScoreList.appendChild(li)
        })
        pEmptyResults.classList.add("display_none")

    }

}

function saveInLocalStorage(score) {
    let arrayScore = localStorage.getItem('gameScore')
    arrayScore = arrayScore ? JSON.parse(arrayScore) : []
    if (arrayScore.length === 5) {
        arrayScore.shift()
    }
    arrayScore.push(score)
    localStorage.setItem('gameScore', JSON.stringify(arrayScore));
}

function makeSelection(playerSelection) {
    const computerSelection = randomSelection();

    pPlayerOption.innerText = playerSelection.emoji
    pComputerOption.innerText = computerSelection.emoji

    const playerWin = isPlayerWin(playerSelection, computerSelection);

    if (playerSelection.name !== computerSelection.name) {
        if (playerWin) 
            incrementScore();
         else 
            decrementScore();
        


    } else {
        spanGameResult.innerText = "Empate"
        spanGameResult.classList.remove("text_red", "text_green")
        spanGameResult.classList.add("text_yellow")
    }
}

function incrementScore() {
    spanPlayerScore.innerText = parseInt(spanPlayerScore.innerText) + 100;
    spanGameResult.innerText = "Ganaste"
    spanGameResult.classList.remove("text_red", "text_yellow")
    spanGameResult.classList.add("text_green")
}

function decrementScore() {
    spanPlayerScore.innerText = parseInt(spanPlayerScore.innerText) - 30;
    spanGameResult.innerText = "Perdiste"
    spanGameResult.classList.remove("text_green", "text_yellow")
    spanGameResult.classList.add("text_red")
}

function isPlayerWin(playerSelection, computerSelection) {
    return playerSelection.winsTo === computerSelection.name;
}

function randomSelection() {
    const random = Math.floor(Math.random() * OPTIONS.length);
    return OPTIONS[random];
}
