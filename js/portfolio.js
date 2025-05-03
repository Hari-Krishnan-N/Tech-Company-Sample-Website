document.addEventListener('DOMContentLoaded', function() {
    // Portfolio Category Filtering
    const filterButtons = document.querySelectorAll('.portfolio-categories button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter category
                const filterCategory = this.getAttribute('data-filter');
                
                // Filter portfolio items
                filterPortfolioItems(filterCategory);
            });
        });
        
        // Filter function
        function filterPortfolioItems(category) {
            portfolioItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    // Add fade-in animation
                    item.classList.add('fade-in');
                    setTimeout(() => {
                        item.classList.remove('fade-in');
                    }, 500);
                } else {
                    item.style.display = 'none';
                }
            });
        }
    }
    
    // Grid/List View Toggle
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    const portfolioGrid = document.getElementById('portfolioGrid');
    
    if (gridViewBtn && listViewBtn && portfolioGrid) {
        // Grid view (default)
        gridViewBtn.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                // Update active state
                gridViewBtn.classList.add('active');
                listViewBtn.classList.remove('active');
                
                // Change to grid view
                portfolioGrid.classList.remove('list-view');
                portfolioGrid.classList.add('grid-view');
                
                // Update layout classes for items
                portfolioItems.forEach(item => {
                    item.classList.remove('col-12');
                    item.classList.add('col-md-6', 'col-lg-4');
                    
                    // Add animation
                    item.classList.add('fade-in');
                    setTimeout(() => {
                        item.classList.remove('fade-in');
                    }, 500);
                });
                
                // Store preference in local storage
                localStorage.setItem('portfolioView', 'grid');
            }
        });
        
        // List view
        listViewBtn.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                // Update active state
                listViewBtn.classList.add('active');
                gridViewBtn.classList.remove('active');
                
                // Change to list view
                portfolioGrid.classList.remove('grid-view');
                portfolioGrid.classList.add('list-view');
                
                // Update layout classes for items
                portfolioItems.forEach(item => {
                    item.classList.remove('col-md-6', 'col-lg-4');
                    item.classList.add('col-12');
                    
                    // Add animation
                    item.classList.add('fade-in');
                    setTimeout(() => {
                        item.classList.remove('fade-in');
                    }, 500);
                });
                
                // Store preference in local storage
                localStorage.setItem('portfolioView', 'list');
            }
        });
        
        // Check if user has a saved preference
        const savedView = localStorage.getItem('portfolioView');
        if (savedView === 'list') {
            // Trigger list view
            listViewBtn.click();
        }
    }
    
    // Project Modal Image Gallery
    const projectModals = document.querySelectorAll('[id^="project"][id$="Modal"]');
    
    if (projectModals.length > 0) {
        projectModals.forEach(modal => {
            // Initialize image gallery if exists
            const mainImage = modal.querySelector('.img-fluid.rounded-3.mb-3');
            const thumbnails = modal.querySelectorAll('.row.g-2 img');
            
            if (mainImage && thumbnails.length > 0) {
                thumbnails.forEach(thumb => {
                    thumb.addEventListener('click', function() {
                        // Get thumbnail image src
                        const imgSrc = this.getAttribute('src');
                        
                        // Apply subtle animation
                        mainImage.style.opacity = '0.7';
                        
                        // Update main image after short delay
                        setTimeout(() => {
                            mainImage.setAttribute('src', imgSrc);
                            mainImage.style.opacity = '1';
                        }, 200);
                        
                        // Update active state
                        thumbnails.forEach(t => t.classList.remove('active-thumb'));
                        this.classList.add('active-thumb');
                    });
                });
            }
        });
    }
    
    // Approach Timeline Animation
    const approachSteps = document.querySelectorAll('.approach-step');
    
    if (approachSteps.length > 0) {
        // Animate steps sequentially on scroll
        function animateApproachSteps() {
            const windowHeight = window.innerHeight;
            const scrollTop = window.scrollY;
            const timelineTop = document.querySelector('.approach-timeline').offsetTop;
            
            if (scrollTop > timelineTop - windowHeight + 200) {
                approachSteps.forEach((step, index) => {
                    setTimeout(() => {
                        step.classList.add('animated', 'fade-in-up');
                    }, 200 * index);
                });
                
                // Remove scroll listener once animation is triggered
                window.removeEventListener('scroll', animateApproachSteps);
            }
        }
        
        // Check on initial load
        animateApproachSteps();
        
        // Add scroll listener
        window.addEventListener('scroll', animateApproachSteps);
    }
    
    // Industry Cards Animation
    const industryCards = document.querySelectorAll('.industry-card');
    
    if (industryCards.length > 0) {
        // Animate cards on scroll
        function animateIndustryCards() {
            const windowHeight = window.innerHeight;
            const scrollTop = window.scrollY;
            const sectionTop = document.querySelector('.industry-card').closest('section').offsetTop;
            
            if (scrollTop > sectionTop - windowHeight + 200) {
                industryCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animated', 'fade-in-up');
                    }, 150 * index);
                });
                
                // Remove scroll listener once animation is triggered
                window.removeEventListener('scroll', animateIndustryCards);
            }
        }
        
        // Check on initial load
        animateIndustryCards();
        
        // Add scroll listener
        window.addEventListener('scroll', animateIndustryCards);
    }
    
    // Success Stories Counter Animation
    const resultItems = document.querySelectorAll('.result-item strong');
    
    if (resultItems.length > 0) {
        // Animate counters
        function animateCounters() {
            const windowHeight = window.innerHeight;
            const scrollTop = window.scrollY;
            const storiesSection = document.querySelector('.success-story-card').closest('section');
            
            if (storiesSection && scrollTop > storiesSection.offsetTop - windowHeight + 200) {
                resultItems.forEach(item => {
                    // Get target value
                    let target = parseInt(item.textContent);
                    
                    // If not a number or already animated, skip
                    if (isNaN(target) || item.classList.contains('counted')) return;
                    
                    // Mark as animated
                    item.classList.add('counted');
                    
                    // Check if percentage
                    const isPercentage = item.textContent.includes('%');
                    
                    // Remove % if exists
                    if (isPercentage) {
                        target = parseInt(item.textContent.replace('%', ''));
                    }
                    
                    // Set duration based on target value (higher values = longer duration)
                    const duration = Math.min(2000, Math.max(1000, target * 20));
                    
                    // Counter animation
                    let startTime = null;
                    
                    function countUp(timestamp) {
                        if (!startTime) startTime = timestamp;
                        
                        const progress = Math.min((timestamp - startTime) / duration, 1);
                        const currentCount = Math.floor(progress * target);
                        
                        item.textContent = isPercentage ? currentCount + '%' : currentCount;
                        
                        if (progress < 1) {
                            requestAnimationFrame(countUp);
                        }
                    }
                    
                    requestAnimationFrame(countUp);
                });
                
                // Remove scroll listener once animation is triggered
                window.removeEventListener('scroll', animateCounters);
            }
        }
        
        // Check on initial load
        animateCounters();
        
        // Add scroll listener
        window.addEventListener('scroll', animateCounters);
    }
    
    // Project Details Request
    const projectDetailsLinks = document.querySelectorAll('[data-bs-target^="#project"][data-bs-target$="Modal"]');
    
    if (projectDetailsLinks.length > 0) {
        projectDetailsLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Get target modal ID
                const modalId = this.getAttribute('data-bs-target').substring(1);
                const projectId = modalId.replace('Modal', '');
                
                // Log project interest for analytics (in a real app)
                console.log('Project interest:', projectId);
                
                // You could also send this data to a server for tracking
                // fetch('/api/track-interest', {
                //     method: 'POST',
                //     body: JSON.stringify({ projectId }),
                //     headers: { 'Content-Type': 'application/json' }
                // });
            });
        });
    }
});