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
})

btnValider.addEventListener("click", genererMdp = () => {
    mdp = ""
    let listeCara = ""

    if(checkboxMinuscules.checked) listeCara += minuscules
    if(checkboxMajuscules.checked) listeCara += majuscules
    if(checkboxChiffres.checked) listeCara += chiffres
    if(checkboxSymboles.checked) listeCara += symboles

    for (let i = 0; i < inputNbrCara.value; i++) {
        const caraRandom = Math.floor(Math.random() * listeCara.length)
        mdp += listeCara.charAt(caraRandom)
    }
    zoneResultat.innerHTML = mdp
})

btnCopy.addEventListener("click", () => {
    navigator.clipboard.writeText(mdp)
})
