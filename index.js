const sectionAttackSelection = document.getElementById('attackSelection')
const sectionRestart = document.getElementById('restart')
const btnSelectNerd = document.getElementById('btnSelectNerd')
sectionRestart.style.display = 'none'
const btnRestart = document.getElementById('btnRestart')

const sectionNerdSelection = document.getElementById('nerdSelection')
const pj = document.getElementById('pj')

const enemyPj = document.getElementById('enemyPj')

const spanVictoriasJugador = document.getElementById('spanVictoriasJugador')
const spanVictoriasEnemigo = document.getElementById('spanVictoriasEnemigo')

const messageSection = document.getElementById('resultado')
const atkP = document.getElementById('atkP')
const atkE = document.getElementById('atkE')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('habitacion')

let nerds = []
let opcionDeNerds
let pjSheldon
let pjLeonard
let pjHoward
let namePjPlayer
let namePjPlayerObjeto
let attackPlayer = []
let attackEnemy = []
let ataquesNerd
let ataquesNerdEnemigo
let btnAttackPiedra
let btnAttackPapel
let btnAttackTijera
let btnAttackLagarto
let btnAttackSpock
let indexAtaqueJugador
let indexAtaqueEnemigo
let botones = []
let victoriasJugador = 0
let victoriasEnemigo = 0
let phPlayer = 3
let phEnemy = 3
let lienzo = habitacion.getContext("2d")
let intervalo
let mapaBackground = new Image
mapaBackground.src = './assets/mapaBackground.png'
let alturaBuscada
let anchoMapa = window.innerWidth - 50

const anchoMaxMapa = 580

if (anchoMapa > anchoMaxMapa) {
    anchoMapa = anchoMaxMapa - 20
}

alturaBuscada = anchoMapa * 600 / 800

mapa.width = anchoMapa
mapa. height = alturaBuscada

class Nerd {
    constructor(nombre, foto, vida, x = 20, y = 290) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 80
        this.alto = 120
        this.x = x
        this.y = y
        this.mapaFoto = new Image ()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarNerd() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let sheldon = new Nerd ('Sheldon', './assets/sheldon.png', 5);
let leonard = new Nerd ('Leonard', './assets/leonard.png', 5);
let howard = new Nerd ('Howard', './assets/howard.png', 5);

// let sheldonEnemigo = new Nerd ('Sheldon', './assets/sheldon.png', 5, 110, 120);
let leonardEnemigo = new Nerd ('Leonard', './assets/leonard.png', 5, 245, 145);
let howardEnemigo = new Nerd ('Howard', './assets/howard.png', 5, 400, 190);

sheldon.ataques.push(
    {nombre: '🖖', id: 'btnAttackSpock'},
    {nombre: '📃', id: 'btnAttackPapel'},
    {nombre: '🖖', id: 'btnAttackSpock'},
    {nombre: '✂️', id: 'btnAttackTijera'},
    {nombre: '🖖', id: 'btnAttackSpock'},
)

leonard.ataques.push(
    {nombre: '🪨', id: 'btnAttackPiedra'},
    {nombre: '🖖', id: 'btnAttackSpock'},
    {nombre: '🪨', id: 'btnAttackPiedra'},
    {nombre: '🦎', id: 'btnAttackLagarto'},
    {nombre: '🪨', id: 'btnAttackPiedra'},
)

leonardEnemigo.ataques.push(
    {nombre: '🪨', id: 'btnAttackPiedra'},
    {nombre: '🖖', id: 'btnAttackSpock'},
    {nombre: '🪨', id: 'btnAttackPiedra'},
    {nombre: '🦎', id: 'btnAttackLagarto'},
    {nombre: '🪨', id: 'btnAttackPiedra'},
)

howard.ataques.push(
    {nombre: '🦎', id: 'btnAttackLagarto'},
    {nombre: '📃', id: 'btnAttackPapel'},
    {nombre: '🦎', id: 'btnAttackLagarto'},
    {nombre: '✂️', id: 'btnAttackTijera'},
    {nombre: '🦎', id: 'btnAttackLagarto'},
)

howardEnemigo.ataques.push(
    {nombre: '🦎', id: 'btnAttackLagarto'},
    {nombre: '📃', id: 'btnAttackPapel'},
    {nombre: '🦎', id: 'btnAttackLagarto'},
    {nombre: '✂️', id: 'btnAttackTijera'},
    {nombre: '🦎', id: 'btnAttackLagarto'},
)

nerds.push(sheldon, leonard, howard)

function startGame() {
    sectionAttackSelection.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    nerds.forEach((nerd) => {
        opcionDeNerds = `
        <input type="radio" name="nerd" id=${nerd.nombre}>
        <label class="tarjeta" for=${nerd.nombre}>
            <p>${nerd.nombre}</p>
            <img src=${nerd.foto} alt=${nerd.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeNerds

    pjSheldon = document.getElementById('Sheldon')
    pjLeonard = document.getElementById('Leonard')
    pjHoward = document.getElementById('Howard')
    })

    btnSelectNerd.addEventListener('click', nerdSelection)
    btnRestart.addEventListener('click', restartGame)
}

function nerdSelection(){
    sectionNerdSelection.style.display = 'none'

    if (pjSheldon.checked) {
        pj.innerHTML = pjSheldon.id
        namePjPlayer = pjSheldon.id
    } else if (pjLeonard.checked) {
        pj.innerHTML = pjLeonard.id
        namePjPlayer = pjLeonard.id
    } else if (pjHoward.checked) {
        pj.innerHTML = pjHoward.id
        namePjPlayer = pjHoward.id
    } else {
        alert('Debes seleccionar un personaje primero')
    }
    extraerAtaques(namePjPlayer)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function extraerAtaques(namePjPlayer) {
    let ataques
    for (let i = 0; i < nerds.length; i++) {
        if (namePjPlayer == nerds[i].nombre){
            ataques = nerds[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques (ataques) {
    ataques.forEach((ataque) => {
        ataquesNerd = `
        <button id=${ataque.id} class="btnAttack bAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesNerd
    })
    if (namePjPlayer == 'Shledon') {
        btnAttackSpock = document.getElementById('btnAttackSpock')
        btnAttackPapel = document.getElementById('btnAttackPapel')
        btnAttackTijera = document.getElementById('btnAttackTijera')

    } else if (namePjPlayer == 'Leonard') {
        btnAttackPiedra = document.getElementById('btnAttackPiedra')
        btnAttackLagarto = document.getElementById('btnAttackLagarto')
        btnAttackSpock = document.getElementById('btnAttackSpock')

    } else if (namePjPlayer == 'Howard') {
        btnAttackPapel = document.getElementById('btnAttackPapel')
        btnAttackTijera = document.getElementById('btnAttackTijera')
        btnAttackLagarto = document.getElementById('btnAttackLagarto')
    }

    botones = document.querySelectorAll('.bAtaque')
}

function secuenciaAtaque () {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🪨') {
                attackPlayer.push('PIEDRA')
                console.log(attackPlayer)
                boton.style.background = '#122f58'
                boton.disabled = true
            } else if (e.target.textContent === '📃') {
                attackPlayer.push('PAPEL')
                console.log(attackPlayer)
                boton.style.background = '#122f58'
                boton.disabled = true
            } else if (e.target.textContent === '✂️') {
                attackPlayer.push('TIJERA')
                console.log(attackPlayer)
                boton.style.background = '#122f58'
                boton.disabled = true
            } else if (e.target.textContent === '🦎') {
                attackPlayer.push('LAGARTO')
                console.log(attackPlayer)
                boton.style.background = '#122f58'
                boton.disabled = true
            } else if (e.target.textContent === '🖖') {
                attackPlayer.push('SPOCK')
                console.log(attackPlayer)
                boton.style.background = '#122f58'
                boton.disabled = true
            }
            enemyAttack()
        })
    })
}

function enemyPjF (enemigo) {
    enemyPj.innerHTML = enemigo.nombre
    ataquesNerdEnemigo = enemigo.ataques
    secuenciaAtaque ()
}

function random (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function enemyAttack() {
    let randomAttackEnemy = random(0, ataquesNerdEnemigo.length -1)

    if (randomAttackEnemy == 1) {
        attackEnemy.push('PIEDRA')
    } else if (randomAttackEnemy == 2) {
        attackEnemy.push('PAPEL')
    } else if (randomAttackEnemy == 3) {
        attackEnemy.push('TIJERA')
    } else if (randomAttackEnemy == 4) {
        attackEnemy.push('LAGARTO')
    } else {
        attackEnemy.push('SPOCK')
    }
    console.log(attackEnemy)
    iniciarPelea()
}

function iniciarPelea() {
    if(attackPlayer.length === 5) {
        combate ()
    }
}

function indexAmbosAtaques (jugador, enemigo) {
    indexAtaqueJugador = attackPlayer[jugador]
    indexAtaqueEnemigo = attackEnemy[enemigo]
}

function combate () {
    for (let index = 0; index < attackPlayer.length; index++) {
        if (attackPlayer[index] === attackEnemy[index]) {
            indexAmbosAtaques (index, index)
            createMessage('Empate')
        } else if (attackPlayer[index] == 'PIEDRA' && (attackEnemy[index] == 'TIJERA' || attackEnemy[index] == 'LAGARTO') || attackPlayer[index] == 'PAPEL' && (attackEnemy[index] == 'PIEDRA' || attackEnemy[index] == 'SPOCK') || attackPlayer[index] == 'TIJERA' && (attackEnemy[index] == 'PAPEL' || attackEnemy[index] == 'LAGARTO') || attackPlayer[index] == 'LAGARTO' && (attackEnemy[index] == 'PAPEL' || attackEnemy[index] == 'SPOCK') || attackPlayer[index] == 'SPOCK' && (attackEnemy[index] == 'PIEDRA' || attackEnemy[index] == 'TIJERA')) {
            indexAmbosAtaques (index, index)
            createMessage('Ganaste')
            victoriasJugador++
            spanVictoriasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosAtaques (index, index)
            createMessage('Perdiste')
            victoriasEnemigo++
            spanVictoriasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    revisarVictorias()

}

function revisarVictorias () {
    if (victoriasJugador === victoriasEnemigo) {
        createFinalMessage("Empateeee perros!!!")
    } else if (victoriasJugador > victoriasEnemigo) {
        createFinalMessage("Felicitaciones, Ganaste")
    } else {
        createFinalMessage("Tas por la verga mijo")
    }
}

function createMessage(resultado) {
    let newAtkP = document.createElement('p')
    let newAtkE = document.createElement('p')

    messageSection.innerHTML = resultado
    newAtkP.innerHTML = indexAtaqueJugador
    newAtkE.innerHTML = indexAtaqueEnemigo

    atkP.appendChild(newAtkP)
    atkE.appendChild(newAtkE)
}

function createFinalMessage(finalResult) {
    messageSection.innerHTML = finalResult
    sectionRestart.style.display = 'block'
}

function restartGame() {
    location.reload()
}

function pintarCanvas() {
    namePjPlayerObjeto.x = namePjPlayerObjeto.x + namePjPlayerObjeto.velocidadX
    namePjPlayerObjeto.y = namePjPlayerObjeto.y + namePjPlayerObjeto.velocidadY
    lienzo.clearRect(0, 0, habitacion.width, habitacion.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    namePjPlayerObjeto.pintarNerd()
    // sheldonEnemigo.pintarNerd()
    leonardEnemigo.pintarNerd()
    howardEnemigo.pintarNerd()
    if(namePjPlayerObjeto.velocidadX !== 0 || namePjPlayerObjeto.velocidadY !== 0) {
        revisarColision(leonardEnemigo)
        revisarColision(howardEnemigo)
    }
}

function moverDerecha () {
    namePjPlayerObjeto.velocidadX = 5
}

function moverIzquierda () {
    namePjPlayerObjeto.velocidadX = -5
}

function moverAbajo () {
    namePjPlayerObjeto.velocidadY = 5
}

function moverArriba () {
    namePjPlayerObjeto.velocidadY = -5
}

function detenerMovimiento () {
    namePjPlayerObjeto.velocidadX = 0
    namePjPlayerObjeto.velocidadY = 0
}

function sePresionoTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break;
        case 'ArrowDown':
            moverAbajo()
            break;
        case 'ArrowLeft':
            moverIzquierda()
            break;
        case 'ArrowRight':
            moverDerecha()
            break;
        default:
            break;
    }
}

function iniciarMapa() {
    
    namePjPlayerObjeto = obtenerObjetoNerd(namePjPlayer)
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', sePresionoTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoNerd() {
    for (let i = 0; i < nerds.length; i++) {
        if (namePjPlayer == nerds[i].nombre){
            return nerds[i]
        }
    }
}

function revisarColision (enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    let arribaNerd = namePjPlayerObjeto.y +25
    let abajoNerd = namePjPlayerObjeto.y + namePjPlayerObjeto.alto -25
    let derechaNerd = namePjPlayerObjeto.x + namePjPlayerObjeto.ancho -25
    let izquierdaNerd = namePjPlayerObjeto.x +25

    if (
        abajoNerd < arribaEnemigo ||
        arribaNerd > abajoEnemigo ||
        derechaNerd < izquierdaEnemigo ||
        izquierdaNerd > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    sectionAttackSelection.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    enemyPjF(enemigo)
}

window.addEventListener('load', startGame)
