const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const slot3 = document.getElementById('slot3');
const button = document.getElementById('btn');
const SPIN_DURATION = 2000;
let positionByTwenty = 0;
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

//SELECT RANDOM SYMBOL
function getRandomSymbolPosition() {
    const randomIndex = Math.floor(Math.random() * symbolPositions.length);
    return symbolPositions[randomIndex];
}

//INSERT SYMBOL C0ORDONATES TO (BACKGROUND POSITION) -> BKPS
function setSlotSymbol(slotElement, yPosition) {
    slotElement.style.backgroundPosition = `0px ${yPosition}px`;
}

//ANIMATION SPEED
function getPxByTwenty() {
    return positionByTwenty = (positionByTwenty + 20) % 660;
}

//INSERT (positionByTwenty) INTO BKPS
function backgroundPx(slotElement) {
    slotElement.style.backgroundPosition = `0px ${positionByTwenty}px`;
}

//WIN/LOOSE ALERT
function winLooseCondition() {
    const winByAll = (symbolPos1 === symbolPos2) && (symbolPos2 === symbolPos3);
    const winByTwo = (symbolPos1 === symbolPos2) || (symbolPos2 === symbolPos3);
    if (winByAll) {
        alert("YOU WIN!!");
    } else if (winByTwo) {
        alert("YOU WIN!!");
    } else {
        alert("YOU LOOSE!!");
    }
}

//MAIN FUNCTION
function animation() {
    btn.disabled = true;
    symbolPos1 = getRandomSymbolPosition();
    symbolPos2 = getRandomSymbolPosition();
    symbolPos3 = getRandomSymbolPosition();
    let time = 10;
    let elapsed = 0;
    let position = setInterval( () => {
        backgroundPx(slot1, getPxByTwenty());
        backgroundPx(slot2, getPxByTwenty());
        backgroundPx(slot3, getPxByTwenty());
        elapsed += time;
        if (elapsed >= SPIN_DURATION) {
            clearInterval(position);
            setSlotSymbol(slot1, symbolPos1);
            setSlotSymbol(slot2, symbolPos2);
            setSlotSymbol(slot3, symbolPos3);
            btn.disabled = false;
            winLooseCondition();
        }
    }, time);
}

btn.addEventListener('click', animation);