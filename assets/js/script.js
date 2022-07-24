let startBtn = document.querySelector('.canvas button');
let canvas = document.querySelector(".canvas");
let header = document.querySelectorAll('header');
let score = document.querySelector('.score');

// score
let highscore = document.querySelector(".highscore");
let highscoreText = document.querySelector(".highscore-text");
let instructions = document.querySelector('.game-start .rules-btn');
let homeLink = document.querySelector('.right-side a');

let result = 0;
let timer;
let max=0;

window.addEventListener('DOMContentLoaded',  initializeGame);

function initializeGame() {
    let container = document.querySelector('.container');
    startBtn.addEventListener("click", startGame);
    
    for(let i=1; i<=12; i++){
        let box = document.createElement("div");
        box.classList.add("box");
        container.appendChild(box);
    
        //adding fence image at the bottom of each box
        let fence = document.createElement("img");
        fence.classList.add("fence");
        fence.src = "assets/images/fence.webp";
        box.appendChild(fence);
    
        let character = document.createElement("img");
        character.classList.add("character");
        character.src = "assets/images/bunny.webp";
        character.setAttribute("name", "rab");
        box.appendChild(character);
    }
}

function startGame() {
    canvas.classList.add("canvasClose");
    for (let i=0;i<header.length;i+=1){
        header[i].style.display = 'flex';
      }
      timer = 10;
      result = 0;    
}

//when cliking the rabbit score will increase by 1
window.addEventListener("click", (e) => {
    if(e.target.name === "rab") {
            mySound = new Audio('assets/audio/hit.mp3');
            mySound.play();
        
       result++;
       score.textContent = result;
    }
});

setInterval( function(){
    let gameOverText = document.querySelector(".game-over");
    let title = document.querySelector('.canvas h1');
    let timeLeft = document.getElementById("time-left");
    timer--;

    if (timer>=0){
        timeLeft.innerHTML = timer;
    }
    if (timer === 0) {
        canvas.classList.remove("canvasClose");
        gameOverText.style.display ="block";
        startBtn.style.visibility = "visible";
        startBtn.textContent = "Try Again";
        title.style.display="none";   
        highscoreText.style.display = "block";
        instructions.style.display="none";
        score.innerHTML=0; 
    } 
    if(result>max)
    {
        max=result;
        highscore.innerHTML = max;
    }
    else{highscore.textContent =max; }  
}, 1000);

function move() {
    setInterval(function() {
        const rab = document.querySelectorAll('.character');

        let chose = Math.floor(Math.random() * rab.length);
        rab[chose].style.pointerEvents = "all";
        rab[chose].style.animation = "up 2s ease";
        rab[chose].addEventListener("animationend", () => {
            rab[chose].style.pointerEvents = "all";
            rab[chose].style.animation = "down 2s ease";
            rab[chose].addEventListener("animationend", () => {
                rab[chose].style.pointerEvents = "none";      
            });
        });
    }, 2000);
}
move();

var popupWindow = document.getElementById('popupWindow');
var rulesContent = document.querySelector('.rules-content');
var btn = document.querySelector('.rules-btn');
var closeRules = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    popupWindow.style.display = "block";
    rulesContent.style.display="block";
}

closeRules.onclick = function() {
    popupWindow.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == popupWindow) {
        popupWindow.style.display = "none";
    }
}
