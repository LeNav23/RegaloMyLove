// Section structure - each section auto-plays images, button appears at end
const sections = [
    // SECTION 1
    {
        text: 'Estos fueron nuestros primeros momentos juntos en Schooldays. Me gusto mucho tu humor, tu voz y estar contigo. Sin darte cuenta, ya eras la parte fav de mis dias.',
        images: [
            { src: 'imgs/MC_NikkiLeox5.jpeg', zoom: 'in' },
            { src: 'imgs/MC_NikkiLeox6.jpeg', zoom: 'out' },
            { src: 'imgs/MC_Friends1.png', zoom: 'in' },
            { src: 'imgs/MC_Friends2.png', zoom: 'out' },
            { src: 'imgs/MC_Friends3.png', zoom: 'in' }
        ]
    },
    
    // SECTION 2
    {
        parts: [
            {
                text: 'Despues de un tiempo, te pedi que salieras conmigo obligado por Dark la verdad :)',
                duration: 10000,
                images: [{ src: 'imgs/MC_Nikki2.png', zoom: 'out' }]
            },
            {
                text: 'Te acuerdas? De nuestra primera cita en Schooldays?',
                duration: 10000,
                images: [{ src: 'imgs/MC_Nikki1.png', zoom: 'in' }]
            },
            {
                text: 'A partir de ese momento, comenzo una nueva etapa...',
                duration: 18000,
                images: [
                    { src: 'imgs/MC_NikkiLeox1.png', zoom: 'out' },
                    { src: 'imgs/MC_Dark.png', zoom: 'in' },
                    { src: 'imgs/MC_NikkiLeox2.png', zoom: 'out' },
                    { src: 'imgs/MC_NikkiLeox3.jpeg', zoom: 'in' },
                    { src: 'imgs/MC_NikkiLeox4.jpeg', zoom: 'out' },
                    { src: 'imgs/MC_NikkiLeox7.jpeg', zoom: 'in' },
                    { src: 'imgs/MC_NikkiLeox8.jpeg', zoom: 'out' },
                    { src: 'imgs/MC_NikkiLeox11.png', zoom: 'in' }
                ]
            }
        ]
    },
    
    // SECTION 3
    {
        parts: [
            {
                text: 'No tienes idea de cuanto disfrute y disfruto cada momento que paso contigo, cada que jugamos Valorant...',
                images: [
                    { src: 'imgs/ValorantMVP.png', zoom: 'out' },
                    { src: 'imgs/ValorantMVP1.png', zoom: 'in' },
                    { src: 'imgs/ValorantNikkiLeox1.png', zoom: 'out' }
                ]
            },
            {
                text: 'Disfrute cada momento que jugamos en nuestro server de Minecraft...',
                text2: 'Hay que jugarlo mas por cierto :)',
                text2Delay: 1000,
                images: [
                    { src: 'imgs/MC_ServerNikkiLeox1.png', zoom: 'in' },
                    { src: 'imgs/MC_ServerNikkiLeox2.png', zoom: 'out' },
                    { src: 'imgs/MC_ServerNikkiLeox3.png', zoom: 'in' },
                    { src: 'imgs/MC_ServerNikkiLeox4.png', zoom: 'out' },
                    { src: 'imgs/MC_ServerNikkiLeox5.png', zoom: 'in' }
                ]
            }
        ]
    },
    
    // SECTION 4
    {
        parts: [
            {
                text: 'Cuando vi tu carita por primera vez... ese momento fue magico para mi, cuando tu belleza y tu lindura iluminaron mis ojos',
                images: [
                    { src: 'imgs/Nikki1.jpeg', zoom: 'out' },
                    { src: 'imgs/Nikki2.jpeg', zoom: 'in' },
                    { src: 'imgs/Nikki3.png', zoom: 'out' },
                    { src: 'imgs/Nikki4.jpeg', zoom: 'in' }
                ]
            },
            {
                text: 'De esta mujer es de la cual estoy enamorado. La mas linda de TODO Ecuador',
                images: [
                    { src: 'imgs/Nikki5.jpeg', zoom: 'out' },
                    { src: 'imgs/Nikki6.png', zoom: 'in' },
                    { src: 'imgs/Nikki7.png', zoom: 'out' },
                    { src: 'imgs/Nikki8.png', zoom: 'in' },
                    { src: 'imgs/Nikki9.png', zoom: 'out' }
                ]
            }
        ]
    },
    
    // SECTION 5
    {
        parts: [
            {
                text: 'Pero los momentos que mas he disfrutado contigo, son esos que solamente estamos juntos :)',
                images: [
                    { src: 'imgs/NikkiLeox1.png', zoom: 'in' },
                    { src: 'imgs/NikkiLeox3.png', zoom: 'out' },
                    { src: 'imgs/NikkiLeox4.png', zoom: 'in' },
                    { src: 'imgs/NikkiLeox9.png', zoom: 'out', text: 'Cuando dormimos y comemos en llamada tambien :D' },
                    { src: 'imgs/NikkiLeox5.png', zoom: 'in' },
                    { src: 'imgs/NikkiLeox6.png', zoom: 'out' },
                    { src: 'imgs/NikkiLeox7.png', zoom: 'in' }
                ]
            },
            {
                textFirst: true,
                text: 'El dia que me empece a enamorar de ti, fue el 1ro de Agosto, el dia que me pediste ver un juego de los Phillies conmigo',
                images: [{ src: 'imgs/NikkiLeox2.png', zoom: 'out' }]
            }
        ]
    }
];

// Get all images for random carousel
const allImages = [];
sections.forEach(section => {
    if (section.images) {
        section.images.forEach(img => allImages.push(img.src));
    }
    if (section.parts) {
        section.parts.forEach(part => {
            part.images.forEach(img => allImages.push(img.src));
        });
    }
});

// State
let currentSectionIndex = 0;
let currentPartIndex = 0;
let currentImageIndex = 0;
let imageTimer = null;
let textFadeTimer = null;

const music = document.getElementById('background-music');
const introScreen = document.getElementById('intro-screen');
const kenBurnsCarousel = document.getElementById('ken-burns-carousel');
const randomCarousel = document.getElementById('random-carousel');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const finalBtn = document.getElementById('final-btn');
const currentSlide = document.getElementById('current-slide');
const textOverlay = document.getElementById('text-overlay');
const slideText = document.getElementById('slide-text');
const slideText2 = document.getElementById('slide-text-2');

// Start button
startBtn.addEventListener('click', () => {
    music.play();
    introScreen.style.opacity = '0';
    setTimeout(() => {
        introScreen.classList.remove('active');
        kenBurnsCarousel.classList.add('active');
        startSection(0);
    }, 1000);
});

// Next button - Go to next section
nextBtn.addEventListener('click', () => {
    nextBtn.style.display = 'none';
    clearTimers();
    
    currentSectionIndex++;
    if (currentSectionIndex < sections.length) {
        startSection(currentSectionIndex);
    } else {
        // Transition to random carousel
        kenBurnsCarousel.style.opacity = '0';
        setTimeout(() => {
            kenBurnsCarousel.classList.remove('active');
            randomCarousel.classList.add('active');
            startRandomCarousel();
        }, 1500);
    }
});

// Final button
finalBtn.addEventListener('click', () => {
    window.location.href = 'question.html';
});

function clearTimers() {
    if (imageTimer) clearTimeout(imageTimer);
    if (textFadeTimer) clearTimeout(textFadeTimer);
}

function startSection(sectionIndex) {
    const section = sections[sectionIndex];
    currentPartIndex = 0;
    
    if (section.parts) {
        // Multi-part section
        playPart(section.parts[currentPartIndex]);
    } else {
        // Simple section
        playSimpleSection(section);
    }
}

function playSimpleSection(section) {
    currentImageIndex = 0;
    showText(section.text);
    playImages(section.images, () => {
        // Section complete - show button
        nextBtn.style.display = 'block';
    });
}

function playPart(part) {
    currentImageIndex = 0;
    
    if (part.textFirst) {
        // Exception: show text first, then image (no fade)
        showTextNoFade(part.text);
        setTimeout(() => {
            playImages(part.images, () => {
                advanceToNextPart();
            });
        }, part.text.length * 60 + 1000);
    } else {
        // Normal: show text with images
        showText(part.text, part.text2, part.text2Delay, part.duration);
        playImages(part.images, () => {
            advanceToNextPart();
        });
    }
}

function advanceToNextPart() {
    const section = sections[currentSectionIndex];
    currentPartIndex++;
    
    if (currentPartIndex < section.parts.length) {
        playPart(section.parts[currentPartIndex]);
    } else {
        // Section complete - show button
        nextBtn.style.display = 'block';
    }
}

function showText(text, text2 = null, text2Delay = 0, duration = 18000) {
    slideText.textContent = '';
    slideText2.textContent = '';
    slideText2.classList.remove('visible');
    textOverlay.classList.remove('fade-out');
    textOverlay.classList.add('visible');
    
    typeText(text, slideText, () => {
        if (text2) {
            setTimeout(() => {
                typeText(text2, slideText2, () => {
                    slideText2.classList.add('visible');
                });
            }, text2Delay);
        }
    });
    
    // Fade out after specified duration
    textFadeTimer = setTimeout(() => {
        textOverlay.classList.add('fade-out');
        setTimeout(() => {
            textOverlay.classList.remove('visible', 'fade-out');
        }, 1000);
    }, duration);
}

function showTextNoFade(text) {
    slideText.textContent = '';
    slideText2.textContent = '';
    textOverlay.classList.remove('fade-out');
    textOverlay.classList.add('visible');
    
    typeText(text, slideText);
    // No fade out
}

function typeText(text, element, callback) {
    let charIndex = 0;
    element.textContent = '';
    
    // Handle line breaks
    const lines = text.split('\n');
    let currentLine = 0;
    
    function type() {
        if (currentLine < lines.length) {
            if (charIndex < lines[currentLine].length) {
                element.textContent += lines[currentLine].charAt(charIndex);
                charIndex++;
                setTimeout(type, 60);
            } else {
                // Move to next line
                currentLine++;
                if (currentLine < lines.length) {
                    element.innerHTML += '<br>';
                    charIndex = 0;
                    setTimeout(type, 60);
                } else {
                    if (callback) callback();
                }
            }
        }
    }
    
    type();
}

function playImages(images, onComplete) {
    if (currentImageIndex >= images.length) {
        if (onComplete) onComplete();
        return;
    }
    
    const image = images[currentImageIndex];
    showImage(image, () => {
        currentImageIndex++;
        playImages(images, onComplete);
    });
}

function showImage(imageData, onComplete) {
    // Fade out current
    currentSlide.style.opacity = '0';
    
    setTimeout(() => {
        // Load new image
        currentSlide.innerHTML = '';
        const img = document.createElement('img');
        img.src = imageData.src;
        img.alt = 'Memory';
        
        currentSlide.appendChild(img);
        currentSlide.className = `image-slide active ${imageData.zoom === 'in' ? 'zoom-in' : 'zoom-out'}`;
        
        // Show image-specific text if exists
        if (imageData.text) {
            setTimeout(() => {
                showText(imageData.text);
            }, 500);
        }
        
        currentSlide.style.opacity = '1';
        
        // Wait 6 seconds then next image
        imageTimer = setTimeout(() => {
            if (onComplete) onComplete();
        }, 6000);
    }, 1000);
}

function startRandomCarousel() {
    const randomImage = document.getElementById('random-image');
    let currentRandomIndex = 0;
    
    // Shuffle images
    const shuffled = [...allImages].sort(() => Math.random() - 0.5);
    
    function showNextRandom() {
        randomImage.classList.remove('visible');
        
        setTimeout(() => {
            randomImage.src = shuffled[currentRandomIndex % shuffled.length];
            randomImage.classList.add('visible');
            currentRandomIndex++;
        }, 500);
    }
    
    // Start showing images
    showNextRandom();
    setInterval(showNextRandom, 2000);
    
    // Show button after 45 seconds
    setTimeout(() => {
        finalBtn.classList.add('visible');
    }, 45000);
}

// Initialize
window.addEventListener('load', () => {
    introScreen.classList.add('active');
});
