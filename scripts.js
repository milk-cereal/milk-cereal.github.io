// JavaScript for handling image navigation
let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    
    // Ensure the index is within bounds
    if (index >= slides.length) {
        currentIndex = 0; // Loop to the first image
    } else if (index < 0) {
        currentIndex = slides.length - 1; // Loop to the last image
    } else {
        currentIndex = index;
    }

    // Hide all slides and show the active one
    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentIndex].classList.add('active');
}

// Move to the next or previous slide
function moveSlide(step) {
    showSlide(currentIndex + step);
}

// Initialize the first image
showSlide(currentIndex);
