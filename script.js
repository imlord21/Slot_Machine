const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const slot3 = document.getElementById('slot3');
const button = document.getElementById('btn');
const winLossMes = document.getElementById('message');
const SPIN_DURATION = 3000;
const symbolPositions = [
    80, //seven
    160, //cherry
    240, //prune
    320, //orange
    400, //bell
    480, //bar
    560, //lemon
    640, //watermelon
    720, //banana
];
let symbolPos1, symbolPos2, symbolPos3;
let currentSpinPosition1 = 0, currentSpinPosition2 = 0, currentSpinPosition3 = 0;
let elapsed = 0;

//SELECT RANDOM SYMBOL
function getRandomSymbolPosition() {
    const randomIndex = Math.floor(Math.random() * symbolPositions.length);
    return symbolPositions[randomIndex];
}

//INSERT SYMBOL COORDINATES TO symbolPos(1, 2, 3)
function setSlotSymbol(slotElement, yPosition) {
    slotElement.style.backgroundPosition = `0px ${yPosition}px`;
}

//ANIMATION SPEED - INDIVIDUAL
function animationSpeed(currentPos) {
    const maxSpeed = 20;
    const minSpeed = 0.5;
    const progress = Math.min(elapsed / SPIN_DURATION, 1);
    let speed;
    if (progress < 0.3) {
        speed = minSpeed + (maxSpeed - minSpeed) * (progress / 0.3);
    } else if (progress < 0.7) {
        speed = maxSpeed;
    } else {
        speed = maxSpeed - (maxSpeed - minSpeed) * ((progress - 0.7) / 0.3);
    }
    currentPos += speed;
    if (currentPos >= 720) currentPos = 0;
    return currentPos;
}

//WIN/LOST ALERT
function winLostCondition() {
    let winByAll = (symbolPos1 === symbolPos2) && (symbolPos2 === symbolPos3);
    let winByTwo = (symbolPos1 === symbolPos2) || (symbolPos2 === symbolPos3);
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
    elapsed = 0;
    winLossMes.textContent = "";
    symbolPos1 = getRandomSymbolPosition();
    symbolPos2 = getRandomSymbolPosition();
    symbolPos3 = getRandomSymbolPosition();
    let time = 5;
    let positionInterval = setInterval(() => {
        currentSpinPosition1 = animationSpeed(currentSpinPosition1);
        currentSpinPosition2 = animationSpeed(currentSpinPosition2);
        currentSpinPosition3 = animationSpeed(currentSpinPosition3);
        setSlotSymbol(slot1, currentSpinPosition1);
        setSlotSymbol(slot2, currentSpinPosition2);
        setSlotSymbol(slot3, currentSpinPosition3);
        elapsed += time;
        if (elapsed >= SPIN_DURATION) {
            setSlotSymbol(slot1, symbolPos1);
            setSlotSymbol(slot2, symbolPos2);
            setSlotSymbol(slot3, symbolPos3);
            clearInterval(positionInterval);
            currentSpinPosition1 = symbolPos1;
            currentSpinPosition2 = symbolPos2;
            currentSpinPosition3 = symbolPos3;
            winLostCondition();
            button.disabled = false;
        }
    }, time);
}

document.addEventListener('DOMContentLoaded', () => {
    setSlotSymbol(slot1, 80);
    setSlotSymbol(slot2, 80);
    setSlotSymbol(slot3, 80);
});

button.addEventListener('click', animation);
