const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const slot3 = document.getElementById('slot3');
const button = document.getElementById('btn');
const winLossMes = document.getElementById('message');
const SPIN_DURATION = 2000;
const symbolPositions = [
    -80, //seven
    -160, //cherry
    -240, //prune
    -320, //orange
    -400, //bell
    -480, //bar
    -560, //lemon
    -640, //watermelon
    -720, //banana
];
let symbolPos1, symbolPos2, symbolPos3;
let currentSpinPosition1 = 0;
let currentSpinPosition2 = 0;
let currentSpinPosition3 = 0;

//SELECT RANDOM SYMBOL
function getRandomSymbolPosition() {
    const randomIndex = Math.floor(Math.random() * symbolPositions.length);
    return symbolPositions[randomIndex];
}

//INSERT SYMBOL COORDINATES TO (BACKGROUND POSITION) -> BKPS
function setSlotSymbol(slotElement, yPosition) {
    slotElement.style.backgroundPosition = `0px ${yPosition}px`;
}

//ANIMATION SPEED - INDIVIDUAL
function getNextSpinPosition(currentPos = 0) {
    return (currentPos - 20) % 720;
}

//WIN/LOST ALERT
function winLostCondition() {
    const winByAll = (symbolPos1 === symbolPos2) && (symbolPos2 === symbolPos3);
    const winByTwo = (symbolPos1 === symbolPos2) || (symbolPos2 === symbolPos3);
    if (winByAll) {
        winLossMes.textContent = "JACKPOT!!";
        winLossMes.style.color = "gold";
    } else if (winByTwo) {
        winLossMes.textContent = "YOU WIN!!";
        winLossMes.style.color = "green";
    } else {
        winLossMes.textContent = "YOU LOST!!";
        winLossMes.style.color = "red";
    }
}

//MAIN FUNCTION
function animation() {
    button.disabled = true;
    winLossMes.textContent = "";
    symbolPos1 = getRandomSymbolPosition();
    symbolPos2 = getRandomSymbolPosition();
    symbolPos3 = getRandomSymbolPosition();
    let time = 5;
    let elapsed = 0;
    let positionInterval = setInterval(() => {
        currentSpinPosition1 = getNextSpinPosition(currentSpinPosition1);
        currentSpinPosition2 = getNextSpinPosition(currentSpinPosition2);
        currentSpinPosition3 = getNextSpinPosition(currentSpinPosition3);
        setSlotSymbol(slot1, currentSpinPosition1);
        setSlotSymbol(slot2, currentSpinPosition2);
        setSlotSymbol(slot3, currentSpinPosition3);
        elapsed += time;
        if (elapsed >= SPIN_DURATION) {
            clearInterval(positionInterval);
            setSlotSymbol(slot1, symbolPos1);
            setSlotSymbol(slot2, symbolPos2);
            setSlotSymbol(slot3, symbolPos3);
            currentSpinPosition1 = symbolPos1;
            currentSpinPosition2 = symbolPos2;
            currentSpinPosition3 = symbolPos3;
            winLostCondition();
            button.disabled = false;
        }
    }, time);
}

document.addEventListener('DOMContentLoaded', () => {
    setSlotSymbol(slot1, 0);
    setSlotSymbol(slot2, 0);
    setSlotSymbol(slot3, 0);
});

button.addEventListener('click', animation);