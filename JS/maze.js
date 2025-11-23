// Configuración del canvas
const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

// Load images for player and goal
const playerImg = new Image();
playerImg.src = 'imgs/Nikki3.png';

const goalImg = new Image();
goalImg.src = 'imgs/Leox5.png';

// Dimensiones del laberinto - Variables (se ajustarán según el nivel)
let cols = 10;
let rows = 10;
const cellSize = 35;

// Configuración de tamaño por nivel
const levelConfig = {
    1: { cols: 10, rows: 10 },  // Nivel 1: pequeño
    2: { cols: 15, rows: 15 },  // Nivel 2: mediano
    3: { cols: 20, rows: 20 }   // Nivel 3: grande
};

// Sistema de niveles
let currentLevel = 1;
const totalLevels = 3;

// Clases del laberinto
class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.walls = { top: true, right: true, bottom: true, left: true };
        this.visited = false;
    }

    draw() {
        const x = this.x * cellSize;
        const y = this.y * cellSize;

        ctx.strokeStyle = '#3d362f';
        ctx.lineWidth = 3;

        if (this.walls.top) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + cellSize, y);
            ctx.stroke();
        }
        if (this.walls.right) {
            ctx.beginPath();
            ctx.moveTo(x + cellSize, y);
            ctx.lineTo(x + cellSize, y + cellSize);
            ctx.stroke();
        }
        if (this.walls.bottom) {
            ctx.beginPath();
            ctx.moveTo(x + cellSize, y + cellSize);
            ctx.lineTo(x, y + cellSize);
            ctx.stroke();
        }
        if (this.walls.left) {
            ctx.beginPath();
            ctx.moveTo(x, y + cellSize);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
}

// Generar el grid del laberinto
let grid = [];
function createGrid() {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            grid.push(new Cell(x, y));
        }
    }
}

function getCell(x, y) {
    if (x < 0 || x >= cols || y < 0 || y >= rows) return undefined;
    return grid[x + y * cols];
}

function getUnvisitedNeighbors(cell) {
    const neighbors = [];
    const top = getCell(cell.x, cell.y - 1);
    const right = getCell(cell.x + 1, cell.y);
    const bottom = getCell(cell.x, cell.y + 1);
    const left = getCell(cell.x - 1, cell.y);

    if (top && !top.visited) neighbors.push({ cell: top, dir: 'top' });
    if (right && !right.visited) neighbors.push({ cell: right, dir: 'right' });
    if (bottom && !bottom.visited) neighbors.push({ cell: bottom, dir: 'bottom' });
    if (left && !left.visited) neighbors.push({ cell: left, dir: 'left' });

    return neighbors;
}

function removeWalls(current, next, direction) {
    if (direction === 'top') {
        current.walls.top = false;
        next.walls.bottom = false;
    } else if (direction === 'right') {
        current.walls.right = false;
        next.walls.left = false;
    } else if (direction === 'bottom') {
        current.walls.bottom = false;
        next.walls.top = false;
    } else if (direction === 'left') {
        current.walls.left = false;
        next.walls.right = false;
    }
}

// Algoritmo de generación del laberinto (Depth-First Search)
function generateMaze() {
    const stack = [];
    let current = grid[0];
    current.visited = true;

    while (true) {
        const neighbors = getUnvisitedNeighbors(current);

        if (neighbors.length > 0) {
            const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
            const next = randomNeighbor.cell;
            
            stack.push(current);
            removeWalls(current, next, randomNeighbor.dir);
            
            current = next;
            current.visited = true;
        } else if (stack.length > 0) {
            current = stack.pop();
        } else {
            break;
        }
    }
}

// Jugador
const player = {
    x: 0,
    y: 0,
    size: cellSize * 0.6,
    color: '#ff6b9d'
};

// Meta (Leosito)
const goal = {
    x: cols - 1,
    y: rows - 1,
    size: cellSize * 0.7,
    emoji: '🐻'
};

// Dibujar jugador (Nikki PNG)
function drawPlayer() {
    const x = player.x * cellSize + cellSize / 2;
    const y = player.y * cellSize + cellSize / 2;
    
    const imgSize = cellSize * 0.8;
    ctx.drawImage(playerImg, x - imgSize / 2, y - imgSize / 2, imgSize, imgSize);
}

// Dibujar meta (Leosito PNG)
function drawGoal() {
    const x = goal.x * cellSize + cellSize / 2;
    const y = goal.y * cellSize + cellSize / 2;
    
    // Efecto de peligro pulsante
    const pulseScale = Math.sin(Date.now() / 300) * 0.1 + 1;
    const imgSize = cellSize * 0.85 * pulseScale;
    
    ctx.drawImage(goalImg, x - imgSize / 2, y - imgSize / 2, imgSize, imgSize);
}

// Verificar si el movimiento es válido
function canMove(newX, newY, direction) {
    if (newX < 0 || newX >= cols || newY < 0 || newY >= rows) return false;
    
    const currentCell = getCell(player.x, player.y);
    
    if (direction === 'up' && currentCell.walls.top) return false;
    if (direction === 'right' && currentCell.walls.right) return false;
    if (direction === 'down' && currentCell.walls.bottom) return false;
    if (direction === 'left' && currentCell.walls.left) return false;
    
    return true;
}

// Controlar el movimiento del jugador
let gameActive = false;
let audioPlayed = false;

document.addEventListener('keydown', (e) => {
    if (!gameActive) return;

    let newX = player.x;
    let newY = player.y;
    let direction = '';

    switch(e.key) {
        case 'ArrowUp':
            newY--;
            direction = 'up';
            break;
        case 'ArrowDown':
            newY++;
            direction = 'down';
            break;
        case 'ArrowLeft':
            newX--;
            direction = 'left';
            break;
        case 'ArrowRight':
            newX++;
            direction = 'right';
            break;
        default:
            return;
    }

    if (canMove(newX, newY, direction)) {
        player.x = newX;
        player.y = newY;
        
        // Reproducir audio de ayuda la primera vez que te mueves
        if (!audioPlayed) {
            const helpAudio = document.getElementById('help-audio');
            if (helpAudio) {
                helpAudio.play().catch(err => console.log('Audio no disponible'));
            }
            audioPlayed = true;
        }

        // Verificar si llegó a la meta
        if (player.x === goal.x && player.y === goal.y) {
            gameActive = false;
            
            // Verificar si es el último nivel
            if (currentLevel < totalLevels) {
                showLevelComplete();
            } else {
                showVictoryMessage();
            }
        }
    }
});

// Mostrar mensaje de nivel completado
function showLevelComplete() {
    setTimeout(() => {
        const levelMsg = document.createElement('div');
        levelMsg.className = 'level-complete-message';
        levelMsg.innerHTML = `
            <div class="level-content">
                <h2>Nivel ${currentLevel} Completo</h2>
                <p>Pero no lo has salvado D:</p>
                <button id="next-level-btn">Siguiente</button>
            </div>
        `;
        document.body.appendChild(levelMsg);
        
        setTimeout(() => levelMsg.classList.add('active'), 100);
        
        document.getElementById('next-level-btn').addEventListener('click', () => {
            currentLevel++;
            document.getElementById('maze-header').querySelector('h2').textContent = 
                `Salva a Leosito! - Nivel ${currentLevel}/${totalLevels}`;
            levelMsg.remove();
            initGame();
        });
    }, 500);
}

// Dibujar el laberinto completo
function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar fondo de piedra/roca oscura
    ctx.fillStyle = '#6d665d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar celdas
    grid.forEach(cell => cell.draw());
    
    // Dibujar objetivo y jugador
    drawGoal();
    drawPlayer();
}

// Animación del juego
function gameLoop() {
    if (gameActive) {
        drawMaze();
        requestAnimationFrame(gameLoop);
    } else {
        drawMaze(); // Dibujar una última vez
    }
}

// Mostrar mensaje de victoria - Redirigir a thief2
function showVictoryMessage() {
    setTimeout(() => {
        window.location.href = 'thief2.html';
    }, 500);
}

// Inicializar el juego
function initGame() {
    // Configurar tamaño del laberinto según el nivel
    const config = levelConfig[currentLevel];
    cols = config.cols;
    rows = config.rows;
    
    // Actualizar tamaño del canvas
    canvas.width = cols * cellSize;
    canvas.height = rows * cellSize;
    
    // Actualizar posición de la meta
    goal.x = cols - 1;
    goal.y = rows - 1;
    
    grid = [];
    createGrid();
    generateMaze();
    
    // Reset jugador
    player.x = 0;
    player.y = 0;
    
    gameActive = true;
    audioPlayed = false;
    gameLoop();
}

// Trigger thief entrance animation on page load
window.addEventListener('load', () => {
    const thiefEntrance = document.getElementById('thief-entrance');
    if (thiefEntrance) {
        thiefEntrance.classList.add('active');
    }
    // Auto-start the game
    initGame();
});