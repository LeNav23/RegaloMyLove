// Game variables
const gameArea = document.getElementById('game-area');
const player = document.getElementById('player');
const timerDisplay = document.getElementById('timer');
const hitsDisplay = document.getElementById('hits');

let gameActive = false;
let timeLeft = 20;
let hits = 0;
let obstacles = [];
let gameTimer;
let spawnTimer;

// Player position (follows mouse)
let playerX = window.innerWidth / 2;
let playerY = window.innerHeight / 2;

// Player hitbox (smaller than visual for fairer gameplay)
const playerSize = 30;

// Update player position to follow mouse
document.addEventListener('mousemove', (e) => {
    if (!gameActive) return;
    
    playerX = e.clientX;
    playerY = e.clientY;
    
    // Update player position (center it on cursor)
    player.style.left = (playerX - 25) + 'px';
    player.style.top = (playerY - 25) + 'px';
});

// Create obstacle
function createObstacle() {
    if (!gameActive) return;
    
    const obstacle = document.createElement('div');
    obstacle.className = 'obstacle';
    obstacle.textContent = '☀️'; // Sun emoji for now
    
    // Random horizontal position
    const randomX = Math.random() * (window.innerWidth - 60);
    obstacle.style.left = randomX + 'px';
    obstacle.style.top = '-100px';
    
    // Random fall speed (2-5 seconds - faster for more difficulty)
    const fallDuration = 2 + Math.random() * 3;
    obstacle.style.animationDuration = fallDuration + 's';
    
    gameArea.appendChild(obstacle);
    
    // Store obstacle data
    const obstacleData = {
        element: obstacle,
        x: randomX + 30, // Center point
        y: -100,
        width: 60,
        height: 60,
        speed: (window.innerHeight + 100) / (fallDuration * 60) // pixels per frame
    };
    
    obstacles.push(obstacleData);
    
    // Remove obstacle when it leaves screen
    setTimeout(() => {
        if (obstacle.parentNode) {
            obstacle.remove();
            obstacles = obstacles.filter(o => o.element !== obstacle);
        }
    }, fallDuration * 1000);
}

// Check collision
function checkCollisions() {
    obstacles.forEach(obstacle => {
        // Update obstacle position
        obstacle.y += obstacle.speed;
        
        // Simple circle collision detection
        const dx = playerX - obstacle.x;
        const dy = playerY - obstacle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // If collision detected
        if (distance < playerSize + 25) {
            // Hit detected!
            hits++;
            hitsDisplay.textContent = hits;
            
            // Visual feedback
            obstacle.element.style.animation = 'none';
            obstacle.element.style.transform = 'scale(1.5)';
            obstacle.element.style.opacity = '0';
            
            // Remove obstacle
            setTimeout(() => {
                if (obstacle.element.parentNode) {
                    obstacle.element.remove();
                }
            }, 200);
            
            obstacles = obstacles.filter(o => o !== obstacle);
            
            // Flash red on player
            player.style.filter = 'drop-shadow(0 0 20px red)';
            setTimeout(() => {
                player.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))';
            }, 200);
            
            // Check if too many hits (optional: game over at 10 hits)
            if (hits >= 10) {
                endGame(false);
            }
        }
    });
}

// Game loop
function gameLoop() {
    if (!gameActive) return;
    
    checkCollisions();
    requestAnimationFrame(gameLoop);
}

// Start game
function startGame() {
    gameActive = true;
    hits = 0;
    timeLeft = 20;
    obstacles = [];
    
    hitsDisplay.textContent = hits;
    timerDisplay.textContent = timeLeft;
    
    // Clear any existing obstacles
    document.querySelectorAll('.obstacle').forEach(o => o.remove());
    
    // Start spawning obstacles (every 0.5 seconds for more obstacles)
    spawnTimer = setInterval(createObstacle, 500);
    
    // Start countdown timer
    gameTimer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame(true);
        }
    }, 1000);
    
    // Start game loop
    gameLoop();
}

// End game
function endGame(success) {
    gameActive = false;
    clearInterval(gameTimer);
    clearInterval(spawnTimer);
    
    // Clear obstacles
    obstacles.forEach(o => {
        if (o.element.parentNode) {
            o.element.remove();
        }
    });
    obstacles = [];
    
    if (success) {
        // Victory!
        document.getElementById('final-hits').textContent = hits;
        setTimeout(() => {
            document.getElementById('victory-message').classList.add('active');
        }, 500);
    } else {
        // Game over (too many hits)
        document.getElementById('gameover-hits').textContent = hits;
        setTimeout(() => {
            document.getElementById('gameover-message').classList.add('active');
        }, 500);
    }
}

// Event listeners
document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('intro-message').classList.remove('active');
    document.getElementById('game-container').classList.add('active');
    
    // Position player at center initially
    player.style.left = (window.innerWidth / 2 - 25) + 'px';
    player.style.top = (window.innerHeight / 2 - 25) + 'px';
    playerX = window.innerWidth / 2;
    playerY = window.innerHeight / 2;
    
    setTimeout(startGame, 500);
});

document.getElementById('continue-btn').addEventListener('click', () => {
    // Redirect to maze
    window.location.href = 'maze.html'; // Go to maze game
});

document.getElementById('retry-btn').addEventListener('click', () => {
    document.getElementById('gameover-message').classList.remove('active');
    setTimeout(startGame, 500);
});

// Show intro on load
window.addEventListener('load', () => {
    document.getElementById('intro-message').classList.add('active');
});
