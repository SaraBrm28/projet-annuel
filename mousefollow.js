// Crée un petit cercle
const circle = document.createElement('div');
circle.style.width = '10px';
circle.style.height = '10px';
circle.style.borderRadius = '50%';
circle.style.backgroundColor = '#f7f8fa';
circle.style.position = 'fixed';
circle.style.zIndex = '1000';
circle.style.pointerEvents = 'none'; // Empêche d'interférer avec les clics
// circle.style.mixBlendMode = 'difference';
document.body.appendChild(circle);

// Crée un grand cercle
const bigCircle = document.createElement('div');
bigCircle.style.width = '30px';
bigCircle.style.height = '30px';
bigCircle.style.borderRadius = '50%';
bigCircle.style.backgroundColor = 'transparent';
bigCircle.style.border = '2px solid #f7f8fa';
bigCircle.style.position = 'fixed';
bigCircle.style.zIndex = '999';
bigCircle.style.pointerEvents = 'none'; // Empêche d'interférer avec les clics
bigCircle.style.transition = 'width 0.2s ease, height 0.2s ease, top 0.1s ease, left 0.1s ease';
document.body.appendChild(bigCircle);

// Variables pour suivre la position et lisser le mouvement
let mouseX = 0,
    mouseY = 0; // Position instantanée du curseur
let bigCircleX = 0,
    bigCircleY = 0; // Position actuelle du grand cercle

// Centrage des cercles autour du curseur
function updateCirclePosition(element, x, y) {
    const radius = parseInt(element.style.width, 10) / 2;
    element.style.top = `${y - radius}px`;
    element.style.left = `${x - radius}px`;
}

// Détecte le mouvement de la souris
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Met à jour immédiatement le petit cercle
    updateCirclePosition(circle, mouseX, mouseY);
});

// Animation lissée pour le grand cercle
function animateBigCircle() {
    const smoothFactor = 0.5; // Ajustez pour plus ou moins de fluidité
    bigCircleX += (mouseX - bigCircleX) * smoothFactor;
    bigCircleY += (mouseY - bigCircleY) * smoothFactor;

    updateCirclePosition(bigCircle, bigCircleX, bigCircleY);

    // Continue l'animation
    requestAnimationFrame(animateBigCircle);
}

// Gestion des interactions "hover"
function addHoverEffect() {
    const hoverElements = document.querySelectorAll('.hoverElement');

    hoverElements.forEach((element) => {
        if (!element.dataset.hoverInitialized) {
            element.dataset.hoverInitialized = 'true'; // Empêche d'ajouter plusieurs fois les listeners
            element.addEventListener('mouseenter', () => {
                bigCircle.style.width = '70px';
                bigCircle.style.height = '70px';
            });

            element.addEventListener('mouseleave', () => {
                bigCircle.style.mixBlendMode = 'white';
                bigCircle.style.width = '30px';
                bigCircle.style.height = '30px';
            });
        }
    });
}

// Observe les changements dans le DOM pour détecter les nouveaux éléments hoverables
function observeHoverElements() {
    const observer = new MutationObserver(() => {
        addHoverEffect(); // Réapplique les listeners aux nouveaux éléments
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// Initialise les événements hover
addHoverEffect();

// Démarre l'animation
animateBigCircle();

// Observe les nouveaux éléments ajoutés au DOM
observeHoverElements();
