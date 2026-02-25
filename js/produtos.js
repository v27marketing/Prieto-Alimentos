// ============================================
// PRIETO ALIMENTOS - Produtos Page
// Category filters, search autocomplete, rendering
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initCategoryFilters();
    initProductSearch();
    renderProducts('todos');
    animateProductCards();
});

let currentCategory = 'todos';
let currentSearch = '';

// ============================================
// CATEGORY ICONS (inline SVG)
// ============================================
const CATEGORY_ICONS = {
    'todos': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
    'natalinos': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12,2 16,10 14,10 18,16 8,16 12,10 10,10"/><rect x="11" y="16" width="2" height="3"/><path d="M12,1 l.5,1.2 1.2.2-.9.8.2,1.3-1-.6-1,.6.2-1.3-.9-.8 1.2-.2z" stroke-width=".8"/></svg>`,
    'linguicas': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4,12c0-3,2-5,5-5s3,1,3,1 1-1,3-1,5,2,5,5-2,5-5,5-3-1-3-1c0,0-1,1-3,1s-5-2-5-5z"/><line x1="11" y1="8" x2="11" y2="16" stroke-width="1"/><line x1="13" y1="8" x2="13" y2="16" stroke-width="1"/></svg>`,
    'feijoada': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5,10 L5,18c0,2,3,3,7,3s7-1,7-3L19,10"/><ellipse cx="12" cy="10" rx="7.5" ry="2.5"/><path d="M7,8c0-1.5,2-3,5-3s5,1.5,5,3"/><path d="M10,5c0-1.5,1.5-2.5,1.5-3.5" stroke-width="1" opacity=".5"/><path d="M14,5c0-1.5,1.5-2.5,1.5-3.5" stroke-width="1" opacity=".5"/></svg>`,
    'embutidos': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="12" rx="2"/><line x1="10" y1="7" x2="10" y2="19" stroke-dasharray="2,2" stroke-width=".8" opacity=".4"/><line x1="15" y1="7" x2="15" y2="19" stroke-dasharray="2,2" stroke-width=".8" opacity=".4"/><circle cx="7" cy="11" r="1" stroke-width=".8" opacity=".4"/><circle cx="18" cy="15" r="1.2" stroke-width=".8" opacity=".4"/></svg>`,
    'defumados': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="4" y1="4" x2="20" y2="4" stroke-width="2"/><path d="M6,4 L6,6 L5,14c0,1,1,2,2,2 1,0,2-1,2-2L8,6L6,4z"/><path d="M11,4 L11,5 L10,15c0,1,1,2,2,2 1,0,2-1,2-2L13,5L11,4z"/><path d="M16,4 L16,6 L15,14c0,1,1,2,2,2 1,0,2-1,2-2L18,6L16,4z"/><path d="M8,18c0,1,1,2,1,3" stroke-width="1" opacity=".4"/><path d="M12,19c0,1-1,2-1,3" stroke-width="1" opacity=".4"/></svg>`,
    'cortes-suinos': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3,10c0-2,2-4,5-4H18c2,0,3,2,3,4v4c0,2-2,4-4,4H7c-2,0-4-2-4-4z"/><path d="M18,9c1,0,2-1,2-2 1,0,2,1,2,2s-1,2-2,2c0,1-1,2-2,2" stroke-width="1.2"/><path d="M3,13c4,-.5,8,.5,14,-.5" stroke-width=".8" opacity=".3"/></svg>`,
    'bacon': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3,6c2-1,4,1,6,0s4-1,6,0,4,1,6,0v3c-2,1-4-1-6,0s-4,1-6,0-4-1-6,0z"/><path d="M3,12c2-1,4,1,6,0s4-1,6,0,4,1,6,0v3c-2,1-4-1-6,0s-4,1-6,0-4-1-6,0z"/><path d="M3,18c2-1,4,1,6,0s4-1,6,0,4,1,6,0v1.5c-2,1-4-1-6,0s-4,1-6,0-4-1-6,0z"/></svg>`
};

// ============================================
// CATEGORY FILTERS
// ============================================
function initCategoryFilters() {
    const container = document.querySelector('.categories-scroll');
    if (!container) return;

    // Render category buttons
    PRODUCT_CATEGORIES.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `category-item${cat.id === 'todos' ? ' active' : ''}`;
        btn.dataset.category = cat.id;
        btn.innerHTML = `
            <div class="category-icon">${CATEGORY_ICONS[cat.id] || ''}</div>
            <span class="category-label">${cat.name}</span>
        `;
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-item').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = cat.id;
            renderProducts(currentCategory, currentSearch);
        });
        container.appendChild(btn);
    });
}

// ============================================
// PRODUCT SEARCH
// ============================================
function initProductSearch() {
    const input = document.getElementById('product-search');
    const suggestions = document.getElementById('search-suggestions');
    const clearBtn = document.querySelector('.search-clear');

    if (!input || !suggestions) return;

    const debouncedSearch = debounce((query) => {
        currentSearch = query;
        if (query.length >= 2) {
            showSuggestions(query);
        } else {
            suggestions.classList.remove('active');
        }
        renderProducts(currentCategory, currentSearch);
    }, 200);

    input.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (clearBtn) {
            clearBtn.classList.toggle('visible', query.length > 0);
        }
        debouncedSearch(query);
    });

    input.addEventListener('focus', () => {
        if (input.value.trim().length >= 2) {
            showSuggestions(input.value.trim());
        }
    });

    // Close suggestions on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-wrapper')) {
            suggestions.classList.remove('active');
        }
    });

    // Clear button
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            input.value = '';
            currentSearch = '';
            clearBtn.classList.remove('visible');
            suggestions.classList.remove('active');
            renderProducts(currentCategory, '');
            input.focus();
        });
    }

    // Keyboard navigation
    let highlightIndex = -1;
    input.addEventListener('keydown', (e) => {
        const items = suggestions.querySelectorAll('.search-suggestion-item');
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            highlightIndex = Math.min(highlightIndex + 1, items.length - 1);
            updateHighlight(items, highlightIndex);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            highlightIndex = Math.max(highlightIndex - 1, 0);
            updateHighlight(items, highlightIndex);
        } else if (e.key === 'Enter' && highlightIndex >= 0 && items[highlightIndex]) {
            e.preventDefault();
            items[highlightIndex].click();
        } else if (e.key === 'Escape') {
            suggestions.classList.remove('active');
            input.blur();
        }
    });
}

function updateHighlight(items, index) {
    items.forEach((item, i) => {
        item.classList.toggle('highlighted', i === index);
    });
}

function showSuggestions(query) {
    const suggestions = document.getElementById('search-suggestions');
    if (!suggestions) return;

    const q = query.toLowerCase();
    const results = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q)) ||
        p.category.toLowerCase().includes(q)
    ).slice(0, 6);

    if (results.length === 0) {
        suggestions.innerHTML = `<div class="search-no-results">Nenhum produto encontrado para "${query}"</div>`;
    } else {
        suggestions.innerHTML = results.map(p => `
            <a href="produto-detalhe.html?id=${p.id}" class="search-suggestion-item">
                <div class="search-suggestion-thumb">${p.emoji}</div>
                <div class="search-suggestion-info">
                    <h4>${highlightText(p.name, query)}</h4>
                    <span>${getCategoryName(p.category)}</span>
                </div>
            </a>
        `).join('');
    }

    suggestions.classList.add('active');
}

function highlightText(text, query) {
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return text.replace(regex, '<strong style="color:var(--prieto-red)">$1</strong>');
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getCategoryName(catId) {
    const cat = PRODUCT_CATEGORIES.find(c => c.id === catId);
    return cat ? cat.name : catId;
}

// ============================================
// RENDER PRODUCTS
// ============================================
function renderProducts(category = 'todos', search = '') {
    const grid = document.querySelector('.produtos-grid');
    const countEl = document.querySelector('.produtos-count');
    if (!grid) return;

    let filtered = PRODUCTS;

    if (category !== 'todos') {
        filtered = filtered.filter(p => p.category === category);
    }

    if (search && search.length >= 2) {
        const q = search.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.tags.some(t => t.includes(q)) ||
            p.shortDescription.toLowerCase().includes(q)
        );
    }

    if (countEl) {
        countEl.innerHTML = `Exibindo <strong>${filtered.length}</strong> produto${filtered.length !== 1 ? 's' : ''}`;
    }

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="produtos-empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <h3>Nenhum produto encontrado</h3>
                <p>Tente outra categoria ou termo de busca.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(p => `
        <a href="produto-detalhe.html?id=${p.id}" class="product-card">
            <div class="product-card-image">
                ${p.emoji}
            </div>
            <div class="product-card-body">
                <span class="product-card-category">${getCategoryName(p.category)}</span>
                <h3 class="product-card-title">${p.name}</h3>
                <p class="product-card-desc">${p.shortDescription}</p>
            </div>
            <div class="product-card-footer">
                <span class="product-card-weight">${p.weight}</span>
                <span class="product-card-link">Ver produto →</span>
            </div>
        </a>
    `).join('');

    animateProductCards();
}

// ============================================
// ANIMATE PRODUCT CARDS
// ============================================
function animateProductCards() {
    if (typeof gsap !== 'undefined') {
        gsap.from('.product-card', {
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            clearProps: 'all'
        });
    }
}
