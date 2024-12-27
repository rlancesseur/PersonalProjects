const rangeNbrCara = document.querySelector('#rangeNbrCara')
const inputNbrCara = document.querySelector('#inputNbrCara')
const checkboxMinuscules = document.querySelector('#checkboxMinuscules')
const checkboxMajuscules = document.querySelector('#checkboxMajuscules')
const checkboxChiffres = document.querySelector('#checkboxChiffres')
const checkboxSymboles = document.querySelector('#checkboxSymboles')
const btnValider = document.querySelector('#btnValider')
const zoneResultat = document.querySelector('#zoneResultat')
const btnCopy = document.querySelector('#btnCopy')

const minuscules = "abcdefghijklmnopqrstuvwxyz"
const majuscules = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const chiffres = "0123456789"
const symboles = "!?@#$&"
let mdp = ""

rangeNbrCara.addEventListener("input", () => {
    inputNbrCara.value = rangeNbrCara.value
})
inputNbrCara.addEventListener("input", () => {
    rangeNbrCara.value = inputNbrCara.value
    if(inputNbrCara.value < 5) inputNbrCara.value = 5
    if(inputNbrCara.value > 50) inputNbrCara.value = 50
})

const genererMdp = () => {
    mdp = ""
    let listeCara = ""
    let nbMinuscules = 0
    let nbMajuscules = 0
    let nbChiffres = 0
    let nbSymboles = 0

    if(checkboxMinuscules.checked) listeCara += minuscules
    if(checkboxMajuscules.checked) listeCara += majuscules
    if(checkboxChiffres.checked) listeCara += chiffres
    if(checkboxSymboles.checked) listeCara += symboles

    while(nbMinuscules === 0 && checkboxMinuscules.checked ||
            nbMajuscules === 0 && checkboxMajuscules.checked ||
            nbChiffres === 0 && checkboxChiffres.checked ||
            nbSymboles === 0 && checkboxSymboles.checked) {
        for (let i = 0; i < inputNbrCara.value; i++) {
            const caraRandom = Math.floor(Math.random() * listeCara.length)
            const char = listeCara.charAt(caraRandom)
            mdp += char

            if (minuscules.includes(char)) nbMinuscules++
            if (majuscules.includes(char)) nbMajuscules++
            if (chiffres.includes(char)) nbChiffres++
            if (symboles.includes(char)) nbSymboles++
        }
    }

    zoneResultat.innerHTML = mdp 
}

btnValider.addEventListener("click", genererMdp)

btnCopy.addEventListener("click", () => {
    navigator.clipboard.writeText(mdp)
})
