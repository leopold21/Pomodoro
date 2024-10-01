let timeLocalStorage = localStorage.getItem("timeInitialProgress")

if(timeLocalStorage == null){
    timeLocalStorage = 25*60
}

let timeInProgress = timeLocalStorage

let breakTimeInitial = 5*60
let breakTime = breakTimeInitial

let setting = document.getElementById("modifiyTime")
setting.style.display = "none"

let interval = null
const timerInProgressElement = document.getElementById("timerInProgress")

let working = false
let resting = false

document.getElementById("boolRun").addEventListener("click", ()=>{
    if(interval != null) stop()
    else run()
})

displayTime(setMinutes(timeLocalStorage), setSeconds(timeLocalStorage)) // On initialise l'affichage avec des valeurs de départ (minutes, seconds)

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
    let elementTextWork = document.getElementById("working")
    let elementTextRest = document.getElementById("rest") 
    let minutes = setMinutes(timeInProgress)
    let seconds = setSeconds(timeInProgress)

    if (timeInProgress <= 0 && resting == true){
        console.log("passe en travail")
        minutes = 0;
        seconds = 0;
        timeInProgress = timeLocalStorage
        resting = false
        elementTextRest.classList.toggle("time-text")
        elementTextWork.classList.toggle("time-text")
    }
    if (timeInProgress <= 0 && resting == false) {
        console.log("passe en pause")
        minutes = 0;
        seconds = 0;
        timeInProgress = breakTimeInitial
        resting = true
        elementTextWork.classList.toggle("time-text")
        elementTextRest.classList.toggle("time-text")
    }
    displayTime(minutes, seconds)
    timeInProgress--
    return timeInProgress
}
/*
document.getElementById("boolRun").addEventListener("click", ()=>{
    run()
})
*/

// Fonction pour démarrer le timer
function run() {
    working = true
    let runElement = document.getElementById("boolRun")

    if (timeInProgress >= 0) {
       
        interval = setInterval(() => {
            timeInProgress = decreaseTime(timeInProgress)
        }, 1) // Mise à jour chaque seconde
        working = true
    }
    runElement.classList.remove("fa-circle-play", "fa-xl", "play-button")
    runElement.onclick = ""

    runElement.classList.add("fa-solid", "fa-pause", "fa-2xl", "pause-button")

}

 

// Fonction pour arrêter le timer
function stop() {
    let runElement = document.getElementById("boolRun")
    clearInterval(interval)
    interval=null
    runElement.classList.remove("fa-solid", "fa-pause", "fa-2xl", "pause-button")

    runElement.classList.add("fa-circle-play", "fa-xl", "play-button")

    /*runElement.addEventListener("click", ()=>{
        run();
    })*/
} 



// Fonction pour réinitialiser le timer
function reset() {
    let elementTextWork = document.getElementById("working")
    let elementTextRest = document.getElementById("rest") 
    timeInProgress = timeLocalStorage
    clearInterval(interval)
    interval=null
    let minutes = setMinutes(timeInProgress)
    let seconds = setSeconds(timeInProgress)
    displayTime(minutes, seconds)
    if(resting == true){
        elementTextWork.classList.add("time-text")
        elementTextRest.classList.remove("time-text")
    }
}

// Fonction pour afficher ou masquer la section de modification de temps
function modifiyTime() {
    setting.style.display = (setting.style.display === "none") ? "block" : "none"
    /*
    document.getElementById("workMinute").value = setMinutes(localStorage.getItem("timeInitialProgress"))
    document.getElementById("breakMinute").value = setMinutes(localStorage.getItem("timeInitialProgress"))
    */
}

// Fonction pour valider les nouveaux temps de travail et de pause
function validateTime() {
    let workMinuteElement = parseInt(document.getElementById("workMinute").value)
    let breakMinuteElement = parseInt(document.getElementById("breakMinute").value)
    
    if(workMinuteElement <= 0 || workMinuteElement == null || isNaN(workMinuteElement)){
        workMinuteElement = 25
    }
    if(breakMinuteElement <= 0 || breakMinuteElement == null || isNaN(breakMinuteElement)){
        breakMinuteElement = 5
    }

    timeLocalStorage = workMinuteElement * 60
    timeInProgress = timeLocalStorage

    breakTimeInitial = breakMinuteElement * 60
    breakTime = breakTimeInitial

    localStorage.setItem("timeInitialProgress", timeLocalStorage)

    let minutesInProgress = setMinutes(timeInProgress)
    let secondsInProgress = setSeconds(timeInProgress)
    console.log(minutesInProgress + " : " + secondsInProgress)
    displayTime(minutesInProgress, secondsInProgress)
    setting.style.display = "none"
}

// Fonction pour quitter la page de paramètre
function quitSettings(){
    if(setting.style.display === "block"){
        setting.style.display = "none"
    }else{
        setting.style.display = "block"
    }
    // setting.style.display = (setting.style.display === "none") ? "block" : "none"
}
