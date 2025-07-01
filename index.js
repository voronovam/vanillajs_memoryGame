const cardsLimit = 36
const cardContents = [
    '🍎', '🍎', '🍏', '🍏', '🍒', '🍒', '🍓', '🍓', '🍋', '🍋', '🍍', '🍍', '🌶️', '🌶️', '🍊', '🍊', '🍌', '🍌',
    '🍆', '🍆', '🌽', '🌽', '🥝', '🥝', '🥕', '🥕', '🍇', '🍇', '🍐', '🍐', '🥑', '🥑', '🍉', '🍉', '🍑', '🍑'
]

const shuffledCardContents = cardContents.sort(() => Math.random() - 0.5) //shuffle icons

function setTimer () {
    const counter = document.querySelector('#counter')
    let seconds = 0
    let timerInterval

    timerInterval = setInterval(() => {
        seconds++
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const remainingSeconds = seconds % 60
        // set timer format 00:00:00
        counter.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`

        const removedCards = document.querySelectorAll('.list__card._removed')
        if (removedCards.length === cardsLimit) {
            clearInterval(timerInterval) //stop timer
        }
    }, 1000)
}

function checkMatch() {
    const openCards = document.querySelectorAll('.list__card._open')
    const cardContents = Array.from(openCards).map(card => card.textContent)
    const uniqueCards = [...new Set(cardContents)]

    uniqueCards.forEach(content => {
        const matchingCards = Array.from(openCards).filter(card => card.textContent === content)

        if (matchingCards.length > 1) { // matched cards more than 1
            matchingCards.forEach(card => {
                setTimeout(() => {
                    card.textContent = '✖️'
                    card.classList.add('_removed')
                }, 200)
            })
        }

        if (openCards.length > 1) { // show contents only for 2 open cards at the same time
            openCards.forEach(card => {
                setTimeout(() => {
                    card.classList.remove('_open')
                }, 200)

            })
        }
    })
}

document.addEventListener('DOMContentLoaded', function() {
    const list = document.querySelector('#list')
    const timer = document.querySelector('#timer')
    const button = document.querySelector('#start')

    for (let i = 0; i < cardsLimit; i++) { // create cards
        const card = document.createElement('button')
        card.classList.add('list__card')
        card.textContent = shuffledCardContents[i]
        list.appendChild(card)
    }

    document.querySelectorAll('.list__card').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.add('_open') // add class by click

            checkMatch() // check match cards

            setTimeout(() => {
                card.classList.remove('_open') // remove class after 5 sec
            }, 5000)
        })
    })

    button.addEventListener('click', e => {
        setTimer() // set timer
        list.classList.remove('_hidden') //show cards
        timer.classList.remove('_hidden') //show timer
        button.classList.add('_hidden') // hide start button
    })
})
