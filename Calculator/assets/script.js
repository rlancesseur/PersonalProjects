const ecran = document.querySelector(".ecran")
const btns = document.querySelectorAll("input")
const reset = document.querySelector("#btnEff")
const egal = document.querySelector("#btnEgal")

btns.forEach(btn => {
    btn.addEventListener("click", () => {
        ecran.innerText += btn.value
    })
})

reset.addEventListener("click", () => {
    ecran.innerText = ""
})

egal.addEventListener("click", () => {
    ecran.innerText = eval(ecran.innerText)
})
