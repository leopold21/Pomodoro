let timerElement = document.getElementById("timer")
let runElement = document.getElementById("boolRun")
let stopElement = document.getElementById("boolStop")
let pauseElement = document.getElementById("boolPause")
let workType = document.getElementById("working")
let restType = document.getElementById("rest")

let time = 25

let timeSecondes = 0
let timeMinutes = time

let working = false

let timer

let running = false

stopElement.style.display = "none"
pauseElement.style.display = "none"

function decreaseTime(){
    if(timeSecondes <= 0){
        timeMinutes--
        timeSecondes = 59
    }else{
        timeSecondes--
    }
    if(timeSecondes < 10){
        timerElement.textContent = (timeMinutes + ":0" + timeSecondes)
    }else{
        timerElement.textContent = (timeMinutes + ":" + timeSecondes)
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

    timeSecondes = 0
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
