let timerElement = document.getElementById("timer")
let runElement = document.getElementById("boolRun")
let stopElement = document.getElementById("boolStop")
let pauseElement = document.getElementById("boolPause")
let workType = document.getElementById("working")
let restType = document.getElementById("rest")

let time = 25

let timeSeconds = 0
let timeMinutes = time

let working = false

let timer

let running = false

stopElement.style.display = "none"
pauseElement.style.display = "none"

function decreaseTime(){
    if(timeSeconds <= 0){
        timeMinutes--
        timeSeconds = 59
    }else{
        timeSeconds--
    }
    if(timeSeconds < 10){
        timerElement.textContent = (timeMinutes + ":0" + timeSeconds)
    }else{
        timerElement.textContent = (timeMinutes + ":" + timeSeconds)
    }
}

runElement.addEventListener("click", ()=>{
    running = true
    
    stopElement.style.display = "block"
    runElement.style.display = "none"

    decreaseTime()
    timer = setInterval(decreaseTime, 1000)

    pauseElement.style.display = "block"
})

pauseElement.addEventListener("click", ()=>{
    running = false
    
    pauseElement.style.display = "none"
    runElement.style.display = "block"
    clearInterval(timer)
})


stopElement.addEventListener("click", ()=>{
    running = false

    timeSeconds = 0
    timeMinutes = time

    timerElement.textContent = time + ":00"
    
    pauseElement.style.display = "none"
    stopElement.style.display = "none"
    runElement.style.display = "block"

    clearInterval(timer)
})


if(working){
    restType.classList.toggle("time-text")
}else{
    workType.classList.toggle("time-text")
}

/* Leopold */

let timeInitialInProgress = 12;
let timeInProgress = timeInitialInProgress;

let breakTimeInitial = 6;
let breakTime = breakTimeInitial;

let setting = document.getElementById("modifiyTime");
setting.style.display = "none";

let interval;
const timerInProgressElement = document.getElementById("timerInProgress");

displayTime(2, 2); // On initialise l'affichage avec des valeurs de départ (minutes, seconds)

// Fonction pour calculer les minutes restantes
function setMinutes(timeInProgress) {
    return parseInt(timeInProgress / 60, 10);
}

// Fonction pour calculer les secondes restantes
function setSeconds(timeInProgress) {
    return parseInt(timeInProgress % 60, 10);
}

// Fonction pour afficher le temps au format MM:SS
function displayTime(minutes, seconds) {
    // Ajoute un "0" si la valeur est inférieure à 10
    let minutesDisplay = minutes < 10 ? "0" + minutes : minutes;
    let secondsDisplay = seconds < 10 ? "0" + seconds : seconds;

    timerInProgressElement.innerText = minutesDisplay + ":" + secondsDisplay;
}

// Fonction pour décrémenter le temps
function decreaseTime(timeInProgress) {
    let minutes = setMinutes(timeInProgress);
    let seconds = setSeconds(timeInProgress);

    if (timeInProgress <= 0) {
        minutes = 0;
        seconds = 0;
        clearInterval(interval);
    }

    displayTime(minutes, seconds);
    timeInProgress--;
    return timeInProgress;
}

// Fonction pour démarrer le timer
function run() {
    if (timeInProgress >= 0) {
        interval = setInterval(() => {
            timeInProgress = decreaseTime(timeInProgress);
        }, 1000); // Mise à jour chaque seconde
    }
}

// Fonction pour arrêter le timer
function stop() {
    clearInterval(interval);
}

// Fonction pour réinitialiser le timer
function reset() {
    timeInProgress = timeInitialInProgress;
    clearInterval(interval);
    let minutes = setMinutes(timeInProgress);
    let seconds = setSeconds(timeInProgress);
    displayTime(minutes, seconds);
}

// Fonction pour afficher ou masquer la section de modification de temps
function modifiyTime() {
    setting.style.display = (setting.style.display === "none") ? "block" : "none";
}

// Fonction pour valider les nouveaux temps de travail et de pause
function validateTime() {
    let workMinuteElement = parseInt(document.getElementById("workMinute").value);
    let workSecondElement = parseInt(document.getElementById("workSecond").value);
    let breakMinuteElement = parseInt(document.getElementById("breakMinute").value);
    let breakSecondElement = parseInt(document.getElementById("breakSecond").value);

    timeInitialInProgress = workMinuteElement * 60 + workSecondElement;
    timeInProgress = timeInitialInProgress;

    breakTimeInitial = breakMinuteElement * 60 + breakSecondElement;
    breakTime = breakTimeInitial;

    let minutesInProgress = setMinutes(timeInProgress);
    let secondsInProgress = setSeconds(timeInProgress);
    displayTime(minutesInProgress, secondsInProgress);
}