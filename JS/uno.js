// UNO Game Logic
const colors = ['red', 'yellow', 'green', 'blue'];
const values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Draw2'];
const wilds = ['Wild', 'Wild4'];

let deck = [];
let playerHand = [];
let botHand = [];
let discardPile = [];
let currentColor = '';
let currentValue = '';
let isPlayerTurn = true;
let gameActive = false;
let direction = 1; // 1 for clockwise, -1 for counter-clockwise

// Create deck
function createDeck() {
    deck = [];
    
    // Add colored cards (2 of each except 0)
    colors.forEach(color => {
        deck.push({ color, value: '0' }); // One 0 per color
        values.slice(1).forEach(value => {
            deck.push({ color, value });
            deck.push({ color, value }); // Two of each
        });
    });
    
    // Add wild cards (4 of each type)
    for (let i = 0; i < 4; i++) {
        deck.push({ color: 'wild', value: 'Wild' });
        deck.push({ color: 'wild', value: 'Wild4' });
    }
    
    shuffleDeck();
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function drawCard() {
    if (deck.length === 0) {
        // Reshuffle discard pile into deck (keep top card)
        const topCard = discardPile.pop();
        deck = [...discardPile];
        discardPile = [topCard];
        shuffleDeck();
    }
    return deck.pop();
}

function dealCards() {
    playerHand = [];
    botHand = [];
    
    for (let i = 0; i < 7; i++) {
        playerHand.push(drawCard());
        botHand.push(drawCard());
    }
    
    // Draw initial card (not a wild)
    let startCard = drawCard();
    while (startCard.color === 'wild') {
        deck.unshift(startCard);
        startCard = drawCard();
    }
    
    discardPile = [startCard];
    currentColor = startCard.color;
    currentValue = startCard.value;
}

function renderCard(card, clickable = true) {
    const cardDiv = document.createElement('div');
    cardDiv.className = `card ${card.color}`;
    
    if (!clickable) {
        cardDiv.classList.add('disabled');
    }
    
    if (card.value === 'Wild') {
        cardDiv.innerHTML = `<div>🎨</div>`;
    } else if (card.value === 'Wild4') {
        cardDiv.innerHTML = `<div>+4</div>`;
    } else if (card.value === 'Draw2') {
        cardDiv.innerHTML = `<div>+2</div>`;
    } else {
        cardDiv.innerHTML = `<div>${card.value}</div>`;
    }
    
    return cardDiv;
}

function renderHands() {
    // Render player hand
    const playerHandEl = document.getElementById('player-hand');
    playerHandEl.innerHTML = '';
    
    playerHand.forEach((card, index) => {
        const canPlay = isPlayerTurn && canPlayCard(card);
        const cardEl = renderCard(card, canPlay);
        
        if (canPlay) {
            cardEl.addEventListener('click', () => playCard(index, true));
        }
        
        playerHandEl.appendChild(cardEl);
    });
    
    // Render bot hand (hidden)
    const botHandEl = document.getElementById('bot-hand');
    botHandEl.innerHTML = '';
    
    botHand.forEach(() => {
        const cardEl = document.createElement('div');
        cardEl.className = 'card card-back';
        cardEl.innerHTML = 'UNO';
        botHandEl.appendChild(cardEl);
    });
    
    // Update card counts
    document.getElementById('player-card-count').textContent = `${playerHand.length} cards`;
    document.getElementById('bot-card-count').textContent = `${botHand.length} cards`;
    
    // Update current card
    const currentCardEl = document.getElementById('current-card');
    const topCard = discardPile[discardPile.length - 1];
    currentCardEl.className = `card ${currentColor}`;
    
    if (topCard.value === 'Wild') {
        currentCardEl.innerHTML = `<div>🎨</div>`;
    } else if (topCard.value === 'Wild4') {
        currentCardEl.innerHTML = `<div>+4</div>`;
    } else if (topCard.value === 'Draw2') {
        currentCardEl.innerHTML = `<div>+2</div>`;
    } else {
        currentCardEl.innerHTML = `<div>${topCard.value}</div>`;
    }
    
    // Update color indicator
    const colorEl = document.getElementById('current-color');
    colorEl.textContent = translateColor(currentColor);
    colorEl.style.background = `linear-gradient(135deg, ${getColorHex(currentColor)}, ${getColorHex(currentColor)})`;
}

function translateColor(color) {
    const colorTranslations = {
        red: 'rojo',
        yellow: 'amarillo',
        green: 'verde',
        blue: 'azul'
    };
    return colorTranslations[color] || color;
}

function getColorHex(color) {
    const colorMap = {
        red: '#e74c3c',
        yellow: '#f1c40f',
        green: '#2ecc71',
        blue: '#3498db'
    };
    return colorMap[color] || '#333';
}

function canPlayCard(card) {
    if (card.color === 'wild') return true;
    return card.color === currentColor || card.value === currentValue;
}

function playCard(index, isPlayer) {
    const hand = isPlayer ? playerHand : botHand;
    const card = hand[index];
    
    // Add to discard pile
    discardPile.push(card);
    hand.splice(index, 1);
    
    // Check for win
    if (hand.length === 0) {
        endGame(isPlayer);
        return;
    }
    
    // Handle special cards
    if (card.value === 'Wild' || card.value === 'Wild4') {
        if (isPlayer) {
            // Show color picker
            showColorPicker(card.value === 'Wild4');
        } else {
            // Bot chooses color (most common in hand)
            currentColor = getBotBestColor();
            if (card.value === 'Wild4') {
                // Player draws 4 cards
                for (let i = 0; i < 4; i++) {
                    playerHand.push(drawCard());
                }
            }
            currentValue = card.value;
            switchTurn();
        }
    } else {
        currentColor = card.color;
        currentValue = card.value;
        
        // Handle action cards
        if (card.value === 'Draw2') {
            const opponent = isPlayer ? botHand : playerHand;
            for (let i = 0; i < 2; i++) {
                opponent.push(drawCard());
            }
            renderHands();
            setTimeout(() => {
                switchTurn();
            }, 1000);
            return;
        }
        
        switchTurn();
    }
}

function showColorPicker(isDraw4) {
    const modal = document.getElementById('color-picker');
    modal.classList.add('active');
    
    const colorBtns = document.querySelectorAll('.color-btn');
    colorBtns.forEach(btn => {
        btn.onclick = () => {
            currentColor = btn.dataset.color;
            currentValue = isDraw4 ? 'Wild4' : 'Wild';
            modal.classList.remove('active');
            
            if (isDraw4) {
                // Bot draws 4 cards
                for (let i = 0; i < 4; i++) {
                    botHand.push(drawCard());
                }
            }
            
            switchTurn();
        };
    });
}

function getBotBestColor() {
    const colorCount = { red: 0, yellow: 0, green: 0, blue: 0 };
    botHand.forEach(card => {
        if (card.color !== 'wild') {
            colorCount[card.color]++;
        }
    });
    
    let maxColor = 'red';
    let maxCount = 0;
    Object.keys(colorCount).forEach(color => {
        if (colorCount[color] > maxCount) {
            maxCount = colorCount[color];
            maxColor = color;
        }
    });
    
    return maxColor;
}

function switchTurn() {
    isPlayerTurn = !isPlayerTurn;
    console.log('Switch turn - isPlayerTurn:', isPlayerTurn);
    updateTurnIndicator();
    
    // Always update card interactivity immediately after turn change
    renderHands();
    
    if (!isPlayerTurn) {
        // Bot's turn
        setTimeout(() => {
            botPlay();
        }, 1500);
    }
}

function botPlay() {
    if (!gameActive) return;
    
    console.log('Bot playing...');
    
    // Find playable cards
    const playableCards = botHand
        .map((card, index) => ({ card, index }))
        .filter(({ card }) => canPlayCard(card));
    
    if (playableCards.length > 0) {
        // Play a random playable card
        const randomCard = playableCards[Math.floor(Math.random() * playableCards.length)];
        console.log('Bot playing card:', randomCard.card);
        playCard(randomCard.index, false);
    } else {
        // Keep drawing until bot gets a playable card
        console.log('Bot drawing cards until playable...');
        let drawnCard = drawCard();
        botHand.push(drawnCard);
        renderHands();
        
        let attempts = 0;
        const drawInterval = setInterval(() => {
            if (canPlayCard(drawnCard)) {
                console.log('Bot got playable card:', drawnCard);
                clearInterval(drawInterval);
                setTimeout(() => {
                    playCard(botHand.length - 1, false);
                }, 800);
            } else if (attempts < 50) { // Safety limit
                console.log('Bot drawing another card...');
                drawnCard = drawCard();
                botHand.push(drawnCard);
                renderHands();
                attempts++;
            } else {
                console.log('Bot reached draw limit, switching turn');
                clearInterval(drawInterval);
                switchTurn();
            }
        }, 600);
    }
}

function updateTurnIndicator() {
    const indicator = document.getElementById('turn-indicator');
    indicator.textContent = isPlayerTurn ? "Tu turno" : "Turno del ladron";
    indicator.style.background = isPlayerTurn 
        ? 'rgba(46, 204, 113, 0.6)' 
        : 'rgba(231, 76, 60, 0.6)';
}

// Draw from deck
document.getElementById('draw-pile').addEventListener('click', () => {
    if (gameActive && isPlayerTurn) {
        console.log('Player drawing cards until playable...');
        
        function drawUntilPlayable() {
            const drawnCard = drawCard();
            playerHand.push(drawnCard);
            console.log('Player drew:', drawnCard);
            renderHands();
            
            if (canPlayCard(drawnCard)) {
                console.log('Player got playable card!');
                // Card is playable, player can now play it
                // Turn stays with player
            } else {
                // Keep drawing
                console.log('Card not playable, drawing another...');
                setTimeout(() => {
                    drawUntilPlayable();
                }, 500);
            }
        }
        
        drawUntilPlayable();
    }
});

function endGame(playerWon) {
    gameActive = false;
    
    if (playerWon) {
        showLeositoMessage();
    } else {
        const defeatMessage = document.getElementById('defeat-message');
        defeatMessage.classList.add('active');
        
        // Play Ayudaa.mp3 after 6 seconds (when thief exits screen)
        setTimeout(() => {
            const audio = new Audio('imgs/Ayudaa.mp3');
            audio.play();
        }, 6000);
        
        // Reload page after animation ends (6 seconds)
        setTimeout(() => {
            location.reload();
        }, 6000);
    }
}

function showLeositoMessage() {
    const victoryMessage = document.getElementById('victory-message');
    const dialogueText = document.getElementById('dialogue-text');
    const dialogueContinue = document.getElementById('dialogue-continue');
    const victoryDialogue = document.getElementById('victory-dialogue');
    const leoVictory = document.getElementById('leo-victory');
    const leoHappy = document.getElementById('leo-happy');
    const thiefSmall = document.getElementById('thief-small');
    const leoSmall = document.getElementById('leo-small');
    
    // Hide the small thief and leo from bot area
    thiefSmall.style.display = 'none';
    leoSmall.style.display = 'none';
    
    // Show victory message
    victoryMessage.classList.add('active');
    
    // After 6.5 seconds (when punch and thief flying animation ends), swap Leo images
    setTimeout(() => {
        leoVictory.style.display = 'none';
        leoHappy.style.display = 'block';
        
        // Show dialogue bubble after a brief delay
        setTimeout(() => {
            victoryDialogue.classList.add('visible');
            
            // Start typing animation (slower)
            setTimeout(() => {
                const messages = [
                    "Gracias por salvarme Nicole! Mi heroina, mi corazon :D",
                    "Tengo algo que mostrarte..."
                ];
                
                let messageIndex = 0;
                let charIndex = 0;
                let currentMessage = '';
                
                function typeWriter() {
                    if (messageIndex < messages.length) {
                        if (charIndex < messages[messageIndex].length) {
                            currentMessage += messages[messageIndex].charAt(charIndex);
                            dialogueText.innerHTML = currentMessage;
                            charIndex++;
                            setTimeout(typeWriter, 80); // Slower typing (was 50)
                        } else {
                            // Finished typing current message
                            if (messageIndex < messages.length - 1) {
                                // Add line break and continue with next message
                                currentMessage += '<br><br>';
                                messageIndex++;
                                charIndex = 0;
                                setTimeout(typeWriter, 800);
                            } else {
                                // All messages typed, show continue button
                                const continueBtn = document.getElementById('continue-btn');
                                continueBtn.style.display = 'inline-block';
                                continueBtn.addEventListener('click', () => {
                                    window.location.href = 'carrousel.html';
                                });
                            }
                        }
                    }
                }
                
                typeWriter();
            }, 300);
        }, 100);
    }, 6500);
}

function initGame() {
    createDeck();
    dealCards();
    isPlayerTurn = true;
    gameActive = true;
    direction = 1;
    
    document.getElementById('intro-message').classList.remove('active');
    document.getElementById('game-container').classList.add('active');
    
    renderHands();
    updateTurnIndicator();
}

// Event listeners
document.getElementById('start-btn').addEventListener('click', initGame);

document.getElementById('retry-btn').addEventListener('click', () => {
    document.getElementById('defeat-message').classList.remove('active');
    document.getElementById('game-container').classList.remove('active');
    document.getElementById('intro-message').classList.add('active');
});

// Show intro on load
window.addEventListener('load', () => {
    document.getElementById('intro-message').classList.add('active');
});
