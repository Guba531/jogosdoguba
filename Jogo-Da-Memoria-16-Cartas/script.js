// Array com as URLS das imagens
const imageUrls = [
    'img/r34.webp',
    'img/r35.jpg',
    'img/dodge1970.avif',
    'img/challenger.jpg',
    'img/1995_Mitsubishi_Eclipse.webp',
    'img/evo.webp',
    'img/supraMK4.jpg',
    'img/rx7.avif'
];

// Variaveis globais do jogo
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let attempts = 0;
let gameStarted = false;
let startTime = null;
let timerInterval = null;

// Pega os elementos HTML que vamos usar
const gameBoard = document.getElementById('gameBoard');
const attemptsSpan = document.getElementById('attempts');
const timeSpan = document.getElementById('time');
const messageDiv = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');

// Função que embaralha um array (algoritimo Fisher-Yates)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j] = shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function createCardsArray() {
    const pairs = [...imageUrls, ...imageUrls];//Duplica cada imagem para jogadores
    return shuffleArray(pairs);//Embaralha as cartas
}

function createCardElement(imageUrl, index)  {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;
    card.dataset.image = imageUrl;

    card.innerHTML = `
    <div class="card-face card-back">?</div>
    <div class="card-face card-front">
        <img src="${imageUrl}" alt="Carta ${index}">
    </div>

    `; 

    card.addEventListener('click', () => flipCard(card));

    return card;
}

function flipCard(card) {
    if (!gameStarted) {
        startGame();
    }

    if (card.classList.add('flipped') ||
    card.classList.add('matched') |
    flippedCards.length >= 2) {
     return;

    }

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        attempts++;
        attemptsSpan.textContent = attempts;

        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.image === card2.dataset.image) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;

        if (matchedPairs === 8) {
            endGame();
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    flippedCards = [];
}