const startBtn = document.getElementById("startBtn");

// Bouncing Leo - DVD style
const bouncingLeo = document.getElementById('bouncing-leo');
let x = Math.random() * (window.innerWidth - 120);
let y = Math.random() * (window.innerHeight - 120);
let dx = 2; // velocidad horizontal
let dy = 2; // velocidad vertical
const leoWidth = 120;
const leoHeight = 120;

function animateLeo() {
  x += dx;
  y += dy;
  
  // Rebotar en los bordes
  if (x + leoWidth >= window.innerWidth || x <= 0) {
    dx = -dx;
  }
  if (y + leoHeight >= window.innerHeight || y <= 0) {
    dy = -dy;
  }
  
  bouncingLeo.style.left = x + 'px';
  bouncingLeo.style.top = y + 'px';
  
  requestAnimationFrame(animateLeo);
}

animateLeo();

startBtn.addEventListener("click", () => {
  // Add fade out animation to current content
  document.querySelector('#portada').style.animation = 'fadeOut 2s forwards';
  
  // Play a soft chime or magical sound (optional)
  const audio = new Audio('sounds/magic-chime.mp3'); // You'll need to add this file
  audio.play();
  
  // Add extra sparkles/hearts animation
  createSparkleEffect();
  
  // Transition to next section after animation
  setTimeout(() => {
    window.location.href = 'quiz.html'; // Go to quiz
  }, 2000);
});

function createSparkleEffect() {
  const sparkles = document.createElement('div');
  sparkles.className = 'sparkles-container';
  document.body.appendChild(sparkles);
  
  // Create 20 sparkles
  for(let i = 0; i < 20; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkles.appendChild(sparkle);
  }
}