// Navigation Toggle
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
};

// Calculator Functionality
const initializeCalculator = () => {
    const calculatorForm = document.getElementById('subscription-calculator');
    const resultsContent = document.querySelector('.results-content');
    const resultsPlaceholder = document.querySelector('.results-placeholder');

    if (calculatorForm) {
        calculatorForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const serviceName = document.getElementById('service-name').value;
            const monthlyCost = parseFloat(document.getElementById('monthly-cost').value);
            const usageHours = parseFloat(document.getElementById('usage-hours').value);

            // Validate inputs
            if (!serviceName || isNaN(monthlyCost) || isNaN(usageHours)) {
                alert('Please fill in all fields with valid values.');
                return;
            }

            // Calculate value metrics
            const costPerHour = usageHours > 0 ? (monthlyCost / usageHours).toFixed(2) : 0;

            // Determine value rating (simplified logic)
            let valueRating = 0;
            let valueVerdict = '';
            let recommendation = '';

            if (costPerHour <= 0.5) {
                valueRating = 90;
                valueVerdict = 'Excellent Value';
                recommendation = `Based on your usage, ${serviceName} is an excellent value! Definitely worth keeping.`;
            } else if (costPerHour <= 1) {
                valueRating = 75;
                valueVerdict = 'Good Value';
                recommendation = `${serviceName} provides good value for your usage pattern. Most likely worth keeping.`;
            } else if (costPerHour <= 2) {
                valueRating = 50;
                valueVerdict = 'Average Value';
                recommendation = `${serviceName} provides average value. Consider if it's essential to you.`;
            } else if (costPerHour <= 4) {
                valueRating = 25;
                valueVerdict = 'Poor Value';
                recommendation = `${serviceName} isn't providing great value. Consider reducing usage or finding alternatives.`;
            } else {
                valueRating = 10;
                valueVerdict = 'Very Poor Value';
                recommendation = `${serviceName} provides very poor value for your usage. We recommend cancelling or finding alternatives.`;
            }

            // Update results
            document.getElementById('cost-per-hour').textContent = `$${costPerHour}`;
            document.getElementById('value-bar').style.width = `${valueRating}%`;
            document.getElementById('value-verdict').textContent = valueVerdict;
            document.getElementById('recommendation-text').textContent = recommendation;

            // Show results
            resultsPlaceholder.classList.add('hidden');
            resultsContent.classList.remove('hidden');
        });
    }
};

// Alternatives Section
const initializeAlternatives = () => {
    // Sample data - in a real app, this would come from a database or API
    const subscriptionServices = [
        {
            id: 1,
            name: 'Netflix',
            category: 'streaming',
            currentPrice: 15.99,
            alternativePrice: 9.99,
            alternativeName: 'Disney+',
            savings: '37%',
            icon: 'fas fa-tv'
        },
        {
            id: 2,
            name: 'Spotify Premium',
            category: 'music',
            currentPrice: 10.99,
            alternativePrice: 4.99,
            alternativeName: 'YouTube Music (Student Plan)',
            savings: '55%',
            icon: 'fas fa-music'
        },
        {
            id: 3,
            name: 'Adobe Creative Cloud',
            category: 'productivity',
            currentPrice: 52.99,
            alternativePrice: 16.99,
            alternativeName: 'Affinity Suite (One-time purchase)',
            savings: '68%',
            icon: 'fas fa-paint-brush'
        },
        {
            id: 4,
            name: 'Xbox Game Pass Ultimate',
            category: 'gaming',
            currentPrice: 16.99,
            alternativePrice: 10.99,
            alternativeName: 'PC Game Pass',
            savings: '35%',
            icon: 'fas fa-gamepad'
        },
        {
            id: 5,
            name: 'Hulu',
            category: 'streaming',
            currentPrice: 12.99,
            alternativePrice: 7.99,
            alternativeName: 'Peacock',
            savings: '38%',
            icon: 'fas fa-film'
        },
        {
            id: 6,
            name: 'Canva Pro',
            category: 'productivity',
            currentPrice: 12.99,
            alternativePrice: 0,
            alternativeName: 'Canva Free',
            savings: '100%',
            icon: 'fas fa-pencil-alt'
        }
    ];

    const alternativesContainer = document.getElementById('alternatives-container');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const searchInput = document.getElementById('service-search');
    const searchBtn = document.getElementById('search-btn');

    // Function to render services
    const renderServices = (services) => {
        alternativesContainer.innerHTML = '';

        if (services.length === 0) {
            alternativesContainer.innerHTML = '<p class="no-results">No services found matching your criteria.</p>';
            return;
        }

        services.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card';
            serviceCard.innerHTML = `
                <div class="service-header">
                    <div class="service-logo">
                        <i class="${service.icon}"></i>
                    </div>
                    <div class="service-info">
                    <h4 class="service-title">${service.name}</h4>
                                            <span class="service-category">${service.category}</span>
                                        </div>
                                    </div>
                                    <div class="price-comparison">
                                        <div class="current-price">
                                            <div class="price-label">Current</div>
                                            <div class="price-value">$${service.currentPrice.toFixed(2)}</div>
                                        </div>
                                        <div class="alt-price">
                                            <div class="price-label">Alternative</div>
                                            <div class="price-value">$${service.alternativePrice.toFixed(2)}</div>
                                        </div>
                                    </div>
                                    <div class="savings">Save ${service.savings} with ${service.alternativeName}</div>
                                    <button class="btn primary-btn compare-btn" data-id="${service.id}">View Details</button>
                                `;
                                alternativesContainer.appendChild(serviceCard);
                            });

                            // Add event listeners to compare buttons
                            const compareButtons = document.querySelectorAll('.compare-btn');
                            compareButtons.forEach(button => {
                                button.addEventListener('click', (e) => {
                                    const serviceId = e.target.getAttribute('data-id');
                                    window.location.href = `pages/details.html?id=${serviceId}`;
                                });
                            });
                        };

                        // Initial render
                        renderServices(subscriptionServices);

                        // Filter by category
                        categoryButtons.forEach(button => {
                            button.addEventListener('click', () => {
                                // Update active state
                                categoryButtons.forEach(btn => btn.classList.remove('active'));
                                button.classList.add('active');

                                const category = button.getAttribute('data-category');

                                if (category === 'all') {
                                    renderServices(subscriptionServices);
                                } else {
                                    const filteredServices = subscriptionServices.filter(service => service.category === category);
                                    renderServices(filteredServices);
                                }
                            });
                        });

                        // Search functionality
                        searchBtn.addEventListener('click', () => {
                            const searchTerm = searchInput.value.toLowerCase().trim();

                            if (searchTerm === '') {
                                renderServices(subscriptionServices);
                                return;
                            }

                            const filteredServices = subscriptionServices.filter(service => 
                                service.name.toLowerCase().includes(searchTerm) || 
                                service.alternativeName.toLowerCase().includes(searchTerm)
                            );

                            renderServices(filteredServices);
                        });

                        // Handle enter key in search
                        searchInput.addEventListener('keypress', (e) => {
                            if (e.key === 'Enter') {
                                searchBtn.click();
                            }
                        });
                    };

                    // Community Ratings Section
                    const initializeCommunityRatings = () => {
                        // Sample ratings data
                        const communityRatings = [
                            {
                                id: 1,
                                service: 'Netflix',
                                averageRating: 4.2,
                                ratingCount: 1256,
                                recentComment: "Still worth it for the originals, but the price increases are making me reconsider."
                            },
                            {
                                id: 2,
                                service: 'Disney+',
                                averageRating: 4.5,
                                ratingCount: 983,
                                recentComment: "Great value with the bundle. Marvel and Star Wars content alone is worth it."
                            },
                            {
                                id: 3,
                                service: 'Spotify Premium',
                                averageRating: 4.8,
                                ratingCount: 2104,
                                recentComment: "Can't imagine going back to the free version. Family plan is excellent value."
                            },
                            {
                                id: 4,
                                service: 'Amazon Prime',
                                averageRating: 3.9,
                                ratingCount: 1572,
                                recentComment: "The shipping benefits make it worthwhile, the video content is just a bonus."
                            }
                        ];

                        const trendingServicesContainer = document.getElementById('trending-services');
                        const ratingForm = document.getElementById('rating-form');
                        const starRating = document.querySelector('.star-rating');
                        const stars = document.querySelectorAll('.star-rating i');

                        // Render trending services
                        const renderTrendingServices = () => {
                            trendingServicesContainer.innerHTML = '';

                            communityRatings.forEach(rating => {
                                const ratingCard = document.createElement('div');
                                ratingCard.className = 'rating-card';

                                // Create star HTML
                                let starsHTML = '';
                                for (let i = 1; i <= 5; i++) {
                                    if (i <= Math.floor(rating.averageRating)) {
                                        starsHTML += '<i class="fas fa-star"></i>';
                                    } else if (i - 0.5 <= rating.averageRating) {
                                        starsHTML += '<i class="fas fa-star-half-alt"></i>';
                                    } else {
                                        starsHTML += '<i class="far fa-star"></i>';
                                    }
                                }

                                ratingCard.innerHTML = `
                                    <h4>${rating.service}</h4>
                                    <div class="service-rating">
                                        <div class="rating-stars">${starsHTML}</div>
                                        <div class="rating-count">${rating.averageRating} (${rating.ratingCount} ratings)</div>
                                    </div>
                                    <p class="rating-comment">"${rating.recentComment}"</p>
                                `;

                                trendingServicesContainer.appendChild(ratingCard);
                            });
                        };

                        // Initialize star rating
                        stars.forEach(star => {
                            star.addEventListener('click', () => {
                                const rating = parseInt(star.getAttribute('data-rating'));
                                document.getElementById('rating-score').value = rating;

                                // Update star display
                                stars.forEach((s, index) => {
                                    if (index < rating) {
                                        s.className = 'fas fa-star';
                                    } else {
                                        s.className = 'far fa-star';
                                    }
                                });
                            });

                            star.addEventListener('mouseover', () => {
                                const rating = parseInt(star.getAttribute('data-rating'));

                                // Highlight stars on hover
                                stars.forEach((s, index) => {
                                    if (index < rating) {
                                        s.className = 'fas fa-star';
                                    } else {
                                        s.className = 'far fa-star';
                                    }
                                });
                            });
                        });

                        // Reset stars on mouse leave
                        starRating.addEventListener('mouseleave', () => {
                            const currentRating = parseInt(document.getElementById('rating-score').value);

                            stars.forEach((s, index) => {
                                if (index < currentRating) {
                                    s.className = 'fas fa-star';
                                } else {
                                    s.className = 'far fa-star';
                                }
                            });
                        });

                        // Handle rating form submission
                        if (ratingForm) {
                            ratingForm.addEventListener('submit', (e) => {
                                e.preventDefault();

                                const service = document.getElementById('rating-service').value;
                                const rating = parseInt(document.getElementById('rating-score').value);
                                const comment = document.getElementById('rating-comment').value;

                                if (!service || rating === 0) {
                                    alert('Please enter a service name and rating.');
                                    return;
                                }

                                // In a real app, this would send data to a server
                                alert(`Thank you for rating ${service} with ${rating} stars! Your feedback has been recorded.`);

                                // Reset form
                                ratingForm.reset();
                                stars.forEach(s => s.className = 'far fa-star');
                                document.getElementById('rating-score').value = 0;

                                // For demo purposes, we'll just add it to our local data
                                const newRating = {
                                    id: communityRatings.length + 1,
                                    service: service,
                                    averageRating: rating,
                                    ratingCount: 1,
                                    recentComment: comment || "No comment provided."
                                };

                                communityRatings.push(newRating);
                                renderTrendingServices();
                            });
                        }

                        // Initial render
                        renderTrendingServices();
                    };

                    // Smooth scrolling for navigation links
                    const smoothScroll = () => {
                        const navLinks = document.querySelectorAll('a[href^="#"]');

                        navLinks.forEach(link => {
                            link.addEventListener('click', (e) => {
                                e.preventDefault();

                                const targetId = link.getAttribute('href');

                                if (targetId === '#') return;

                                const targetElement = document.querySelector(targetId);

                                if (targetElement) {
                                    window.scrollTo({
                                        top: targetElement.offsetTop - 80,
                                        behavior: 'smooth'
                                    });

                                    // Close mobile menu if open
                                    const nav = document.querySelector('.nav-links');
                                    const burger = document.querySelector('.burger');
                                    if (nav.classList.contains('nav-active')) {
                                        nav.classList.remove('nav-active');
                                        burger.classList.remove('toggle');
                                    }
                                }
                            });
                        });
                    };

                    // Initialize everything when the DOM is loaded
                    document.addEventListener('DOMContentLoaded', () => {
                        navSlide();
                        initializeCalculator();
                        initializeAlternatives();
                        initializeCommunityRatings();
                        smoothScroll();
                    });
