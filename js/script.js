// Variables
let words = [];
let currentIndex = 0;
let wpm = 300;
let intervalId;
let isReading = false;

// DOM Elements
const textInput = document.getElementById('text-input');
const wpmInput = document.getElementById('wpm');
const fontSizeInput = document.getElementById('font-size');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const currentWordDisplay = document.getElementById('current-word');
const fullTextDisplay = document.getElementById('full-text');
const progressBar = document.getElementById('progress-bar');
const themeToggleButton = document.getElementById('theme-toggle');

// Functions
function processText() {
    words = textInput.value.match(/\S+/g) || [];
    currentIndex = 0;
    displayCurrentWord();
    displayFullText();
    highlightCurrentWord();
    updateProgressBar();
}

function startReading() {
    if (words.length === 0) {
        alert('Please enter some text to start reading.');
        return;
    }
    if (isReading) return;
    isReading = true;
    intervalId = setInterval(function() {
        if (currentIndex < words.length) {
            displayCurrentWord();
            highlightCurrentWord();
            currentIndex++;
        } else {
            pauseReading();
        }
    }, 60000 / wpm);
}

function pauseReading() {
    isReading = false;
    clearInterval(intervalId);
}

function resetReading() {
    pauseReading();
    currentIndex = 0;
    displayCurrentWord();
    highlightCurrentWord();
    updateProgressBar();
}

function displayCurrentWord() {
    if (currentIndex < words.length) {
        currentWordDisplay.textContent = words[currentIndex];
    } else {
        currentWordDisplay.textContent = '';
    }
    updateProgressBar();
}

function displayFullText() {
    fullTextDisplay.innerHTML = '';
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.addEventListener('click', function() {
            currentIndex = index;
            displayCurrentWord();
            highlightCurrentWord();
            if (isReading) {
                clearInterval(intervalId);
                startReading();
            }
        });
        fullTextDisplay.appendChild(span);
    });
}

function highlightCurrentWord() {
    const spans = fullTextDisplay.getElementsByTagName('span');
    for (let i = 0; i < spans.length; i++) {
        if (i === currentIndex) {
            spans[i].classList.add('highlight');
            spans[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            spans[i].classList.remove('highlight');
        }
    }
}

function updateProgressBar() {
    const progress = ((currentIndex / words.length) * 100).toFixed(2);
    progressBar.style.width = progress + '%';
}

// Theme Toggle Function
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeToggleButton.textContent = '☀️ Light Mode';
    } else {
        themeToggleButton.textContent = '🌙 Dark Mode';
    }
}

// Event Listeners
textInput.addEventListener('input', processText);

wpmInput.addEventListener('change', function() {
    wpm = parseInt(wpmInput.value);
    if (isReading) {
        clearInterval(intervalId);
        startReading();
    }
});

fontSizeInput.addEventListener('input', function() {
    currentWordDisplay.style.fontSize = fontSizeInput.value + 'px';
});

startButton.addEventListener('click', startReading);
pauseButton.addEventListener('click', pauseReading);
resetButton.addEventListener('click', resetReading);
themeToggleButton.addEventListener('click', toggleTheme);

// Initialize
processText();
