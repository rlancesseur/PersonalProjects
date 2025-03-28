const menu = document.querySelector('.menu')
const inputNomP1 = document.querySelector('#nomP1')
const inputNomP2 = document.querySelector('#nomP2')
const colorP1 = document.querySelector('#color-selectP1')
const colorP2 = document.querySelector('#color-selectP2')
const form = document.querySelector('form')
const plateau = document.querySelector('#plateau')
const result = document.querySelector('#result')
const zoneResultat = document.querySelector('.zoneResultat')
const footer = document.querySelector('footer')
const zoneNomP1 = document.querySelector('#zoneNomP1')
const zoneNomP2 = document.querySelector('#zoneNomP2')
const zoneScoreP1 = document.querySelector('#zoneScoreP1')
const zoneScoreP2 = document.querySelector('#zoneScoreP2')
const btnRecommencer = document.querySelector('#btnRecommencer')
const btnChangerJoueur = document.querySelector('#btnChangerJoueur')
let scoreP1 = 0
let scoreP2 = 0
let p1
let p2
let currentPlayer

let scoreP1Stored = localStorage.getItem('scoreP1')
let scoreP2Stored = localStorage.getItem('scoreP2')
let nomP1Stored = localStorage.getItem('nomP1')
let nomP2Stored = localStorage.getItem('nomP2')
let couleurP1Stored = localStorage.getItem('colorP1')
let couleurP2Stored = localStorage.getItem('colorP2')
if(nomP1Stored && nomP2Stored){
    menu.style.display = 'none'
    plateau.style.display = 'grid'
    footer.style.display = 'flex'

    zoneNomP1.innerText = nomP1Stored
    zoneNomP2.innerText = nomP2Stored
    inputNomP1.value = nomP1Stored
    inputNomP2.value = nomP2Stored
    scoreP1 = scoreP1Stored == null ? "0" : scoreP1Stored
    scoreP2 = scoreP2Stored == null ? "0" : scoreP2Stored
    zoneScoreP1.innerText = scoreP1
    zoneScoreP2.innerText = scoreP2
    p1 = couleurP1Stored
    p2 = couleurP2Stored      
    
    currentPlayer = p1
}

form.addEventListener("submit", (event) => {
    event.preventDefault()
    if(colorP1.value && inputNomP1.value && inputNomP2.value && colorP2.value && colorP1.value !== colorP2.value) {
        localStorage.setItem('nomP1', inputNomP1.value)
        localStorage.setItem('nomP2', inputNomP2.value)
        localStorage.setItem('colorP1', colorP1.value)
        localStorage.setItem('colorP2', colorP2.value)
        zoneNomP1.innerText = inputNomP1.value
        zoneNomP2.innerText = inputNomP2.value
        p1 = colorP1.value
        p2 = colorP2.value
        currentPlayer = p1
    
        menu.style.display = 'none'
        plateau.style.display = 'grid'
        footer.style.display = 'flex'
    }
})

const matrice = [...Array(6)].map(() => Array(7).fill(''))

matrice.forEach((row, x) => {
    row.forEach((cell, y) => {
        cell = document.createElement('div')
        cell.className = 'case'
        cell.dataset.x = x
        cell.dataset.y = y
        cell.style.background = 'black'
        plateau.append(cell)

        cell.addEventListener('click', () => {     
            const columnIndex = cell.dataset.y

            const columnY = [...document.querySelectorAll(`.case[data-y="${columnIndex}"]`)]
            const foundCase = columnY.reverse().find((c) => c.style.background === 'black')

            foundCase.style.background = currentPlayer
            matrice[parseInt(foundCase.dataset.x)][parseInt(foundCase.dataset.y)] = currentPlayer
            
            if(estGagnant()) {
                plateau.style.display = 'none'
                zoneResultat.style.display = "flex"
                result.innerText = 'Bravo ' + (currentPlayer === p1 ? inputNomP1.value : inputNomP2.value)
                result.style.color = currentPlayer
                if (currentPlayer === p2) {
                    scoreP2++
                    zoneScoreP2.innerText = scoreP2
                    localStorage.setItem('scoreP2', scoreP2)
                } else {
                    scoreP1++
                    zoneScoreP1.innerText = scoreP1
                    localStorage.setItem('scoreP1', scoreP1)
                }
            }
            currentPlayer = currentPlayer === p1 ? p2 : p1
        })
    })
})

const estGagnant = () => {
    const rows = matrice.length
    const cols = matrice[0].length

    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols - 3; j++) {
            if (matrice[i][j] == currentPlayer && matrice[i][j+1] == currentPlayer && matrice[i][j+2] == currentPlayer && matrice[i][j+3] == currentPlayer) {
                return true
            }
        }
    }
    for (let i = 0; i < rows - 3; i++) {
        for (let j = 0; j < cols; j++) {
            if (matrice[i][j] == currentPlayer && matrice[i+1][j] == currentPlayer && matrice[i+2][j] == currentPlayer && matrice[i+3][j] == currentPlayer) {
                return true
            }
        }
    }
    for (let i = 0; i < rows - 3; i++) {
        for (let j = 0; j < cols - 3; j++) {
            if (matrice[i][j] == currentPlayer && matrice[i+1][j+1] == currentPlayer && matrice[i+2][j+2] == currentPlayer && matrice[i+3][j+3] == currentPlayer) {
                return true
            }
        }
    }
    for (let i = 3; i < rows; i++) {
        for (let j = 0; j < cols - 3; j++) {
            if (matrice[i][j] == currentPlayer && matrice[i-1][j+1] == currentPlayer && matrice[i-2][j+2] == currentPlayer && matrice[i-3][j+3] == currentPlayer) {
                return true
            }
        }
    }
    return false
}

const clearPlateau = () => {
    for (let i = 0; i < matrice.length; i++) {
        for (let j = 0; j < matrice[i].length; j++) {
            matrice[i][j] = ''
        }
    }

    const cases = document.querySelectorAll('.case')
    cases.forEach(element => {
        element.style.background = 'black'
    })
}

btnRecommencer.addEventListener("click", () => {
    clearPlateau()

    plateau.style.display = 'grid'
    zoneResultat.style.display = 'none'
    result.innerText = ''

    currentPlayer = p1   
})

btnChangerJoueur.addEventListener("click", () => {
    localStorage.clear()
    clearPlateau()
    zoneResultat.style.display = 'none'
    menu.style.display = 'flex'

    inputNomP1.value = ""
    inputNomP2.value = ""
    colorP1.value = ""
    colorP2.value = ""
    scoreP1 = 0
    scoreP2 = 0
    zoneScoreP1.innerText = scoreP1
    zoneScoreP2.innerText = scoreP2
    footer.style.display = 'none'
})