const pageMenu = document.querySelector('#pageMenu')
const pageQuestion = document.querySelector('#pageQuestions')
const pageResultat = document.querySelector('#pageResultat')
const listeCategorie = document.querySelector("#categories")
const niveauDifficulte = document.querySelector("#difficulte")
const zoneQuestion = document.querySelector('#question')
const inputRep1 = document.querySelector('#rep1')
const inputRep2 = document.querySelector('#rep2')
const inputRep3 = document.querySelector('#rep3')
const inputRep4 = document.querySelector('#rep4')
const labelRep1 = document.querySelector('#labelRep1')
const labelRep2 = document.querySelector('#labelRep2')
const labelRep3 = document.querySelector('#labelRep3')
const labelRep4 = document.querySelector('#labelRep4')

const zoneScore = document.querySelector('#score')
const resultat = document.querySelector('#resultat')
const btnCategorie = document.querySelector('#btnCategorie')
const btnReset = document.querySelector('#btnReset')
const btnStart = document.querySelector('#btnStart')
const btnRecommencer = document.querySelector('#btnRecommencer')
const btnSuivant = document.querySelector('#btnSuivant')
const btnPseudo = document.querySelector('#btnPseudo')
const pagePseudo = document.querySelector('#pagePseudo')
const inputPseudo = document.querySelector('#inputPseudo')
const pseudo = document.querySelector('#pseudo')
const btnValider = document.querySelector('#btnValider')
const radios = document.querySelectorAll('input[name="reponse"]')

let pseudoUtilisateur = ""
let score = 0
let questionActuelle = 0
let ecouteurValider

const afficherQuestion = (questions) => {
    const question = questions[questionActuelle]
    zoneQuestion.innerHTML = question.question
    labelRep1.innerHTML = question.choix[0]
    labelRep2.innerHTML = question.choix[1]
    labelRep3.innerHTML = question.choix[2]
    labelRep4.innerHTML = question.choix[3]

    inputRep1.value = question.choix[0]
    inputRep2.value = question.choix[1]
    inputRep3.value = question.choix[2]
    inputRep4.value = question.choix[3]

    radios.forEach(radio => radio.checked = false)

    pseudo.innerHTML = pseudoUtilisateur
    zoneScore.innerHTML = score
}

const verifieReponse = (questions) => {
    let reponseUtilisateur = ''
    let reponseSelectionnee = false

    for (const radio of radios) {
        if (radio.checked) {
            reponseUtilisateur = radio.value
            reponseSelectionnee = true
            break
        }
    }

    if (!reponseSelectionnee) {
        alert("Veuillez sélectionner une réponse avant de continuer.")
        return
    }

    const bonneReponse = questions[questionActuelle].reponse
    if(reponseUtilisateur === bonneReponse) {
        score++
    }
    questionActuelle++

    if(questionActuelle < questions.length) {
        afficherQuestion(questions)
    }
    else {
        pageQuestion.style.display = "none"
        pageResultat.style.display = "flex"
        if(score === 0) {
            resultat.innerHTML = "Dommage, vous n'avez obtenu aucun point"
            btnRecommencer.style.display = "block"
        }
        else if(score >= 1 && score < questions.length / 2) {
            resultat.innerHTML = "Vous avez obtenu " + score + " points sur " + questions.length
            btnRecommencer.style.display = "block"
        }
        else if(score >= questions.length / 2 && score < questions.length) {
            resultat.innerHTML = "Vous avez obtenu " + score + " points sur " + questions.length + ". Vous pouvez passer au niveau suivant !"
            btnSuivant.style.display = "block"
        }
        else {
            resultat.innerHTML = "Felicitations ! Vous avez toutes les bonnes réponses. Vous pouvez passer au niveau suivant !"
            btnSuivant.style.display = "block"
        }
    }
}

const lancerQuizz = (categorie, difficulte) => {
    fetch("js/data/" + categorie + "" + difficulte + ".json")
    .then(response => response.json())
    .then(questions => {
        if (ecouteurValider) {
            btnValider.removeEventListener("click", ecouteurValider);
        }
        score = 0
        questionActuelle = 0
        afficherQuestion(questions)
    
        ecouteurValider = () => verifieReponse(questions)
        btnValider.addEventListener("click", ecouteurValider)
    })
}

btnPseudo.addEventListener("click", () => {
    if(inputPseudo.value.length < 1) {
        alert("Veuillez saisir un pseudo")
    }
    else {
        pagePseudo.style.display = "none"
        pageMenu.style.display = "flex"
        pseudoUtilisateur = inputPseudo.value
    }
})

btnStart.addEventListener("click", () => {
    const categorie = listeCategorie.value
    const difficulte = niveauDifficulte.value
    pageMenu.style.display = "none"
    pageQuestion.style.display = "flex"
    
    lancerQuizz(categorie, difficulte)
})

btnReset.addEventListener("click", () => {
    score = 0
    questionActuelle = 0
    pageResultat.style.display = "none"
    pageMenu.style.display = "flex"
})

btnRecommencer.addEventListener("click", () => {
    score = 0
    questionActuelle = 0
    pageResultat.style.display = "none"
    pageQuestion.style.display ="flex"
    
    lancerQuizz(listeCategorie.value, niveauDifficulte.value)
})

btnSuivant.addEventListener("click", () => {
    if(niveauDifficulte.value < 5) {
        score = 0
        questionActuelle = 0
        niveauDifficulte.value++
        pageResultat.style.display = "none"
        pageQuestion.style.display ="flex"
        
        lancerQuizz(listeCategorie.value, niveauDifficulte.value)
    }
    else {
        resultat.innerHTML = "&#128081; Vous avez terminé tous les niveaux de cette catégorie &#128081;"
        btnSuivant.style.display = "none"
    }
    
})
