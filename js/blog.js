
document.addEventListener('DOMContentLoaded', function() {
    // Blog Category Filtering
    const categoryButtons = document.querySelectorAll('.blog-categories button');
    const blogItems = document.querySelectorAll('.blog-item');
    
    if (categoryButtons.length > 0 && blogItems.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter category
                const filterCategory = this.getAttribute('data-filter');
                
                // Filter blog items
                filterBlogItems(filterCategory);
            });
        });
        
        // Filter function
        function filterBlogItems(category) {
            blogItems.forEach(item => {
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
    
    // Blog Search Functionality
    const searchInput = document.getElementById('faqSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchQuery = this.value.toLowerCase().trim();
            
            // If search query is empty, reset to show all posts
            if (searchQuery === '') {
                blogItems.forEach(item => {
                    item.style.display = 'block';
                });
                return;
            }
            
            // Filter blog items based on search query
            blogItems.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const content = item.querySelector('p').textContent.toLowerCase();
                const category = item.getAttribute('data-category').toLowerCase();
                
                if (title.includes(searchQuery) || content.includes(searchQuery) || category.includes(searchQuery)) {
                    item.style.display = 'block';
                    
                    // Highlight matching text
                    highlightMatches(item, searchQuery);
                } else {
                    item.style.display = 'none';
                }
            });
        });
        
        // Highlight matching text
        function highlightMatches(item, query) {
            const titleElement = item.querySelector('h3');
            const contentElement = item.querySelector('p');
            
            // Store original text if not already stored
            if (!titleElement.hasAttribute('data-original')) {
                titleElement.setAttribute('data-original', titleElement.innerHTML);
                contentElement.setAttribute('data-original', contentElement.innerHTML);
            }
            
            // Reset to original text
            const originalTitle = titleElement.getAttribute('data-original');
            const originalContent = contentElement.getAttribute('data-original');
            
            titleElement.innerHTML = originalTitle;
            contentElement.innerHTML = originalContent;
            
            // Add highlight to matching text
            if (query) {
                const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
                
                titleElement.innerHTML = originalTitle.replace(regex, '<span class="highlight">$1</span>');
                contentElement.innerHTML = originalContent.replace(regex, '<span class="highlight">$1</span>');
            }
        }
        
        // Helper function to escape regex special characters
        function escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
    }
    
    // Load More Blog Posts Functionality
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (loadMoreBtn) {
        let currentPage = 1;
        
        loadMoreBtn.addEventListener('click', function() {
            // Add loading state
            loadMoreBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Loading...';
            loadMoreBtn.disabled = true;
            
            // Simulate loading more posts
            setTimeout(() => {
                loadMorePosts(++currentPage);
                
                // Restore button state
                loadMoreBtn.innerHTML = 'Load More Articles';
                loadMoreBtn.disabled = false;
                
                // Hide button after loading all pages (for demo purposes, hide after 2 pages)
                if (currentPage >= 2) {
                    loadMoreBtn.style.display = 'none';
                }
            }, 1500);
        });
        
        // Function to load more posts
        function loadMorePosts(page) {
            // In a real implementation, this would fetch posts from a server
            // For demo purposes, we'll create some dummy content
            
            const blogGrid = document.querySelector('.row.g-4');
            
            // Create 3 more blog items
            for (let i = 1; i <= 3; i++) {
                const postIndex = (page - 1) * 3 + i;
                const category = ['software', 'iot', 'ai-ml'][Math.floor(Math.random() * 3)]; // Random category
                
                const blogItem = document.createElement('div');
                blogItem.className = 'col-md-6 col-lg-4 blog-item fade-in';
                blogItem.setAttribute('data-category', category);
                
                blogItem.innerHTML = `
                    <div class="blog-card h-100 bg-dark-glass rounded-4 overflow-hidden">
                        <div class="blog-img-wrapper">
                            <img src="img/blog-post-${9 + postIndex}.jpg" alt="Blog Post" class="img-fluid blog-img">
                            <div class="blog-category-badge">
                                <span class="badge bg-${category === 'software' ? 'primary' : category === 'iot' ? 'success' : 'info'}">${category === 'ai-ml' ? 'AI/ML' : category.charAt(0).toUpperCase() + category.slice(1)}</span>
                            </div>
                        </div>
                        <div class="blog-content p-4">
                            <div class="post-meta mb-2">
                                <span class="text-white-50 small me-3"><i class="far fa-calendar-alt me-1"></i> March ${postIndex}, 2025</span>
                                <span class="text-white-50 small"><i class="far fa-user me-1"></i> John Doe</span>
                            </div>
                            <h3 class="h5 fw-bold mb-3">New Blog Post Title ${9 + postIndex}</h3>
                            <p class="text-white-50 mb-3">This is a brief description of the blog post content. It provides an overview of what readers can expect to learn from this article.</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <a href="blog-post.html" class="btn-link">Read More</a>
                                <span class="text-white-50 small"><i class="far fa-clock me-1"></i> ${Math.floor(Math.random() * 10) + 5} min read</span>
                            </div>
                        </div>
                    </div>
                `;
                
                // Add to grid
                blogGrid.appendChild(blogItem);
                
                // Add reveal animation
                setTimeout(() => {
                    blogItem.classList.remove('fade-in');
                }, 500 * i);
            }
        }
    }
    
    // Newsletter Form Validation
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('newsletterEmail');
            const privacyCheck = document.getElementById('privacyCheck');
            
            let isValid = true;
            
            // Email validation
            if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            } else {
                emailInput.classList.remove('is-invalid');
            }
            
            // Privacy checkbox validation
            if (!privacyCheck.checked) {
                privacyCheck.classList.add('is-invalid');
                isValid = false;
            } else {
                privacyCheck.classList.remove('is-invalid');
            }
            
            // If form is valid, simulate subscription
            if (isValid) {
                // Add loading state to button
                const submitBtn = newsletterForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.textContent;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Subscribing...';
                submitBtn.disabled = true;
                
                // Simulate server request
                setTimeout(() => {
                    // Show success message
                    newsletterForm.innerHTML = `
                        <div class="alert alert-success">
                            <i class="fas fa-check-circle me-2"></i> Thank you for subscribing! We've sent a confirmation email to ${emailInput.value}.
                        </div>
                    `;
                }, 2000);
            }
        });
        
        // Helper function to validate email
        function validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    }
    
    // Topic Suggestion Modal Form
    const topicSuggestionForm = document.getElementById('topicSuggestionForm');
    
    if (topicSuggestionForm) {
        topicSuggestionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = topicSuggestionForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Submitting...';
            submitBtn.disabled = true;
            
            // Simulate server request
            setTimeout(() => {
                // Close modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('topicSuggestionModal'));
                modal.hide();
                
                // Show toast notification
                const toast = new bootstrap.Toast(document.createElement('div'));
                toast.show();
                
                // Reset form and button
                topicSuggestionForm.reset();
                submitBtn.innerHTML = 'Submit Suggestion';
                submitBtn.disabled = false;
                
                // Create and show toast notification
                const toastContainer = document.createElement('div');
                toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
                toastContainer.style.zIndex = '1050';
                
                toastContainer.innerHTML = `
                    <div class="toast show bg-dark-glass" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="toast-header bg-dark text-white">
                            <strong class="me-auto">Topic Suggestion</strong>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div class="toast-body">
                            Thank you for your suggestion! Our team will review it and consider it for future content.
                        </div>
                    </div>
                `;
                
                document.body.appendChild(toastContainer);
                
                // Remove toast after 5 seconds
                setTimeout(() => {
                    document.body.removeChild(toastContainer);
                }, 5000);
            }, 2000);
        });
    }
});