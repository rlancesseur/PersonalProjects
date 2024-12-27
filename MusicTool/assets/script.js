const iconeGuitare = document.querySelector("#iconeGuitare")
const iconeBasse = document.querySelector("#iconeBasse")
const iconeMetronome = document.querySelector("#iconeMetronome")
const pageGuitare = document.querySelector("#pageGuitare")
const pageBasse = document.querySelector("#pageBasse")
const pageMetronome = document.querySelector("#pageMetronome")
const notes = document.querySelectorAll(".cercle")
const btnStop = document.querySelector("#btnStop")
const btnplay = document.querySelector("#play")
const inputMetronome = document.querySelector("#inputMetronome")
inputMetronome.value = 100

iconeGuitare.addEventListener("click", () => {
    pageBasse.style.display = "none"
    pageMetronome.style.display = "none"
    pageGuitare.style.display = "flex"
})

iconeBasse.addEventListener("click", () => {
    pageGuitare.style.display = "none"
    pageMetronome.style.display = "none"
    pageBasse.style.display = "flex"
})

iconeMetronome.addEventListener("click", () => {
    pageGuitare.style.display = "none"
    pageBasse.style.display = "none"
    pageMetronome.style.display = "flex"
})

notes.forEach(note => {
    note.addEventListener("click", () => {
        const sonNote = note.id
        const audioInstru = new Audio("assets/son/" + sonNote + ".mp3")
        audioInstru.play()
    })
})

const audioMetronome = new Audio("assets/son/metronome.mp3")
const joueSon = () => {
    audioMetronome.play()
}
let intervalle

btnStop.addEventListener("click", () => {
    clearInterval(intervalle)
})

btnplay.addEventListener("click", () => {
    clearInterval(intervalle)
    intervalle = setInterval(joueSon, 60000 / inputMetronome.value)
})
