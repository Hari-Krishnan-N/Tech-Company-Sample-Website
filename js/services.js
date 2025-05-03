
document.addEventListener('DOMContentLoaded', function() {
    // Services Tab Navigation
    const serviceTabs = document.querySelectorAll('.service-tab');
    const serviceItems = document.querySelectorAll('.service-section');
    
    if (serviceTabs.length > 0 && serviceItems.length > 0) {
        // Active tab handling
        serviceTabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get target section
                const targetId = this.getAttribute('data-target');
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Remove active class from all tabs
                    serviceTabs.forEach(tab => tab.classList.remove('active'));
                    
                    // Add active class to clicked tab
                    this.classList.add('active');
                    
                    // Scroll to target section with offset for sticky header
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const servicesNavHeight = document.querySelector('.services-nav').offsetHeight;
                    const offset = navbarHeight + servicesNavHeight + 20;
                    
                    const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Scrollspy functionality to highlight active tab
        function updateActiveTab() {
            const scrollPosition = window.scrollY;
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const servicesNavHeight = document.querySelector('.services-nav').offsetHeight;
            const offset = navbarHeight + servicesNavHeight + 50;
            
            serviceItems.forEach(section => {
                const sectionTop = section.offsetTop - offset;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    const sectionId = section.getAttribute('id');
                    
                    // Remove active class from all tabs
                    serviceTabs.forEach(tab => tab.classList.remove('active'));
                    
                    // Add active class to corresponding tab
                    const activeTab = document.querySelector(`.service-tab[data-target="${sectionId}"]`);
                    if (activeTab) {
                        activeTab.classList.add('active');
                    }
                }
            });
        }
        
        // Initial check on page load
        updateActiveTab();
        
        // Update on scroll
        window.addEventListener('scroll', updateActiveTab);
    }
    
    // Animate process timeline on scroll
    const processSteps = document.querySelectorAll('.process-step');
    
    if (processSteps.length > 0) {
        // Animate steps sequentially on first view
        function animateProcessSteps() {
            const windowHeight = window.innerHeight;
            const scrollTop = window.scrollY;
            const timelineTop = document.querySelector('.process-timeline').offsetTop;
            
            if (scrollTop > timelineTop - windowHeight + 200) {
                processSteps.forEach((step, index) => {
                    setTimeout(() => {
                        step.classList.add('animated', 'fade-in');
                    }, 300 * index);
                });
                
                // Remove scroll listener once animation is triggered
                window.removeEventListener('scroll', animateProcessSteps);
            }
        }
        
        // Check on initial load
        animateProcessSteps();
        
        // Add scroll listener
        window.addEventListener('scroll', animateProcessSteps);
    }
    
    // Service Modal Content Loading
    const serviceModals = document.querySelectorAll('[id$="Modal"]');
    
    if (serviceModals.length > 0) {
        serviceModals.forEach(modal => {
            modal.addEventListener('show.bs.modal', function(event) {
                const modalContent = this.querySelector('.modal-body');
                const button = event.relatedTarget;
                
                // Add loading state if content needs to be loaded
                if (button && button.hasAttribute('data-service-id')) {
                    const serviceId = button.getAttribute('data-service-id');
                    
                    // Show loading spinner
                    modalContent.innerHTML = `
                        <div class="text-center py-5">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <p class="mt-3">Loading service details...</p>
                        </div>
                    `;
                    
                    // Simulate loading service details
                    // In a real implementation, this would fetch data from a server
                    setTimeout(() => {
                        loadServiceDetails(serviceId, modalContent);
                    }, 1000);
                }
            });
        });
        
        // Function to load service details
        function loadServiceDetails(serviceId, container) {
            // In a real implementation, this would fetch details from a server
            // For demo purposes, we'll use hardcoded content
            
            // Example content for Software Development service
            if (serviceId === 'software') {
                container.innerHTML = `
                    <div class="row">
                        <div class="col-md-4 mb-4 mb-md-0">
                            <img src="img/software-development.jpg" alt="Software Development" class="img-fluid rounded-3 mb-3">
                            <div class="d-flex flex-wrap gap-2">
                                <span class="badge bg-dark-subtle">Web Apps</span>
                                <span class="badge bg-dark-subtle">Mobile</span>
                                <span class="badge bg-dark-subtle">Enterprise</span>
                                <span class="badge bg-dark-subtle">Cloud</span>
                                <span class="badge bg-dark-subtle">APIs</span>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <h4 class="fw-bold mb-3">Custom Software Solutions</h4>
                            <p class="mb-3 text-white-50">Our expert development team builds scalable, secure applications tailored to your specific business needs. From concept to deployment, we ensure your software solution delivers measurable value.</p>
                            
                            <h5 class="h6 fw-bold text-primary mt-4 mb-2">Development Approach</h5>
                            <p class="mb-3 text-white-50">We follow agile methodologies with iterative development cycles, ensuring frequent delivery of working software and the ability to adapt to changing requirements.</p>
                            
                            <h5 class="h6 fw-bold text-primary mt-4 mb-2">Technology Stack</h5>
                            <p class="mb-3 text-white-50">We employ modern technology stacks tailored to your project needs, including React, Angular, Node.js, Python, Java, .NET, and various database technologies.</p>
                            
                            <h5 class="h6 fw-bold text-primary mt-4 mb-2">Key Benefits</h5>
                            <ul class="text-white-50">
                                <li>Custom-tailored solutions that address your specific business challenges</li>
                                <li>Scalable architecture that grows with your business</li>
                                <li>Comprehensive testing and quality assurance</li>
                                <li>User-centered design for optimal user experience</li>
                                <li>Ongoing support and maintenance</li>
                            </ul>
                        </div>
                    </div>
                `;
            } else {
                // Generic content for other services
                container.innerHTML = `
                    <div class="row">
                        <div class="col-md-4 mb-4 mb-md-0">
                            <img src="img/${serviceId}-service.jpg" alt="${serviceId} Service" class="img-fluid rounded-3 mb-3">
                            <div class="d-flex flex-wrap gap-2">
                                <span class="badge bg-dark-subtle">Feature 1</span>
                                <span class="badge bg-dark-subtle">Feature 2</span>
                                <span class="badge bg-dark-subtle">Feature 3</span>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <h4 class="fw-bold mb-3">${serviceId.charAt(0).toUpperCase() + serviceId.slice(1)} Service</h4>
                            <p class="mb-3 text-white-50">Detailed information about our ${serviceId} service would be displayed here. This would include the key features, benefits, and implementation approach.</p>
                            
                            <h5 class="h6 fw-bold text-primary mt-4 mb-2">Our Approach</h5>
                            <p class="mb-3 text-white-50">We follow a systematic approach to deliver high-quality solutions that meet your business requirements and exceed your expectations.</p>
                            
                            <h5 class="h6 fw-bold text-primary mt-4 mb-2">Technology Stack</h5>
                            <p class="mb-3 text-white-50">We use cutting-edge technologies and best practices to ensure robust, scalable, and future-proof solutions.</p>
                            
                            <h5 class="h6 fw-bold text-primary mt-4 mb-2">Key Benefits</h5>
                            <ul class="text-white-50">
                                <li>Customized solutions tailored to your needs</li>
                                <li>Scalable architecture for future growth</li>
                                <li>Comprehensive testing and quality assurance</li>
                                <li>Expert implementation and integration</li>
                                <li>Ongoing support and maintenance</li>
                            </ul>
                        </div>
                    </div>
                `;
            }
        }
    }
    
    // Modal image gallery navigation
    const modalGalleries = document.querySelectorAll('.modal-gallery');
    
    if (modalGalleries.length > 0) {
        modalGalleries.forEach(gallery => {
            const galleryImages = gallery.querySelectorAll('.gallery-thumbnail');
            const mainImage = gallery.querySelector('.gallery-main-image');
            
            galleryImages.forEach(image => {
                image.addEventListener('click', function() {
                    // Update main image src
                    const imgSrc = this.getAttribute('src');
                    mainImage.src = imgSrc;
                    
                    // Update active state
                    galleryImages.forEach(img => img.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Animate image change
                    mainImage.style.opacity = '0';
                    setTimeout(() => {
                        mainImage.style.opacity = '1';
                    }, 200);
                });
            });
        });
    }
});