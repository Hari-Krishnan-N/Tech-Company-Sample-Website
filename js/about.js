
document.addEventListener('DOMContentLoaded', function() {
    // Timeline Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
        // Animate timeline items sequentially on scroll
        function animateTimeline() {
            const windowHeight = window.innerHeight;
            const scrollTop = window.scrollY;
            const timelineTop = document.querySelector('.timeline').offsetTop;
            
            if (scrollTop > timelineTop - windowHeight + 200) {
                timelineItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animated', 'fade-in');
                    }, 300 * index);
                });
                
                // Remove scroll listener once animation is triggered
                window.removeEventListener('scroll', animateTimeline);
            }
        }
        
        // Check on initial load
        animateTimeline();
        
        // Add scroll listener
        window.addEventListener('scroll', animateTimeline);
    }
    
    // Team Cards Hover Animation
    const teamCards = document.querySelectorAll('.team-card');
    
    if (teamCards.length > 0) {
        teamCards.forEach(card => {
            const imgWrapper = card.querySelector('.team-img-wrapper');
            const teamImg = card.querySelector('.team-img');
            const overlay = card.querySelector('.team-overlay');
            
            // Mouse enter event
            card.addEventListener('mouseenter', function() {
                teamImg.style.transform = 'scale(1.1)';
                overlay.style.opacity = '1';
            });
            
            // Mouse leave event
            card.addEventListener('mouseleave', function() {
                teamImg.style.transform = 'scale(1)';
                overlay.style.opacity = '0';
            });
            
            // Touch events for mobile
            card.addEventListener('touchstart', function(e) {
                e.preventDefault();
                teamImg.style.transform = 'scale(1.1)';
                overlay.style.opacity = '1';
            });
            
            card.addEventListener('touchend', function() {
                // Add a delay before hiding the overlay for better UX on touch devices
                setTimeout(() => {
                    teamImg.style.transform = 'scale(1)';
                    overlay.style.opacity = '0';
                }, 1000);
            });
        });
    }
    
    // Core Values Animation
    const valueCards = document.querySelectorAll('.value-card');
    
    if (valueCards.length > 0) {
        // Animate value cards on scroll
        function animateValueCards() {
            const windowHeight = window.innerHeight;
            const scrollTop = window.scrollY;
            const valuesSection = document.querySelector('.value-card').closest('section');
            
            if (valuesSection && scrollTop > valuesSection.offsetTop - windowHeight + 200) {
                valueCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animated', 'fade-in-up');
                    }, 150 * index);
                });
                
                // Remove scroll listener once animation is triggered
                window.removeEventListener('scroll', animateValueCards);
            }
        }
        
        // Check on initial load
        animateValueCards();
        
        // Add scroll listener
        window.addEventListener('scroll', animateValueCards);
    }
    
    // Partners Logo Animation
    const partnerLogos = document.querySelectorAll('.partner-logo-wrapper');
    
    if (partnerLogos.length > 0) {
        partnerLogos.forEach(logo => {
            logo.addEventListener('mouseenter', function() {
                this.classList.remove('grayscale');
            });
            
            logo.addEventListener('mouseleave', function() {
                this.classList.add('grayscale');
            });
        });
        
        // Create Slider Effect (Auto-rotate logos)
        let currentIndex = 0;
        
        function rotateLogos() {
            // Reset all logos to grayscale
            partnerLogos.forEach(logo => logo.classList.add('grayscale'));
            
            // Highlight current logo
            partnerLogos[currentIndex].classList.remove('grayscale');
            
            // Increment index
            currentIndex = (currentIndex + 1) % partnerLogos.length;
            
            // Schedule next rotation
            setTimeout(rotateLogos, 2000);
        }
        
        // Start auto-rotation
        rotateLogos();
    }
    
    // Awards Section Animation
    const awardCards = document.querySelectorAll('.award-card');
    
    if (awardCards.length > 0) {
        // Animate awards on scroll
        function animateAwards() {
            const windowHeight = window.innerHeight;
            const scrollTop = window.scrollY;
            const awardsSection = document.querySelector('.award-card').closest('section');
            
            if (awardsSection && scrollTop > awardsSection.offsetTop - windowHeight + 200) {
                awardCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animated', 'bounce-in');
                    }, 200 * index);
                });
                
                // Remove scroll listener once animation is triggered
                window.removeEventListener('scroll', animateAwards);
            }
        }
        
        // Check on initial load
        animateAwards();
        
        // Add scroll listener
        window.addEventListener('scroll', animateAwards);
    }
    
    // Story Section Parallax Effect
    const storySection = document.querySelector('.experience-badge');
    
    if (storySection) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.scrollY;
            const sectionTop = storySection.closest('.position-relative').offsetTop;
            const scrollPosition = scrollTop - sectionTop;
            
            if (scrollPosition > -500 && scrollPosition < 500) {
                const rotation = 15 + (scrollPosition / 50);
                storySection.style.transform = `rotate(${rotation}deg)`;
            }
        });
    }
    
    // Mission Banner Parallax Effect
    const missionBanner = document.querySelector('.mission-banner');
    
    if (missionBanner) {
        const missionShapes = document.querySelector('.mission-shapes');
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.scrollY;
            const bannerTop = missionBanner.offsetTop;
            const scrollPosition = scrollTop - bannerTop;
            
            if (scrollPosition > -500 && scrollPosition < 500) {
                // Parallax effect for shapes
                missionShapes.style.transform = `translateY(${scrollPosition * 0.1}px)`;
            }
        });
        
        // Mouse move parallax effect
        missionBanner.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            const moveX = (x - 0.5) * 20;
            const moveY = (y - 0.5) * 20;
            
            missionShapes.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
    
    // CTA Section Animation
    const ctaSection = document.querySelector('.cta-shapes');
    
    if (ctaSection) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.scrollY;
            const sectionTop = ctaSection.closest('section').offsetTop;
            const windowHeight = window.innerHeight;
            
            if (scrollTop + windowHeight > sectionTop) {
                const scrollPosition = (scrollTop + windowHeight - sectionTop) / 5;
                ctaSection.style.transform = `translateY(${-scrollPosition}px)`;
            }
        });
    }
    
    // Add animation class to CSS definitions
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.05); }
            100% { opacity: 1; transform: scale(1); }
        }
        
        .fade-in {
            animation: fadeIn 0.5s ease forwards;
        }
        
        .bounce-in {
            animation: bounceIn 0.6s ease forwards;
        }
        
        .fade-in-up {
            animation: fadeIn 0.5s ease forwards;
        }
    `;
    
    document.head.appendChild(style);
});