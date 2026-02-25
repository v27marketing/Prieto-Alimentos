// ============================================
// PRIETO ALIMENTOS - Etiqueta Negra Page
// Premium dark theme, particles, transitions
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initENParticles();
    initENProducts();
    initENAnimations();
});

// ============================================
// GOLD PARTICLES
// ============================================
function initENParticles() {
    const container = document.querySelector('.en-particles');
    if (!container) return;

    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'en-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 4 + 's';
        particle.style.animationDuration = (3 + Math.random() * 3) + 's';
        particle.style.width = (1 + Math.random() * 3) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

// ============================================
// RENDER PREMIUM PRODUCTS
// ============================================
function initENProducts() {
    const grid = document.querySelector('.en-products-grid');
    if (!grid || typeof EN_PRODUCTS === 'undefined') return;

    grid.innerHTML = EN_PRODUCTS.map(p => `
        <a href="produto-detalhe.html?id=${p.id}" class="en-product-card">
            <div class="en-product-card-image">${p.emoji}</div>
            <div class="en-product-card-body">
                <span class="en-product-card-label">Etiqueta Negra</span>
                <h3 class="en-product-card-title">${p.name}</h3>
                <p class="en-product-card-desc">${p.description}</p>
            </div>
            <div class="en-product-card-footer">
                <span class="en-product-card-link">Conhecer →</span>
            </div>
        </a>
    `).join('');
}

// ============================================
// GSAP ANIMATIONS
// ============================================
function initENAnimations() {
    if (typeof gsap === 'undefined') return;

    // Product cards stagger
    gsap.from('.en-product-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.en-products-grid',
            start: 'top 80%'
        }
    });

    // Philosophy quote
    gsap.from('.en-philosophy blockquote', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.en-philosophy',
            start: 'top 70%'
        }
    });

    gsap.from('.en-philosophy cite', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: {
            trigger: '.en-philosophy',
            start: 'top 70%'
        }
    });
}
