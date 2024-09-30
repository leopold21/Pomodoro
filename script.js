let timeInitialInProgress = 12
let timeInProgress = timeInitialInProgress

let breakTimeInitial = 6
let breakTime = breakTimeInitial

let setting = document.getElementById("modifiyTime")
setting.style.display = "none"

let interval
const timerInProgressElement = document.getElementById("timerInProgress")

displayTime(setMinutes(timeInitialInProgress), setSeconds(timeInitialInProgress)) // On initialise l'affichage avec des valeurs de départ (minutes, seconds)

// Fonction pour calculer les minutes restantes
function setMinutes(timeInProgress) {
    return parseInt(timeInProgress / 60, 10)
}

// Fonction pour calculer les secondes restantes
function setSeconds(timeInProgress) {
    return parseInt(timeInProgress % 60, 10)
}

// Fonction pour afficher le temps au format MM:SS
function displayTime(minutes, seconds) {
    // Ajoute un "0" si la valeur est inférieure à 10
    let minutesDisplay = minutes < 10 ? "0" + minutes : minutes
    let secondsDisplay = seconds < 10 ? "0" + seconds : seconds

    timerInProgressElement.innerText = minutesDisplay + ":" + secondsDisplay
}

// Fonction pour décrémenter le temps
function decreaseTime(timeInProgress) {
    let minutes = setMinutes(timeInProgress)
    let seconds = setSeconds(timeInProgress)

    if (timeInProgress <= 0) {
        minutes = 0;
        seconds = 0;
        clearInterval(interval)
    }

    displayTime(minutes, seconds)
    timeInProgress--
    return timeInProgress
}

// Fonction pour démarrer le timer
function run() {
    if (timeInProgress >= 0) {
       
        interval = setInterval(() => {
            timeInProgress = decreaseTime(timeInProgress)
        }, 1000) // Mise à jour chaque seconde
    }
}
 

// Fonction pour arrêter le timer
function stop() {
    clearInterval(interval)
} 



// Fonction pour réinitialiser le timer
function reset() {
    timeInProgress = timeInitialInProgress
    clearInterval(interval)
    let minutes = setMinutes(timeInProgress)
    let seconds = setSeconds(timeInProgress)
    displayTime(minutes, seconds)
}

// Fonction pour afficher ou masquer la section de modification de temps
function modifiyTime() {
    setting.style.display = (setting.style.display === "none") ? "block" : "none"
}

// Fonction pour valider les nouveaux temps de travail et de pause
function validateTime() {
    let workMinuteElement = parseInt(document.getElementById("workMinute").value)
    let workSecondElement = parseInt(document.getElementById("workSecond").value)
    let breakMinuteElement = parseInt(document.getElementById("breakMinute").value)
    let breakSecondElement = parseInt(document.getElementById("breakSecond").value)

    timeInitialInProgress = workMinuteElement * 60 + workSecondElement;
    timeInProgress = timeInitialInProgress;

    breakTimeInitial = breakMinuteElement * 60 + breakSecondElement;
    breakTime = breakTimeInitial;

    let minutesInProgress = setMinutes(timeInProgress)
    let secondsInProgress = setSeconds(timeInProgress)
    console.log(minutesInProgress + " : " + secondsInProgress)
    displayTime(minutesInProgress, secondsInProgress)
    setting.style.display = "none"
}
