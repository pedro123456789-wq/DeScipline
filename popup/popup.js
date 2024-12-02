// Initialize UI elements
let mainPage, secondPage, disciplinePage, actionButton, statusDiv, goToSecondPageButton;
let backToMainButton, backFromDisciplineButton, optionsButton, aboutButton;

function initializeElements() {
    mainPage = document.getElementById('main-page');
    secondPage = document.getElementById('second-page');
    disciplinePage = document.getElementById('discipline-page');
    actionButton = document.getElementById('actionButton');
    statusDiv = document.getElementById('status');
    goToSecondPageButton = document.getElementById('goToSecondPage');
    backToMainButton = document.getElementById('backToMain');
    backFromDisciplineButton = document.getElementById('backFromDiscipline');
    optionsButton = document.getElementById('optionsButton');
    aboutButton = document.getElementById('aboutButton');

    // Verify all required elements are present
    const elements = {
        mainPage, secondPage, disciplinePage, actionButton, statusDiv,
        goToSecondPageButton, backToMainButton, backFromDisciplineButton,
        optionsButton, aboutButton
    };

    for (const [name, element] of Object.entries(elements)) {
        if (!element) {
            console.error(`Required element not found: ${name}`);
            return false;
        }
    }
    return true;
}

function showPage(pageToShow) {
    // Hide all pages
    const pages = [mainPage, secondPage, disciplinePage];
    pages.forEach(page => {
        if (page) page.style.display = 'none';
    });
    
    // Show the requested page
    if (pageToShow) {
        pageToShow.style.display = 'flex';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (!initializeElements()) {
        console.error('Failed to initialize elements');
        return;
    }

    // Navigation
    goToSecondPageButton.addEventListener('click', () => showPage(secondPage));
    backToMainButton.addEventListener('click', () => showPage(mainPage));
    backFromDisciplineButton.addEventListener('click', () => showPage(mainPage));

    // Action button now navigates to discipline page
    actionButton.addEventListener('click', () => {
        showPage(disciplinePage);
        // Initialize session time
        document.getElementById('session-time').textContent = '00:00:00';
        document.getElementById('focus-level').textContent = 'High';
    });

    // Options and About buttons
    optionsButton.addEventListener('click', function() {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html'));
        }
    });

    aboutButton.addEventListener('click', function() {
        chrome.tabs.create({url: chrome.runtime.getURL('about/about.html')});
    });
});