// ============================================
// PRIETO ALIMENTOS - Receitas Page
// Recipe grid rendering & detail page
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.receitas-grid');
    const detailHero = document.getElementById('receita-detail-hero');

    if (grid && !detailHero) {
        renderRecipes();
    }

    if (detailHero) {
        renderRecipeDetail();
    }
});

// ============================================
// RENDER RECIPES GRID
// ============================================
function renderRecipes() {
    const grid = document.querySelector('.receitas-grid');
    if (!grid || typeof RECIPES === 'undefined') return;

    grid.innerHTML = RECIPES.map(r => `
        <a href="receita-detalhe.html?id=${r.id}" class="recipe-card">
            <div class="recipe-card-image">
                ${r.emoji}
                <div class="recipe-card-overlay">
                    <span class="recipe-tag recipe-tag-time">⏱ ${r.time}</span>
                    <span class="recipe-tag recipe-tag-difficulty">${r.difficulty}</span>
                </div>
            </div>
            <div class="recipe-card-body">
                <h3 class="recipe-card-title">${r.title}</h3>
                <p class="recipe-card-desc">${r.shortDescription}</p>
                <div class="recipe-card-meta">
                    <span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        ${r.time}
                    </span>
                    <span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        ${r.servings} porções
                    </span>
                </div>
            </div>
        </a>
    `).join('');

    // Animate cards
    if (typeof gsap !== 'undefined') {
        gsap.from('.recipe-card', {
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out'
        });
    }
}

// ============================================
// RENDER RECIPE DETAIL
// ============================================
function renderRecipeDetail() {
    const id = parseInt(getUrlParam('id'));
    if (!id || typeof RECIPES === 'undefined') return;

    const recipe = RECIPES.find(r => r.id === id);
    if (!recipe) {
        document.getElementById('receita-detail-header').innerHTML = '<h1>Receita não encontrada</h1>';
        return;
    }

    // Update page title
    document.title = `${recipe.title} | Receitas Prieto`;

    // Breadcrumb
    const breadcrumbEl = document.getElementById('breadcrumb-recipe');
    if (breadcrumbEl) breadcrumbEl.textContent = recipe.title;

    // Hero header
    const header = document.getElementById('receita-detail-header');
    if (header) {
        header.innerHTML = `
            <div style="font-size:4rem; margin-bottom:var(--space-md);">${recipe.emoji}</div>
            <h1>${recipe.title}</h1>
            <div class="recipe-detail-meta" style="margin-top:var(--space-md);">
                <div class="recipe-detail-meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span>${recipe.time}</span>
                </div>
                <div class="recipe-detail-meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <span>${recipe.difficulty}</span>
                </div>
                <div class="recipe-detail-meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                    <span>${recipe.servings} porções</span>
                </div>
            </div>
        `;
    }

    // Ingredients
    const ingredientsEl = document.getElementById('receita-ingredients');
    if (ingredientsEl) {
        ingredientsEl.innerHTML = `
            <h3>Ingredientes</h3>
            <ul>
                ${recipe.ingredients.map(ing => `
                    <li onclick="this.classList.toggle('checked')">
                        <span class="check">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                        ${ing}
                    </li>
                `).join('')}
            </ul>
        `;
    }

    // Steps
    const stepsEl = document.getElementById('receita-steps');
    if (stepsEl) {
        stepsEl.innerHTML = `
            <h3>Modo de Preparo</h3>
            ${recipe.steps.map((step, i) => `
                <div class="recipe-step">
                    <div class="recipe-step-number">${i + 1}</div>
                    <p class="recipe-step-text">${step}</p>
                </div>
            `).join('')}
        `;
    }

    // Product suggestion
    const suggestionEl = document.getElementById('receita-suggestion');
    if (recipe.suggestedProduct && typeof PRODUCTS !== 'undefined' && suggestionEl) {
        const product = PRODUCTS.find(p => p.id === recipe.suggestedProduct);
        if (product) {
            suggestionEl.innerHTML = `
                <div class="container">
                    <div class="receita-product-suggestion" style="display:flex; align-items:center; gap:var(--space-xl); padding:var(--space-xl); background:var(--prieto-gray-50); border-radius:var(--radius-lg); flex-wrap:wrap;">
                        <div style="font-size:4rem; flex-shrink:0;">${product.emoji}</div>
                        <div style="flex:1; min-width:200px;">
                            <span style="font-size:var(--fs-xs); color:var(--prieto-red); font-weight:600; text-transform:uppercase; letter-spacing:0.05em;">Produto sugerido para esta receita</span>
                            <h3 style="margin:var(--space-xs) 0;">${product.name}</h3>
                            <p style="color:var(--prieto-gray-400); font-size:var(--fs-sm);">${product.shortDescription || product.description}</p>
                            <a href="produto-detalhe.html?id=${product.id}" class="btn btn-primary btn-sm" style="margin-top:var(--space-sm);">Ver Produto</a>
                        </div>
                    </div>
                </div>
            `;
        } else {
            suggestionEl.style.display = 'none';
        }
    } else if (suggestionEl) {
        suggestionEl.style.display = 'none';
    }
}
