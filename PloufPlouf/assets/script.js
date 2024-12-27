const btnPickItems = document.querySelector("#btnPickItems")
const btnNbr = document.querySelector("#btnNbr")
const btnCoin = document.querySelector("#btnCoin")
const btnDice = document.querySelector("#btnDice")

const containerMenu = document.querySelector("#containerMenu")
const containerRandomNumbers = document.querySelector("#containerRandomNumbers")
const containerCoinFlip = document.querySelector("#containerCoinFlip")
const containerRollDice = document.querySelector("#containerRollDice")

const input1 = document.querySelector("#input1")
const input2 = document.querySelector("#input2")
const btnPloufNbr = document.querySelector("#btnPloufNbr")
const btnCoinFlip = document.querySelector("#btnCoinFlip")
const btnRollDice = document.querySelector("#btnRollDice")
const imgCoin = document.querySelector("#imgCoin")
const imgDice = document.querySelector("#imgDice")

const nbrSortie = document.querySelector(".nbrSortie")
const zoneResultat = document.querySelector(".zoneResultat")


btnNbr.addEventListener("click", () => {
    containerMenu.style.display = "none"
    containerRandomNumbers.style.display = "flex"
})

btnCoin.addEventListener("click", () => {
    containerMenu.style.display = "none"
    containerCoinFlip.style.display = "flex"
})

btnDice.addEventListener("click", () => {
    containerMenu.style.display = "none"
    containerRollDice.style.display = "flex"
})

const tirageNbr = () => {
    let min = 0
    let max = 0
    if(input1.value < input2.value) {
        min = input1.value
        max = input2.value
    }
    else {
        min = input2.value
        max = input1.value
    }

    let tabNbr = []
    let suiteResultat = ""
    const difference = max - min
    tabNbr.length = difference

    for (let i = 0; i <= difference; i++) {
        tabNbr[i] = min
        min++
    }

    if (nbrSortie.value < 1) nbrSortie.value = 1

    for (let i = 0; i < nbrSortie.value; i++) {
        const indexRandom = Math.floor(Math.random() * difference)
        const resultat = tabNbr[indexRandom]
        suiteResultat += resultat + " "
    }
    zoneResultat.innerHTML = suiteResultat
}

const coinFlip = () => {
    const imgRandom = Math.floor(Math.random() * 2)
    imgCoin.src = "assets/img/coin" + imgRandom + ".png"
}

const rollDice = () => {
    const imgRandom = Math.floor(Math.random() * 6)
    imgDice.src = "assets/img/dice" + imgRandom + ".png"
}

btnPloufNbr.addEventListener("click", tirageNbr)
btnCoinFlip.addEventListener("click", coinFlip)
btnRollDice.addEventListener("click", rollDice)
