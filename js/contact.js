
document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Bootstrap form validation
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!contactForm.checkValidity()) {
                e.stopPropagation();
                
                // Add shake animation to invalid fields
                const invalidFields = contactForm.querySelectorAll(':invalid');
                invalidFields.forEach(field => {
                    field.classList.add('shake');
                    setTimeout(() => {
                        field.classList.remove('shake');
                    }, 500);
                });
            } else {
                // Form is valid, simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerHTML;
                
                // Add loading state
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';
                submitBtn.disabled = true;
                
                // Simulate server request
                setTimeout(() => {
                    // Show success message
                    const formStatus = document.getElementById('formStatus');
                    const formSuccess = document.getElementById('formSuccess');
                    
                    formStatus.classList.remove('d-none');
                    formSuccess.classList.remove('d-none');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Restore button
                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                    }, 1000);
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formStatus.classList.add('d-none');
                        formSuccess.classList.add('d-none');
                    }, 5000);
                }, 2000);
            }
            
            contactForm.classList.add('was-validated');
        });
        
        // Input animations on focus
        const formInputs = contactForm.querySelectorAll('.form-control, .form-select');
        formInputs.forEach(input => {
            // Add focus effect
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            // Remove focus effect
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
    }
    
    // Quick Contact Modal Form
    const quickContactForm = document.getElementById('quickContactForm');
    
    if (quickContactForm) {
        quickContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!quickContactForm.checkValidity()) {
                e.stopPropagation();
            } else {
                // Form is valid, simulate form submission
                const submitBtn = quickContactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerHTML;
                
                // Add loading state
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';
                submitBtn.disabled = true;
                
                // Simulate server request
                setTimeout(() => {
                    // Close modal
                    const quickContactModal = document.getElementById('quickContactModal');
                    const modal = bootstrap.Modal.getInstance(quickContactModal);
                    modal.hide();
                    
                    // Reset form and button
                    quickContactForm.reset();
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Show toast notification
                    const toast = new bootstrap.Toast(document.getElementById('contactSuccessToast'));
                    toast.show();
                }, 2000);
            }
            
            quickContactForm.classList.add('was-validated');
        });
    }
    
    // Chat Widget Functionality
    const chatToggle = document.getElementById('chatToggle');
    const chatClose = document.getElementById('chatClose');
    const chatPopup = document.getElementById('chatPopup');
    const chatBody = document.getElementById('chatBody');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    
    if (chatToggle && chatPopup) {
        // Toggle chat widget
        chatToggle.addEventListener('click', function() {
            chatPopup.style.display = 'block';
            chatPopup.classList.add('fade-in');
            
            // Focus on input
            setTimeout(() => {
                chatInput.focus();
            }, 300);
        });
        
        // Close chat widget
        chatClose.addEventListener('click', function() {
            chatPopup.classList.add('fade-out');
            
            setTimeout(() => {
                chatPopup.style.display = 'none';
                chatPopup.classList.remove('fade-in', 'fade-out');
            }, 300);
        });
        
        // Send message function
        function sendMessage(message) {
            if (!message.trim()) return;
            
            // Create user message element
            const userMessage = document.createElement('div');
            userMessage.className = 'chat-message user-message';
            userMessage.innerHTML = `
                <div class="message-content bg-primary text-white p-3 rounded-3">
                    <p class="mb-0">${message}</p>
                </div>
                <span class="message-time small text-white-50">Just now</span>
            `;
            
            // Add to chat body
            chatBody.appendChild(userMessage);
            
            // Clear input
            chatInput.value = '';
            
            // Scroll to bottom
            chatBody.scrollTop = chatBody.scrollHeight;
            
            // Simulate typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'chat-message bot-message typing-indicator';
            typingIndicator.innerHTML = `
                <div class="message-content bg-dark-subtle p-3 rounded-3">
                    <p class="mb-0"><span class="typing-dots"><span>.</span><span>.</span><span>.</span></span></p>
                </div>
            `;
            
            // Add typing indicator
            setTimeout(() => {
                chatBody.appendChild(typingIndicator);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 500);
            
            // Simulate bot response after delay
            setTimeout(() => {
                // Remove typing indicator
                chatBody.removeChild(typingIndicator);
                
                // Add bot response
                const botResponse = getBotResponse(message);
                const botMessage = document.createElement('div');
                botMessage.className = 'chat-message bot-message';
                botMessage.innerHTML = `
                    <div class="message-content bg-dark-subtle p-3 rounded-3">
                        <p class="mb-0">${botResponse}</p>
                    </div>
                    <span class="message-time small text-white-50">Just now</span>
                `;
                
                // Add to chat body
                chatBody.appendChild(botMessage);
                
                // Scroll to bottom
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 2000);
        }
        
        // Send message on button click
        chatSend.addEventListener('click', function() {
            sendMessage(chatInput.value);
        });
        
        // Send message on Enter key
        chatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage(chatInput.value);
            }
        });
        
        // Simple bot responses
        function getBotResponse(message) {
            message = message.toLowerCase();
            
            if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
                return 'Hello! How can I help you today?';
            } else if (message.includes('help') || message.includes('support')) {
                return 'I\'d be happy to help! You can ask about our services, projects, or how to get started. For more specific assistance, please provide details about your inquiry.';
            } else if (message.includes('service') || message.includes('offer')) {
                return 'We offer software development, IoT systems, AI & machine learning, and embedded solutions. Would you like to know more about any specific service?';
            } else if (message.includes('contact') || message.includes('reach') || message.includes('talk')) {
                return 'You can reach our team by filling out the contact form on this page, calling us at +1 (555) 123-4567, or emailing info@krishtech.com.';
            } else if (message.includes('price') || message.includes('cost') || message.includes('quote')) {
                return 'Our pricing depends on project requirements and scope. For a detailed quote, please provide information about your project via the contact form, and our team will get back to you within 24 hours.';
            } else if (message.includes('time') || message.includes('how long') || message.includes('duration')) {
                return 'Project timelines vary based on complexity and requirements. Simple projects typically take 2-3 months, while more complex ones may take 6-12 months. We can provide a more accurate timeline after discussing your specific needs.';
            } else {
                return 'Thank you for your message. To better assist you, could you provide more details about your inquiry? Alternatively, you can fill out our contact form for a more personalized response from our team.';
            }
        }
    }
    
    // Map initialization if Google Maps API is loaded
    function initMap() {
        if (typeof google !== 'undefined' && google.maps) {
            const mapContainer = document.querySelector('.map-responsive iframe');
            
            if (mapContainer) {
                // Replace placeholder with actual Google Maps
                const mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.3325395304414!2d-122.01116148451787!3d37.33463524513264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb59127ce078f%3A0x18e1c3ce7becf1b!2sApple%20Park!5e0!3m2!1sen!2sus!4v1637309850935!5m2!1sen!2sus';
                mapContainer.src = mapUrl;
            }
        }
    }
    
    // Call map initialization function
    if (document.querySelector('.map-responsive')) {
        // In a real implementation, this would load the Google Maps API
        // with a callback to initMap
        setTimeout(initMap, 1000);
    }
});