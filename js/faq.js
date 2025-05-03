
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Category Filtering
    const categoryButtons = document.querySelectorAll('.faq-categories button');
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (categoryButtons.length > 0 && faqItems.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter category
                const filterCategory = this.getAttribute('data-filter');
                
                // Filter FAQ items
                filterFaqItems(filterCategory);
            });
        });
        
        // Filter function
        function filterFaqItems(category) {
            faqItems.forEach(item => {
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
    
    // FAQ Search Functionality
    const searchInput = document.getElementById('faqSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchQuery = this.value.toLowerCase().trim();
            
            // If search query is empty, reset to show all FAQ items
            if (searchQuery === '') {
                faqItems.forEach(item => {
                    item.style.display = 'block';
                    
                    // Remove any highlighted text
                    const questionText = item.querySelector('.accordion-button');
                    const answerText = item.querySelector('.accordion-body');
                    
                    if (questionText && questionText.hasAttribute('data-original')) {
                        questionText.textContent = questionText.getAttribute('data-original');
                    }
                    
                    if (answerText && answerText.hasAttribute('data-original')) {
                        answerText.innerHTML = answerText.getAttribute('data-original');
                    }
                });
                
                return;
            }
            
            // Filter FAQ items based on search query
            faqItems.forEach(item => {
                const questionText = item.querySelector('.accordion-button').textContent.toLowerCase();
                const answerText = item.querySelector('.accordion-body').textContent.toLowerCase();
                
                if (questionText.includes(searchQuery) || answerText.includes(searchQuery)) {
                    item.style.display = 'block';
                    
                    // Highlight matching text
                    highlightMatches(item, searchQuery);
                    
                    // Expand accordion item to show matches in answer
                    if (answerText.includes(searchQuery)) {
                        const collapseElement = item.querySelector('.accordion-collapse');
                        if (collapseElement && !collapseElement.classList.contains('show')) {
                            const accordionButton = item.querySelector('.accordion-button');
                            if (accordionButton && accordionButton.classList.contains('collapsed')) {
                                new bootstrap.Collapse(collapseElement, { toggle: true });
                            }
                        }
                    }
                } else {
                    item.style.display = 'none';
                }
            });
        });
        
        // Highlight matching text
        function highlightMatches(item, query) {
            const questionElement = item.querySelector('.accordion-button');
            const answerElement = item.querySelector('.accordion-body');
            
            // Store original text if not already stored
            if (!questionElement.hasAttribute('data-original')) {
                questionElement.setAttribute('data-original', questionElement.textContent);
                answerElement.setAttribute('data-original', answerElement.innerHTML);
            }
            
            // Get original text
            const originalQuestion = questionElement.getAttribute('data-original');
            const originalAnswer = answerElement.getAttribute('data-original');
            
            // Reset elements
            questionElement.textContent = originalQuestion;
            answerElement.innerHTML = originalAnswer;
            
            // Add highlight to matching text
            if (query) {
                const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
                
                const highlightedQuestion = originalQuestion.replace(regex, '<span class="highlight">$1</span>');
                questionElement.innerHTML = highlightedQuestion;
                
                const highlightedAnswer = originalAnswer.replace(regex, '<span class="highlight">$1</span>');
                answerElement.innerHTML = highlightedAnswer;
            }
        }
        
        // Helper function to escape regex special characters
        function escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
    }
    
    // Smooth Scrolling for Quick Navigation Links
    const quickLinks = document.querySelectorAll('.quick-link');
    
    if (quickLinks.length > 0) {
        quickLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Get offset for fixed navbar and sticky filter
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const faqFilterHeight = document.querySelector('.faq-filter').offsetHeight;
                    const offset = navbarHeight + faqFilterHeight + 20;
                    
                    // Calculate target position
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Expand accordion item after scrolling
                    setTimeout(() => {
                        const collapseElement = targetElement.querySelector('.accordion-collapse');
                        if (collapseElement && !collapseElement.classList.contains('show')) {
                            new bootstrap.Collapse(collapseElement, { toggle: true });
                        }
                    }, 500);
                }
            });
        });
    }
    
    // Ask Question Modal Form
    const questionForm = document.getElementById('questionForm');
    
    if (questionForm) {
        questionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const name = document.getElementById('questionName').value.trim();
            const email = document.getElementById('questionEmail').value.trim();
            const category = document.getElementById('questionCategory').value;
            const question = document.getElementById('questionText').value.trim();
            
            let isValid = true;
            
            // Simple validation
            if (!name) {
                document.getElementById('questionName').classList.add('is-invalid');
                isValid = false;
            } else {
                document.getElementById('questionName').classList.remove('is-invalid');
            }
            
            if (!email || !validateEmail(email)) {
                document.getElementById('questionEmail').classList.add('is-invalid');
                isValid = false;
            } else {
                document.getElementById('questionEmail').classList.remove('is-invalid');
            }
            
            if (!category) {
                document.getElementById('questionCategory').classList.add('is-invalid');
                isValid = false;
            } else {
                document.getElementById('questionCategory').classList.remove('is-invalid');
            }
            
            if (!question) {
                document.getElementById('questionText').classList.add('is-invalid');
                isValid = false;
            } else {
                document.getElementById('questionText').classList.remove('is-invalid');
            }
            
            // If form is valid, simulate submission
            if (isValid) {
                const submitBtn = questionForm.querySelector('button[type="submit"]');
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Submitting...';
                submitBtn.disabled = true;
                
                // Simulate server request
                setTimeout(() => {
                    // Close modal
                    const modal = bootstrap.Modal.getInstance(document.getElementById('questionModal'));
                    modal.hide();
                    
                    // Reset form
                    questionForm.reset();
                    
                    // Restore button
                    submitBtn.innerHTML = 'Submit Question';
                    submitBtn.disabled = false;
                    
                    // Show success notification
                    showNotification('Question Submitted', 'Thank you for your question! Our team will review it and respond to your email within 24 hours.');
                }, 2000);
            }
        });
        
        // Helper function to validate email
        function validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        
        // Helper function to show notification
        function showNotification(title, message) {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = 'notification bg-dark-glass';
            notification.innerHTML = `
                <div class="notification-header">
                    <h5 class="mb-0">${title}</h5>
                    <button type="button" class="btn-close btn-close-white btn-sm" aria-label="Close"></button>
                </div>
                <div class="notification-body">
                    <p class="mb-0">${message}</p>
                </div>
            `;
            
            // Add styles
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.right = '20px';
            notification.style.maxWidth = '350px';
            notification.style.padding = '15px';
            notification.style.borderRadius = '0.5rem';
            notification.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            notification.style.zIndex = '9999';
            notification.style.transform = 'translateY(100%)';
            notification.style.opacity = '0';
            notification.style.transition = 'all 0.3s ease';
            
            // Notification header styles
            const notificationHeader = notification.querySelector('.notification-header');
            notificationHeader.style.display = 'flex';
            notificationHeader.style.justifyContent = 'space-between';
            notificationHeader.style.alignItems = 'center';
            notificationHeader.style.marginBottom = '10px';
            
            // Close button functionality
            const closeBtn = notification.querySelector('.btn-close');
            closeBtn.addEventListener('click', function() {
                notification.style.transform = 'translateY(100%)';
                notification.style.opacity = '0';
                
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            });
            
            // Add to DOM
            document.body.appendChild(notification);
            
            // Trigger animation
            setTimeout(() => {
                notification.style.transform = 'translateY(0)';
                notification.style.opacity = '1';
            }, 100);
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                notification.style.transform = 'translateY(100%)';
                notification.style.opacity = '0';
                
                setTimeout(() => {
                    if (notification.parentNode) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }, 5000);
        }
    }
    
    // Add highlight styles
    const style = document.createElement('style');
    style.textContent = `
        .highlight {
            background-color: rgba(13, 110, 253, 0.2);
            color: var(--primary);
            border-radius: 2px;
            padding: 0 2px;
        }
        
        .fade-in {
            animation: fadeIn 0.5s ease forwards;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    
    document.head.appendChild(style);
    
    // Auto-expand FAQ item if URL has hash
    function checkHashAndExpand() {
        const hash = window.location.hash;
        if (hash) {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                // Expand accordion item
                const collapseElement = targetElement.querySelector('.accordion-collapse');
                if (collapseElement && !collapseElement.classList.contains('show')) {
                    new bootstrap.Collapse(collapseElement, { toggle: true });
                }
                
                // Scroll to item with offset
                setTimeout(() => {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const faqFilterHeight = document.querySelector('.faq-filter').offsetHeight;
                    const offset = navbarHeight + faqFilterHeight + 20;
                    
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        }
    }
    
    // Check on initial load
    checkHashAndExpand();
    
    // Check when hash changes
    window.addEventListener('hashchange', checkHashAndExpand);
});