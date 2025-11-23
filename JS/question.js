const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const imageContainer = document.getElementById('image-container');

let clickCount = 0;
let imageTimeout = null;

const imageSequence = [
    'imgs/what.png',
    'imgs/madcat1.png',
    'imgs/madcat2.png',
    'imgs/madcat3.png',
    'imgs/hehe.png'
];

// Show image for 2 seconds
function showImage(imageSrc) {
    // Clear any existing timeout
    if (imageTimeout) {
        clearTimeout(imageTimeout);
    }
    
    // Create and show image
    imageContainer.innerHTML = `<img src="${imageSrc}" alt="Reaction">`;
    imageContainer.classList.add('show');
    
    // Hide image after 2 seconds
    imageTimeout = setTimeout(() => {
        imageContainer.classList.remove('show');
    }, 2000);
}

// Event listener for No button
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (clickCount < imageSequence.length) {
        showImage(imageSequence[clickCount]);
        clickCount++;
        
        // If this was the 5th click (hehe.png), hide the No button
        if (clickCount === 5) {
            setTimeout(() => {
                noBtn.style.display = 'none';
            }, 100);
        }
    }
});

// Event listener for Yes button
yesBtn.addEventListener('click', () => {
    startEpicCelebration();
});

function startEpicCelebration() {
    // Hide buttons and question
    document.getElementById('buttons-container').style.display = 'none';
    document.getElementById('main-question').style.display = 'none';
    imageContainer.innerHTML = '';
    
    // Change background to romantic sunset
    document.body.classList.add('celebration-mode');
    
    // Make characters jump
    document.querySelectorAll('.character').forEach(char => {
        char.classList.add('celebrate');
    });
    
    // Intensify lighthouse light
    document.querySelector('.lighthouse-img').classList.add('lighthouse-celebrate');
    
    // Create fireworks
    createFireworks();
    
    // Create hearts
    createHearts();
    
    // Create confetti
    createConfetti();
    
    // Show romantic messages
    setTimeout(() => {
        showRomanticMessage();
    }, 1000);
    
    // Play celebration sound (optional - commented out if no audio file)
    // const audio = new Audio('sounds/celebration.mp3');
    // audio.play();
}

function createFireworks() {
    const fireworksContainer = document.createElement('div');
    fireworksContainer.className = 'fireworks-container';
    document.body.appendChild(fireworksContainer);
    
    setInterval(() => {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = Math.random() * 100 + '%';
        firework.style.top = Math.random() * 50 + '%';
        firework.style.setProperty('--color', `hsl(${Math.random() * 360}, 100%, 60%)`);
        fireworksContainer.appendChild(firework);
        
        setTimeout(() => firework.remove(), 1500);
    }, 300);
}

function createHearts() {
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'hearts-container';
    document.body.appendChild(heartsContainer);
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heartsContainer.appendChild(heart);
        
        setTimeout(() => heart.remove(), 6000);
    }, 200);
}

function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 60%)`;
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confettiContainer.appendChild(confetti);
        }, i * 30);
    }
}

function showRomanticMessage() {
    const messageContainer = document.createElement('div');
    messageContainer.className = 'romantic-message';
    messageContainer.innerHTML = `
        <h1 class="main-message">OFICIALMENTE SOMOS NOVIOS :D</h1>
        <p class="sub-message">Ahora si eres mia o solo mia >:)</p>
    `;
    document.body.appendChild(messageContainer);
    
    // Add happycat gifs around the message
    for (let i = 0; i < 8; i++) {
        const cat = document.createElement('img');
        cat.src = 'imgs/happycat.gif';
        cat.className = `happycat happycat-${i + 1}`;
        messageContainer.appendChild(cat);
    }
    
    setTimeout(() => {
        messageContainer.classList.add('show');
    }, 100);
}
