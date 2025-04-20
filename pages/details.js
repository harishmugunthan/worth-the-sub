
// Navigation Toggle
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        burger.classList.toggle('toggle');
    });
};

// Service data
const subscriptionServices = [
    {
        id: 5,
        name: 'Hulu',
        category: 'streaming',
        currentPrice: 12.99,
        alternativePrice: 7.99,
        alternativeName: 'Peacock',
        savings: '38%',
        icon: 'fas fa-film',
        features: ['Ad-Free Streaming', 'Original Content', 'Next-Day TV', 'Multiple Profiles'],
        altFeatures: ['Ad-Supported Tier', 'Original Content', 'Live Sports', 'NBC Content'],
        pros: ['Next-day TV shows', 'Original content', 'Multiple profiles'],
        cons: ['Limited international content', 'Ads on some plans'],
        altPros: ['Lower price', 'Sports content', 'NBC exclusives'],
        altCons: ['Smaller library', 'More ads']
    },
    {
        id: 6,
        name: 'Canva Pro',
        category: 'productivity',
        currentPrice: 12.99,
        alternativePrice: 0,
        alternativeName: 'Canva Free',
        savings: '100%',
        icon: 'fas fa-pencil-alt',
        features: ['Brand Kit', 'Background Remover', 'Premium Templates', 'Resize Tool'],
        altFeatures: ['Basic Templates', 'Limited Storage', 'Basic Design Tools', 'Free Photos'],
        pros: ['Professional features', 'Team collaboration', 'Premium assets'],
        cons: ['Monthly cost', 'Internet required', 'Limited offline use'],
        altPros: ['Free forever', 'Basic features available', 'Easy to use'],
        altCons: ['Limited templates', 'No premium features']
    },
    {
        id: 1,
        name: 'Netflix',
        category: 'streaming',
        currentPrice: 15.99,
        alternativePrice: 9.99,
        alternativeName: 'Disney+',
        savings: '37%',
        icon: 'fas fa-tv',
        features: ['4K Streaming', 'Multiple Profiles', 'Downloads', 'Original Content'],
        altFeatures: ['4K Streaming', 'Multiple Profiles', 'Downloads', 'Family Content'],
        pros: ['Huge content library', 'Regular new releases', 'No ads'],
        cons: ['Price increases', 'Content rotation', 'Regional restrictions'],
        altPros: ['Lower price', 'High quality originals', 'Family friendly'],
        altCons: ['Smaller library', 'Limited mature content']
    },
    {
        id: 2,
        name: 'Spotify Premium',
        category: 'music',
        currentPrice: 10.99,
        alternativePrice: 4.99,
        alternativeName: 'YouTube Music',
        savings: '55%',
        icon: 'fas fa-music',
        features: ['Ad-free', 'Offline Mode', 'High Quality Audio', 'Playlist Sharing'],
        altFeatures: ['Ad-free', 'Background Play', 'Music Videos', 'Lyrics'],
        pros: ['Large music library', 'Great recommendations', 'Social features'],
        cons: ['Limited podcast features', 'No music videos'],
        altPros: ['Video content included', 'Lower price', 'Better integration'],
        altCons: ['Smaller music library', 'Less social features']
    },
    {
        id: 3,
        name: 'Adobe Creative Cloud',
        category: 'productivity',
        currentPrice: 52.99,
        alternativePrice: 16.99,
        alternativeName: 'Affinity Suite',
        savings: '68%',
        icon: 'fas fa-paint-brush',
        features: ['All Creative Apps', 'Cloud Storage', 'Adobe Fonts', 'Regular Updates'],
        altFeatures: ['One-time Purchase', 'Professional Tools', 'No Subscription', 'Regular Updates'],
        pros: ['Industry standard', 'Integration', 'Regular updates'],
        cons: ['Expensive', 'Complex interface', 'Resource heavy'],
        altPros: ['One-time payment', 'Professional grade', 'Lighter'],
        altCons: ['Less integration', 'Fewer tutorials']
    },
    {
        id: 4,
        name: 'Xbox Game Pass Ultimate',
        category: 'gaming',
        currentPrice: 16.99,
        alternativePrice: 10.99,
        alternativeName: 'PC Game Pass',
        savings: '35%',
        icon: 'fas fa-gamepad',
        features: ['Console & PC Games', 'Xbox Live Gold', 'EA Play', 'Cloud Gaming'],
        altFeatures: ['PC Games Only', 'EA Play', 'Xbox Studios Games', 'Day One Releases'],
        pros: ['Large game library', 'Cross-platform', 'Cloud gaming'],
        cons: ['Requires good internet', 'Games rotate out'],
        altPros: ['Lower price', 'Same PC benefits', 'Regular updates'],
        altCons: ['No console access', 'No cloud gaming']
    }
];

// Initialize the details page
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    
    // Get the service ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = parseInt(urlParams.get('id'));
    const serviceContainer = document.getElementById('service-comparison');
    
    if (serviceContainer && serviceId) {
        const service = subscriptionServices.find(s => s.id === serviceId);
        
        if (service) {
            const featuresListMain = service.features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('');
            const featuresListAlt = service.altFeatures.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('');
            const prosListMain = service.pros.map(p => `<li><i class="fas fa-plus"></i> ${p}</li>`).join('');
            const consListMain = service.cons.map(c => `<li><i class="fas fa-minus"></i> ${c}</li>`).join('');
            const prosListAlt = service.altPros.map(p => `<li><i class="fas fa-plus"></i> ${p}</li>`).join('');
            const consListAlt = service.altCons.map(c => `<li><i class="fas fa-minus"></i> ${c}</li>`).join('');

            serviceContainer.innerHTML = `
                <div class="comparison-header">
                    <div class="service-logo large">
                        <i class="${service.icon}"></i>
                    </div>
                    <h2>${service.name} vs ${service.alternativeName}</h2>
                    <p class="comparison-subtitle">Detailed Comparison</p>
                </div>
                <div class="comparison-content">
                    <div class="comparison-grid">
                        <div class="comparison-column">
                            <h3>${service.name}</h3>
                            <div class="price-box">
                                <span class="price-label">Monthly Price</span>
                                <span class="price-amount">$${service.currentPrice.toFixed(2)}</span>
                            </div>
                            <div class="feature-list">
                                <h4>Features</h4>
                                <ul>${featuresListMain}</ul>
                            </div>
                            <div class="pros-cons">
                                <h4>Pros</h4>
                                <ul class="pros">${prosListMain}</ul>
                                <h4>Cons</h4>
                                <ul class="cons">${consListMain}</ul>
                            </div>
                        </div>
                        <div class="comparison-column alternative">
                            <h3>${service.alternativeName}</h3>
                            <div class="price-box highlight">
                                <span class="price-label">Monthly Price</span>
                                <span class="price-amount">$${service.alternativePrice.toFixed(2)}</span>
                                <span class="savings-badge">Save ${service.savings}</span>
                            </div>
                            <div class="feature-list">
                                <h4>Features</h4>
                                <ul>${featuresListAlt}</ul>
                            </div>
                            <div class="pros-cons">
                                <h4>Pros</h4>
                                <ul class="pros">${prosListAlt}</ul>
                                <h4>Cons</h4>
                                <ul class="cons">${consListAlt}</ul>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            serviceContainer.innerHTML = '<p class="error">Service not found.</p>';
        }
    }
});
