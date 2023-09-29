function abrirJogo() {
    const botaoJogar = document.querySelector("#botao_jogar")
    const paginaInicio = document.querySelector(".pagina_inicio")
    const paginaJogo = document.querySelector(".pagina_jogo")

    botaoJogar.addEventListener("click", (event) => {
        paginaInicio.classList.add("pagina_escondida")
        paginaJogo.classList.remove("pagina_escondida")
        removerFrutas()
        removerFrutas()
        aleatorizarFrutas()
    })
}

function voltarInicio() {
    const botaoVoltar = document.querySelector("#botao_inicio")
    const paginaInicio = document.querySelector(".pagina_inicio")
    const paginaJogo = document.querySelector(".pagina_jogo")

    botaoVoltar.addEventListener("click", (event) => {
        paginaInicio.classList.remove("pagina_escondida")
        paginaJogo.classList.add("pagina_escondida")
    })
}

function reiniciarJogo() {
    const botaoReinicio = document.querySelector("#botao_reiniciar")
    const paginaInicio = document.querySelector(".pagina_inicio")
    const paginaJogo = document.querySelector(".pagina_jogo")
    const paginaFinal = document.querySelector(".pagina_final")

    botaoReinicio.addEventListener("click",  (event) => {
        paginaInicio.classList.add("pagina_escondida")
        paginaFinal.classList.add("pagina_escondida")
        paginaJogo.classList.remove("pagina_escondida")
        removerFrutas()
        removerFrutas()
        removerFrutas()
        aleatorizarFrutas()
    })
}

function aleatorizarFrutas() {
    const caixasFrutas = document.querySelectorAll(".caixa_carro")
    caixasFrutas.forEach(caixa => {
        const topFruit = Math.floor(Math.random() * 400)
        const leftFruit = Math.floor(Math.random() * 750)
        caixa.style.top = `${topFruit}px`
        caixa.style.right = `${leftFruit + 250}px`

    })
}
function removerFrutas() {
    const boxEstac = document.querySelectorAll(".estac")
    const parteJogo = document.querySelectorAll(".caixa_carro")
    boxEstac.forEach(estac => {
        estac.childNodes.forEach(item => {
            for (let i = 0; i < parteJogo.length; i++) {
                if(parteJogo[i].classList.contains(item.classList[0])){
                    parteJogo[i].append(item)
                }
            }
        })
    })
}

function movimentarFrutas() {
    const boxEstac = document.querySelectorAll(".estac")
    let frutaPuxada

    document.addEventListener("dragstart", (event) => {
        event.target.classList.add("dragging")
        console.log(event.target.parentElement)
        frutaPuxada = event.target.parentElement
    })

    document.addEventListener("dragend", (event) => {
        event.target.classList.remove("dragging")
        verificarSeConcluiu()
    })

    boxEstac.forEach((estac) => {
        estac.addEventListener("dragover", (event) => {
            if(frutaPuxada.classList[1] == event.target.classList[1]){
                const dragging = document.querySelector(".dragging")
                const applyAfter = pegarNovaPosicao(estac, event.clientY)
    
                if(applyAfter) {
                    applyAfter.insertAdjacentElement("afterend", dragging)
                } else {
                    estac.prepend(dragging)
                }
                
            }
        })
    })
}

function pegarNovaPosicao(estac, posY) {
    const veics = estac.querySelectorAll(".caixa_carro:not(.dragging)")
    let result

    for (let box_referencia of veics) {
        const box = box_referencia.getBoundingClientRect()
        const boxCenterY = box.y + box.height / 2

        if (posY >= boxCenterY) result = cesta_referencia
    }

    return result
}

function verificarSeConcluiu() {
    const boxEstac = document.querySelectorAll(".estac")
    const paginaJogo = document.querySelector(".pagina_jogo")
    const paginaFinal = document.querySelector(".pagina_final")
    let verificador = 0

    boxEstac.forEach((estac) => {
        verificador += estac.childNodes.length
    })
    if (verificador == 13) {
        paginaJogo.classList.add("pagina_escondida")
        paginaFinal.classList.remove("pagina_escondida")
    }
}

abrirJogo()
voltarInicio()
aleatorizarFrutas()
movimentarFrutas()
reiniciarJogo()
verificarSeConcluiu()