// Trigger thief animation on page load
window.addEventListener('load', () => {
    const thiefScene = document.getElementById('thief-scene');
    const dialogueText = document.getElementById('dialogue-text');
    
    thiefScene.classList.add('active');
    
    // Start typing animation after dialogue appears (4 seconds into animation)
    setTimeout(() => {
        const message = "Leosito es mio ahora! Lo quieres de vuelta? Ven por el >:)";
        let charIndex = 0;
        
        function typeWriter() {
            if (charIndex < message.length) {
                dialogueText.innerHTML += message.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 80);
            }
        }
        
        typeWriter();
    }, 4000);
    
    // Redirect to maze after animation completes (14 seconds)
    setTimeout(() => {
        window.location.href = 'maze.html';
    }, 14000);
});
