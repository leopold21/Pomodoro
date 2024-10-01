let timeLocalStorage = localStorage.getItem("timeInitialProgress")//record the value of activity time on the storage space
if (timeLocalStorage == null) {//if the activity value has not been initialized, it is saved by default
    timeLocalStorage = 25 * 60
}
let timeInProgress = timeLocalStorage

let breakTimeInitial = localStorage.getItem("breakTimeInitial") // record the value of break time on the storage space
if (breakTimeInitial == null) {
    breakTimeInitial = 5 * 60
}
let breakTime = breakTimeInitial

let setting = document.getElementById("modifiyTime")//if the break value has not been initialized, it is saved by default
setting.style.display = "none"

let interval = null
const timerInProgressElement = document.getElementById("timerInProgress")//controls the button to start the stopwatch

let working = false
let resting = false

document.getElementById("boolRun").addEventListener("click", () => {//controls the button to start the stopwatch
    if (interval != null) stop()
    else run()
})

displayTime(setMinutes(timeLocalStorage), setSeconds(timeLocalStorage))// initialize display with start values (minutes, seconds)

// Function to calculate remaining minutes
function setMinutes(timeInProgress) {
    return parseInt(timeInProgress / 60, 10)
}

// Function for calculating remaining seconds
function setSeconds(timeInProgress) {
    return parseInt(timeInProgress % 60, 10)
}

// Function to display time in MM:SS format
function displayTime(minutes, seconds) {
    // Adds a “0” if the value is less than 10
    let minutesDisplay = minutes < 10 ? "0" + minutes : minutes
    let secondsDisplay = seconds < 10 ? "0" + seconds : seconds

    timerInProgressElement.innerText = minutesDisplay + ":" + secondsDisplay
}

// Time decrementing function
function decreaseTime(timeInProgress) {
    let elementTextWork = document.getElementById("working")
    let elementTextRest = document.getElementById("rest")
    let minutes = setMinutes(timeInProgress)
    let seconds = setSeconds(timeInProgress)

    if (timeInProgress <= 0 && resting == true) {
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

// Timer start function
function run() {
    working = true
    let runElement = document.getElementById("boolRun")

    if (timeInProgress >= 0) {

        interval = setInterval(() => {
            timeInProgress = decreaseTime(timeInProgress)
        }, 1000) // Updated every second
        working = true
    }
    runElement.classList.remove("fa-circle-play", "fa-xl", "play-button")

    runElement.classList.add("fa-solid", "fa-pause", "fa-2xl", "pause-button")

}



// Timer stop function
function stop() {
    let runElement = document.getElementById("boolRun")
    clearInterval(interval)
    interval = null
    runElement.classList.remove("fa-solid", "fa-pause", "fa-2xl", "pause-button") //hide the pause button

    runElement.classList.add("fa-circle-play", "fa-xl", "play-button")// appear the play button

}



// Timer reset function
function reset() {
    let elementTextWork = document.getElementById("working")
    let elementTextRest = document.getElementById("rest")
    timeInProgress = timeLocalStorage
    clearInterval(interval)
    interval = null
    let minutes = setMinutes(timeInProgress)
    let seconds = setSeconds(timeInProgress)
    displayTime(minutes, seconds)
    if (resting == true) {
        elementTextWork.classList.add("time-text")
        elementTextRest.classList.remove("time-text")
    }
    let runElement = document.getElementById("boolRun") // ajout 3 lignes
    runElement.classList.remove("fa-solid", "fa-pause", "fa-2xl", "pause-button")//hide the pause button
    runElement.classList.add("fa-circle-play", "fa-xl", "play-button")// appear the play button
}

// Function to show or hide the time modification section
function modifiyTime() {
    setting.style.display = (setting.style.display === "none") ? "block" : "none"
    document.getElementById("workMinute").value = setMinutes(localStorage.getItem("timeInitialProgress"));
    document.getElementById("breakMinute").value = setMinutes(localStorage.getItem("breakTimeInitial"));
}

// Function to validate new working and break times
function validateTime() {
    let workMinuteElement = parseInt(document.getElementById("workMinute").value)
    let breakMinuteElement = parseInt(document.getElementById("breakMinute").value)

    try {
        if (workMinuteElement < 0) { //exception if the user enters a negative working time
            throw new Error("le temps de travail ne peut pas être négatif")
        }
        if (breakMinuteElement < 0) { //exception if the user enters a negative rest time
            throw new Error("le temps de repos ne peut pas être négatif")
        }


        if (isNaN(workMinuteElement)) { //exception if the user enters a working time that is not a number
            throw new Error("le temps de travail doit être un nombre")

        }
        if (isNaN(breakMinuteElement)) { //exception if the user enters a rest time that is not a number
            throw new Error("le temps de repos doit être un nombre")
        }
    } catch (error) { // displays an alert with a message if there is at least one exception
        alert("Erreur " + error.message)
        return
    }


    timeLocalStorage = workMinuteElement * 60
    timeInProgress = timeLocalStorage

    breakTimeInitial = breakMinuteElement * 60
    breakTime = breakTimeInitial

    localStorage.setItem("timeInitialProgress", timeLocalStorage)
    localStorage.setItem("breakTimeInitial", breakTimeInitial)

    let minutesInProgress = setMinutes(timeInProgress)
    let secondsInProgress = setSeconds(timeInProgress)
    console.log(minutesInProgress + " : " + secondsInProgress)
    displayTime(minutesInProgress, secondsInProgress)
    setting.style.display = "none"

}

// Function to exit the parameter page
function quitSettings() {
    if (setting.style.display === "block") {
        setting.style.display = "none"
    } else {
        setting.style.display = "block"
    }
}
