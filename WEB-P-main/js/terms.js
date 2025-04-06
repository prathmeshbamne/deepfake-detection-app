document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const currentDate = new Date();
    document.getElementById('currentDate').textContent = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Smooth scrolling for table of contents links
    document.querySelectorAll('.terms-sidebar a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Update active link
                document.querySelectorAll('.terms-sidebar a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Scroll to section
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active link on scroll
    const sections = document.querySelectorAll('.terms-section');
    const sidebarLinks = document.querySelectorAll('.terms-sidebar a');
    
    function updateActiveLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 150)) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initialize on load

    // Terms acceptance functionality
    const acceptBtn = document.getElementById('acceptTerms');
    const declineBtn = document.getElementById('declineTerms');
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            // In a real application, you would store this acceptance
            localStorage.setItem('termsAccepted', 'true');
            
            // Redirect to registration page
            window.location.href = 'register.html';
        });
    }
    
    if (declineBtn) {
        declineBtn.addEventListener('click', function() {
            // Redirect to home page if terms are declined
            window.location.href = 'index.html';
        });
    }

    // Check if user came from registration page
    if (document.referrer.includes('register.html')) {
        const acceptanceSection = document.createElement('div');
        acceptanceSection.className = 'acceptance-notice';
        acceptanceSection.innerHTML = `
            <div class="notice-content">
                <i class="fas fa-exclamation-circle"></i>
                <p>You must accept the Terms and Conditions to register</p>
            </div>
        `;
        document.querySelector('.terms-header').after(acceptanceSection);
        
        // Add some styles dynamically
        const style = document.createElement('style');
        style.textContent = `
            .acceptance-notice {
                background-color: rgba(231, 111, 81, 0.1);
                padding: 1rem;
                margin: 1rem 0;
                border-radius: 4px;
                border-left: 4px solid #e63946;
                animation: fadeIn 0.5s ease-in-out;
            }
            
            .notice-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            
            .notice-content i {
                color: #e63946;
                font-size: 1.5rem;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
});