
document.addEventListener('DOMContentLoaded', function() {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.padding = '0.75rem 0';
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Initialize tooltips if Bootstrap's tooltip component is used
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Animated text change in hero section if it exists
    const textChange = document.querySelector('.text-change');
    if (textChange) {
        const words = textChange.getAttribute('data-words').split(',');
        let wordIndex = 0;
        
        function changeWord() {
            textChange.style.opacity = '0';
            
            setTimeout(() => {
                textChange.textContent = words[wordIndex];
                textChange.style.opacity = '1';
                
                wordIndex = (wordIndex + 1) % words.length;
            }, 200);
        }
        
        // Initial setting
        textChange.textContent = words[0];
        
        // Change words every 4 seconds
        setInterval(changeWord, 4000);
    }
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]:not([data-bs-toggle])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (targetId === '#' || !targetId) return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation on scroll effects
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        animatedElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.getBoundingClientRect().top + windowTopPosition;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            // Check if element is in viewport
            if ((elementBottomPosition >= windowTopPosition) && (elementTopPosition <= windowBottomPosition)) {
                element.classList.add('animated');
            }
        });
    }
    
    // Init animation check on load
    checkInView();
    
    // Check animation on scroll
    window.addEventListener('scroll', checkInView);
    
    // Add modal backdrop blur effect
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('show.bs.modal', function() {
            document.body.classList.add('modal-open-blur');
        });
        
        modal.addEventListener('hidden.bs.modal', function() {
            document.body.classList.remove('modal-open-blur');
        });
    });
});