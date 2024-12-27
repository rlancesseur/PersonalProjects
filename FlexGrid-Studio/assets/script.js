const body = document.querySelector("body")
const main = document.querySelector("main")
const element = document.querySelector(".element")
const containerDisplay = document.querySelector("#containerDisplay")
const containerFlexDirection = document.querySelector("#containerFlexDirection")
const containerJustifyContent = document.querySelector("#containerJustifyContent")
const containerAlignItems = document.querySelector("#containerAlignItems")
const containerFlexWrap = document.querySelector("#containerFlexWrap")
const containerTemplateColumns = document.querySelector("#containerTemplateColumns")
const containerTemplateRows = document.querySelector("#containerTemplateRows")
const containerGap = document.querySelector("#containerGap")
const btnAjout = document.querySelector("#btnAjout")
const btnSuppr = document.querySelector("#btnSuppr")
const btnReset = document.querySelector("#btnReset")
const btnDarkLight = document.querySelector("#btnDarkLight")

const selectDisplay = document.querySelector("#selectDisplay")
const selectFlexDirection = document.querySelector("#selectFlexDirection")
const selectJustifyContent = document.querySelector("#selectJustifyContent")
const selectAlignItems = document.querySelector("#selectAlignItems")
const selectflexWrap = document.querySelector("#selectFlexWrap")
const zoneTemplateColumns = document.querySelector("#inputTemplateColumns")
const zoneTemplateRows = document.querySelector("#inputTemplateRows")
const zoneTailleGap = document.querySelector("#inputTailleGap")
const selectFormatGap = document.querySelector("#selectFormatGap")
const options = document.querySelectorAll("option")

// Si choix du thème en mémoire, l'exécute 
let themeEnregistre = localStorage.getItem("theme")
let imgEnregistre = localStorage.getItem("img")
if(themeEnregistre) {
    body.classList.add(themeEnregistre)
    btnDarkLight.src = imgEnregistre
}

// Change le thème et garde le choix en mémoire
btnDarkLight.addEventListener("click", () => {
    if (body.classList.contains("dark")) {
        body.classList.remove("dark")
        body.classList.add("light")
        localStorage.setItem("theme", "light")
        btnDarkLight.src = "assets/img/darkMode.png"
        localStorage.setItem("img", "assets/img/darkMode.png")
    }
    else {
        body.classList.remove("light")
        body.classList.add("dark")
        localStorage.setItem("theme", "dark")
        btnDarkLight.src = "assets/img/lightMode.png"
        localStorage.setItem("img", "assets/img/lightMode.png")
    }
})

// Permet de choisir le display
selectDisplay.addEventListener("change", () => {
    if (selectDisplay.value === "grid") {
        main.style.display = "grid"
        containerFlexDirection.style.display = "none"
        containerJustifyContent.style.display = "none"
        containerFlexWrap.style.display = "none"
        containerTemplateColumns.style.display = "block"
        containerTemplateRows.style.display = "block"
    }
    else {
        main.style.display = "flex"
        containerFlexDirection.style.display = "block"
        containerJustifyContent.style.display = "block"
        containerAlignItems.style.display = "block"
        containerFlexWrap.style.display = "block"
        containerTemplateColumns.style.display = "none"
        containerTemplateRows.style.display = "none"
    }
})

// Permet de choisir le Flex Direction
selectFlexDirection.addEventListener("change", () => {
    for(let i = 0; i < options.length; i++){
        if (selectFlexDirection.value === options[i].value) {
            main.style.flexDirection = options[i].value
        }
    }
})

// Permet de choisir le Justify Content
selectJustifyContent.addEventListener("change", () => {
    for(let i = 0; i < options.length; i++){
        if (selectJustifyContent.value === options[i].value) {
            main.style.justifyContent = options[i].value
        }
    }
})

// Permet de choisir l'Align-items
selectAlignItems.addEventListener("change", () => {
    for(let i = 0; i < options.length; i++){
        if (selectAlignItems.value === options[i].value) {
            main.style.alignItems = options[i].value
        }
    }
})

// Permet de choisir le Flew Wrap
selectflexWrap.addEventListener("change", () => {
    for(let i = 0; i < options.length; i++){
        if (selectflexWrap.value === options[i].value) {
            main.style.flexWrap = options[i].value
        }
    }
})

// Permet de choisir la taille du Gap
zoneTailleGap.addEventListener("change", () => {
    main.style.gap = zoneTailleGap.value + "" + selectFormatGap.value
})

// Permet de choisir le format du Gap
selectFormatGap.addEventListener("change", () => {
    main.style.gap = zoneTailleGap.value + "" + selectFormatGap.value
})

// Permet de créer un élément dans le conteneur
btnAjout.addEventListener("click", () => {
    const element = document.createElement("div")
    const elements = document.querySelectorAll(".element")
    element.classList.add("element")
    element.innerText = elements.length +1
    main.appendChild(element)
})

// Permet de supprimer un élément du conteneur
btnSuppr.addEventListener("click", () => {
    if(main.children.length > 1) {
        main.removeChild(main.lastChild)
    }
})

// Permet de tout reset
btnReset.addEventListener("click", () => {
    if(selectDisplay.value = "grid") {
        main.style.display = "flex"
        selectDisplay.value = "flex"
        zoneTemplateColumns.value = ""
        zoneTemplateRows.value = ""
        containerFlexDirection.style.display = "block"
        containerJustifyContent.style.display = "block"
        containerFlexWrap.style.display = "block"
        containerTemplateColumns.style.display = "none"
        containerTemplateRows.style.display = "none"
    }
    main.style.flexDirection = "row"
    selectFlexDirection.value = "row"
    main.style.justifyContent = "start"
    selectJustifyContent.value = "start"
    main.style.alignItems = "start"
    selectAlignItems.value = "start"
    main.style.flexWrap = "wrap"
    selectflexWrap.value = "wrap"
    main.style.gap = "20px"
    zoneTailleGap.value = ""
    while(main.children.length > 1) {
        main.removeChild(main.lastChild)
    }
})

// Permet de choisir le grid-template-columns
zoneTemplateColumns.addEventListener("change", () => {
    main.style.gridTemplateColumns = zoneTemplateColumns.value
})

// Permet de choisir le grid-template-rows
zoneTemplateRows.addEventListener("change", () => {
    main.style.gridTemplateRows = zoneTemplateRows.value
})
