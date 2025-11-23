// Trigger thief animation on page load
window.addEventListener('load', () => {
    const thiefScene = document.getElementById('thief-scene');
    const dialogueText = document.getElementById('dialogue-text');
    
    thiefScene.classList.add('active');
    
    // Start typing animation after dialogue appears (4 seconds into animation)
    setTimeout(() => {
        const message = "Okay me cachaste, pero si lo quieres de vuelta, me tienes que ganar en Uno >:)";
        let charIndex = 0;
        
        function typeWriter() {
            if (charIndex < message.length) {
                dialogueText.innerHTML += message.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 80);
            } else {
                // Text finished typing, wait 2 more seconds before redirect
                setTimeout(() => {
                    window.location.href = 'uno.html';
                }, 2000);
            }
        }
        
        typeWriter();
    }, 4000);
});
