const questions = [
    {
        question: "¿Cuál es y será nuestro número para siempre?",
        options: ["32", "77", "43", "23"],
        correct: 3,
        feedbackCorrect: "Esooo >:D",
        feedbackIncorrect: "Wow, no nos conoces :("
    },
    {
        question: "¿Me gustan los deportes? :D",
        options: ["No, los odias 🤮", "Si, te encantan ❤️"],
        correct: 1,
        feedbackCorrect: "Esooo >:D",
        feedbackIncorrect: "Wow, no nos conoces :("
    },
    {
        question: "¿Cuál fue la primera película que vimos juntos en llamada?",
        options: ["El Conjuro", "Annabelle", "Moana", "Frozen"],
        correct: 3,
        feedbackCorrect: "Esooo >:D",
        feedbackIncorrect: "Wow, no nos conoces :("
    },
    {
        question: "¿Dónde fue la primera vez que hablamos?",
        options: ["En hospital de SD", "En el parque de SD", "En el aqua de SD", "En el starbucks de SD"],
        correct: 2,
        feedbackCorrect: "Esooo >:D",
        feedbackIncorrect: "Wow, no nos conoces :("
    },
    {
        question: "¿Cuál es el día que nos conocimos?",
        options: ["03 de Julio", "1ro de Agosto", "01 de Julio", "30 de Junio"],
        correct: 3,
        feedbackCorrect: "Esooo >:D",
        feedbackIncorrect: "Wow, no nos conoces :("
    },
    {
        question: "¿A TI te gustan los deportes? 🤨",
        options: ["Ay si, super fan :)", "No, me super encantan :)"],
        correct: 1,
        feedbackCorrect: "Esooo >:D",
        feedbackIncorrect: "Wow, no nos conoces :("
    },
    {
        question: "¿Cuál ha sido mi rango más alto en Valorant?",
        options: ["Bronze 1", "Bronze 2", "Hierro 2", "Hierro 3"],
        correct: 3,
        feedbackCorrect: "Esooo >:D",
        feedbackIncorrect: "Wow, no nos conoces :("
    },
    {
        question: "¿Cuál es NUESTRO jugador favorito en el mundo de deportes?",
        options: ["Bryce Harper", "Luka Doncic", "Johan Duran", "LeBron James"],
        correct: 3,
        feedbackCorrect: "Esooo >:D",
        feedbackIncorrect: "Wow, no nos conoces :("
    },
    {
        question: "¿Cuáles fueron las primeras películas de miedo que vimos?",
        options: ["Las de Chucky", "Las del Conjuro", "Las de Annabelle", "Las de La Monja"],
        correct: 1,
        feedbackCorrect: "Esooo >:D",
        feedbackIncorrect: "Wow, no nos conoces :("
    },
    {
        question: "¿Cuál es la comida que más como?",
        options: ["Tacos", "Carne Asada", "Huevo", "Chilaquiles"],
        correct: 2,
        feedbackCorrect: "Esooo >:D",
        feedbackIncorrect: "Wow, no nos conoces :("
    },
    {
        question: "Escoge un año (solo hay una respuesta correcta)",
        options: ["2019", "2021", "2011", "2016"],
        correct: 3,
        feedbackCorrect: "Esooo >:D",
        feedbackIncorrect: "Wow, no nos conoces :("
    },
    {
        question: "¿Cuál era mi adicción?",
        options: ["Comer", "Chicles", "Videojuegos", "Coca-Cola"],
        correct: 1,
        feedbackCorrect: "Esooo >:D",
        feedbackIncorrect: "Wow, no nos conoces :("
    },
    {
        question: "¿Cuáles son los 5 equipos a los que apoyamos?",
        options: [
            "Steelers, Phillies, 76ers, Hurricanes, Real Madrid",
            "Steelers, 76ers, FC Barcelona, Dallas Stars, Blue Jays",
            "Real Madrid, Phillies, Celtics, Dolphins, Inter de Miami",
            "Hurricanes, Nuggets, Steelers, Mariners, Bayern Munich"
        ],
        correct: 0,
        feedbackCorrect: "Esooo >:D",
        feedbackIncorrect: "Wow, no nos conoces :("
    },
    {
        question: "¿Cómo te pedí que fueras mi novia en SD?",
        options: ["En Starbucks", "En la playa", "En el faro", "En la casa"],
        correct: 2,
        feedbackCorrect: "Esooo >:D",
        feedbackIncorrect: "Wow, no nos conoces :("
    },
    {
        question: "¿Quién es nuestro mejor amigo en SD?",
        options: ["Robi", "Rafa", "Sam", "Dark"],
        correct: 3,
        feedbackCorrect: "Esooo >:D",
        feedbackIncorrect: "Wow, no nos conoces :("
    },
    {
        question: "¿Qué agentes escogemos casi siempre en Valorant?",
        options: ["Sova + Raze", "Omen + Jett", "Killjoy + Viper", "Vyse + Vyper"],
        correct: 3,
        feedbackCorrect: "Esooo >:D",
        feedbackIncorrect: "Wow, no nos conoces :("
    },
    {
        question: "¿Qué es lo que más disfruto hacer contigo?",
        options: ["Comer contigo", "Dormir contigo", "Jugar contigo", "Todos :)"],
        correct: 3,
        feedbackCorrect: "Esooo >:D",
        feedbackIncorrect: "Wow, no nos conoces :("
    },
    {
        question: "¿Cuál es la frase que más digo?",
        options: ["Chinhuetas", "Ostias", "Que pedo", "Ala fregada"],
        correct: 3,
        feedbackCorrect: "Esooo >:D",
        feedbackIncorrect: "Wow, no nos conoces :("
    },
    {
        question: "¿Cuál es nuestra palabra?",
        options: ["Pipi", "Broo", "Ante", "Ahko"],
        correct: 3,
        feedbackCorrect: "Esooo >:D",
        feedbackIncorrect: "Wow, no nos conoces :("
    },
    {
        question: "¿Cuál es nuestra frase?",
        options: ["Estamos sincronizados", "Me caes mal", "*Sacar la lengua*", "Ño"],
        correct: 0,
        feedbackCorrect: "Esooo >:D",
        feedbackIncorrect: "Wow, no nos conoces :("
    },
    {
        question: "¿Número de la Jersey de Lebron?",
        options: ["32", "77", "43", "23"],
        correct: 3,
        feedbackCorrect: "Esooo >:D",
        feedbackIncorrect: "Wow, no nos conoces :("
    }
];

let currentQuestion = 0;
let score = 0;

function displayQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question-text').textContent = question.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('feedback').classList.add('hidden');
    document.getElementById('next-btn').classList.add('hidden');
}

function checkAnswer(selectedIndex) {
    const question = questions[currentQuestion];
    const feedback = document.getElementById('feedback');
    const feedbackText = document.getElementById('feedback-text');
    const nextBtn = document.getElementById('next-btn');
    
    feedback.classList.remove('hidden');
    
    if(selectedIndex === question.correct) {
        score++;
        feedbackText.textContent = question.feedbackCorrect;
        feedback.className = 'feedback correct';
        createSparkles();
        nextBtn.classList.remove('hidden'); // Only show if correct
    } else {
        feedbackText.textContent = question.feedbackIncorrect;
        feedback.className = 'feedback incorrect';
        // Do not show next button if incorrect
    }
}

function nextQuestion() {
    // Add wave effect to the container
    const container = document.querySelector('.quiz-container');
    container.classList.add('wave-effect');
    setTimeout(() => container.classList.remove('wave-effect'), 1000);
    
    currentQuestion++;
    if(currentQuestion < questions.length) {
        displayQuestion();
    } else {
        showFinalMessage();
    }
}

function showFinalMessage() {
    document.getElementById('question-container').classList.add('hidden');
    document.getElementById('final-message').classList.remove('hidden');
    
    // Show first text for 3 seconds
    setTimeout(() => {
        document.getElementById('final-text-1').classList.remove('hidden');
    }, 500);
    
    // Show second text after 3 seconds
    setTimeout(() => {
        document.getElementById('final-text-2').classList.remove('hidden');
    }, 3500);
    
    // Show exclamation marks after 2 more seconds (total 5.5s)
    setTimeout(() => {
        const exclamations = document.getElementById('exclamation-marks');
        exclamations.classList.add('active');
    }, 5500);
    
    // Trigger hand grab animation after 1.5 more seconds (total 7s)
    setTimeout(() => {
        const hand = document.getElementById('grabbing-hand');
        const leo = document.getElementById('leo-image');
        const exclamations = document.getElementById('exclamation-marks');
        
        // Hide exclamations
        exclamations.classList.remove('active');
        
        hand.classList.add('active');
        leo.classList.add('grabbed');
    }, 7000);
    
    // Show continue button after hand and Leo leave the screen
    setTimeout(() => {
        document.getElementById('continue-btn').classList.remove('hidden');
    }, 10000);
}

// Initialize quiz
window.onload = function() {
    const introMessage = document.getElementById('intro-message');
    const quizContainer = document.getElementById('quiz-main-container');
    
    // Show intro message for 5 seconds, then show quiz
    setTimeout(() => {
        introMessage.classList.add('fade-out');
        
        setTimeout(() => {
            introMessage.style.display = 'none';
            quizContainer.classList.remove('hidden');
            displayQuestion();
        }, 1000);
    }, 5000);
    
    document.getElementById('next-btn').onclick = nextQuestion;
    document.getElementById('continue-btn').onclick = () => {
        window.location.href = 'thief.html';
    };
};

// Add sparkle effect for correct answers
function createSparkles() {
    const sparkles = document.createElement('div');
    sparkles.className = 'sparkles';
    document.body.appendChild(sparkles);
    
    for(let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparkles.appendChild(sparkle);
    }
    
    setTimeout(() => sparkles.remove(), 2000);
}