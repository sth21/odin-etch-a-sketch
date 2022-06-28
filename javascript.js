// Global Variables
let numOfSquares = 16;
let color = "#2B2B28";
let rainbowID;

// Calls all the correct code at runtime
spawnArray();

// Event listeners
let tiles = document.querySelectorAll('.sketch-container div');
tiles.forEach((tile) => {
    tile.addEventListener('mouseover', draw);
});

let colorChoosebtn = document.querySelector('input');
colorChoosebtn.addEventListener('input', chooseColor);

let blackbtn = document.querySelector('.black');
blackbtn.addEventListener('click', black);

let rainbowbtn = document.querySelector('.rainbow');
rainbowbtn.addEventListener('click', () => {
    rainbowID = true;
});

let clearbtn = document.querySelector('.reset');
clearbtn.addEventListener('click', clear);

let sizeChoosebtn = document.querySelector('.pick-size');
sizeChoosebtn.addEventListener('change', chooseSize);

// Function Declarations
function spawnArray() {
    const container = document.querySelector('.sketch-container');
    let sizeOfSquares = 450 / numOfSquares + "px";
    for (let i = 0; i < numOfSquares; ++i) {
        for (let j = 0; j < numOfSquares; ++j) {
            let div = document.createElement('div');
            div.classList.add('empty');
            div.style.height = sizeOfSquares;
            div.style.width = sizeOfSquares;
            container.appendChild(div);
        }
    }
}

function draw(event) {
    event.target.classList.remove('empty');
    if (rainbowID === true) {
        event.target.style.backgroundColor = rainbow(event);
        event.target.classList.add('rainbowfull');
        event.target.classList.remove('normalfull');
    } else {
        event.target.style.backgroundColor = color;
        event.target.classList.add('normalfull');
        event.target.classList.remove('rainbowfull');
    }
}

function chooseColor () {
    rainbowID = false;
    color = colorChoosebtn.value;
}

function black() {
    rainbowID = false;
    color = "black";
}

function rainbow(event) {
    if (event.target.classList.contains('rainbowfull')) {
        let tempColor = event.target.style.backgroundColor.match(/\d+/g); // Snippet of code from user372551 on StackOverFlow
        let tempRed = tempColor[0] - 25.5;
        let tempGreen = tempColor[1] - 25.5;
        let tempBlue = tempColor[2] - 25.5;
        return `rgb(${tempRed}, ${tempGreen}, ${tempBlue}`;
    } else {
        let red = Math.floor((Math.random() * 255));
        let green = Math.floor((Math.random() * 255));
        let blue = Math.floor((Math.random() * 255));
        return `rgb(${red}, ${green}, ${blue})`;
    }
}

function clear() {
    tiles.forEach((tile) => {
        tile.style.backgroundColor = "#EBEBE3";
        tile.classList.remove('normalfull');
        tile.classList.remove('rainbowfull');
    });
}

function chooseSize() {
    clear();
    tiles.forEach((tile) => {
        tile.remove();
    });
    numOfSquares = sizeChoosebtn.value;
    let slidertxt = document.querySelector('.slider-value');
    slidertxt.textContent = `${numOfSquares} x ${numOfSquares}`;
    spawnArray();
    tiles = document.querySelectorAll('.sketch-container div');
    tiles.forEach((tile) => {
        tile.addEventListener('mouseover', draw);
    });
}