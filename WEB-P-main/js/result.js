document.addEventListener('DOMContentLoaded', function() {
    // Initialize horizontal scrolling
    const scrollContainers = document.querySelectorAll('.scroll-container');
    
    scrollContainers.forEach(container => {
        const scrollLeft = container.querySelector('.scroll-btn.left');
        const scrollRight = container.querySelector('.scroll-btn.right');
        const grid = container.querySelector('.frames-grid, .faces-grid');
        
        if (scrollLeft && scrollRight && grid) {
            scrollLeft.addEventListener('click', () => {
                grid.scrollBy({ left: -300, behavior: 'smooth' });
            });
            
            scrollRight.addEventListener('click', () => {
                grid.scrollBy({ left: 300, behavior: 'smooth' });
            });
        }
    });
    
    // Set up frame click handlers
    const frameCards = document.querySelectorAll('.frame-card');
    frameCards.forEach(card => {
        card.addEventListener('click', function() {
            // In a real app, this would open a detailed view
            console.log('Frame clicked:', this);
        });
    });
    
    // Set up face click handlers
    const faceCards = document.querySelectorAll('.face-card');
    faceCards.forEach(card => {
        card.addEventListener('click', function() {
            // In a real app, this would open a detailed view
            console.log('Face clicked:', this);
        });
    });
    
    // Simulate loading animation for confidence meter
    const meterBar = document.querySelector('.meter-bar');
    if (meterBar) {
        // Reset to 0 for animation
        meterBar.style.width = '0%';
        
        setTimeout(() => {
            meterBar.style.width = meterBar.dataset.width || '85%';
        }, 500);
    }
    
    // Theme change handler
    document.addEventListener('themeChanged', function() {
        // Update any theme-specific elements here
    });
});