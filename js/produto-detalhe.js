// ============================================
// PRIETO ALIMENTOS - Produto Detalhe Page  
// Renders individual product detail
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    renderProductDetail();
});

function renderProductDetail() {
    const id = parseInt(getUrlParam('id'));
    if (!id) return;

    // Search in both regular and premium products
    let product = null;
    let isPremium = false;
    if (typeof PRODUCTS !== 'undefined') {
        product = PRODUCTS.find(p => p.id === id);
    }
    if (!product && typeof EN_PRODUCTS !== 'undefined') {
        product = EN_PRODUCTS.find(p => p.id === id);
        if (product) isPremium = true;
    }
    if (!product) {
        document.getElementById('product-info').innerHTML = '<h1>Produto não encontrado</h1><p>Volte para <a href="produtos.html">Produtos</a></p>';
        return;
    }

    // Page title
    document.title = `${product.name} | Prieto Alimentos`;

    // Update emoji
    const emojiBox = document.getElementById('product-emoji');
    if (emojiBox) emojiBox.textContent = product.emoji;

    // Breadcrumb
    const breadcrumbProduct = document.getElementById('breadcrumb-product');
    if (breadcrumbProduct) breadcrumbProduct.textContent = product.name;

    // Product info
    const infoEl = document.getElementById('product-info');
    if (infoEl) {
        infoEl.innerHTML = `
            <span class="product-category-badge ${isPremium ? 'premium' : ''}">${getCategoryName(product.category)}</span>
            <h1>${product.name}</h1>
            <p class="product-weight">${product.weight || ''}</p>
            <p class="product-description">${product.description}</p>
            ${product.tags ? `<div class="product-tags">${product.tags.map(t => `<span>${t}</span>`).join('')}</div>` : ''}
            ${product.preparation ? `
                <div class="product-preparation">
                    <h3>Modo de Preparo</h3>
                    <p>${product.preparation}</p>
                </div>
            ` : ''}
            <a href="produtos.html" class="btn btn-secondary">← Voltar para Produtos</a>
        `;
    }

    // Nutrition table
    const nutrTable = document.getElementById('nutrition-table');
    if (nutrTable && product.nutrition) {
        nutrTable.innerHTML = `
            <caption>Informações Nutricionais</caption>
            <thead><tr><th>Nutriente</th><th>Quantidade</th></tr></thead>
            <tbody>
                <tr><td>Calorias</td><td>${product.nutrition.calories}</td></tr>
                <tr><td>Proteínas</td><td>${product.nutrition.protein}</td></tr>
                <tr><td>Gorduras</td><td>${product.nutrition.fat}</td></tr>
                <tr><td>Carboidratos</td><td>${product.nutrition.carbs}</td></tr>
                <tr><td>Sódio</td><td>${product.nutrition.sodium}</td></tr>
            </tbody>
        `;
    } else if (nutrTable) {
        document.getElementById('nutrition-section').style.display = 'none';
    }

    // Related products
    renderRelatedProducts(product);
}

function renderRelatedProducts(product) {
    const container = document.getElementById('related-grid');
    if (!container || typeof PRODUCTS === 'undefined') return;

    const related = PRODUCTS
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

    if (related.length === 0) {
        document.getElementById('related-products').style.display = 'none';
        return;
    }

    container.innerHTML = related.map(p => `
        <a href="produto-detalhe.html?id=${p.id}" class="product-card">
            <div class="product-card-image">${p.emoji}</div>
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
}

function getCategoryName(catId) {
    if (typeof PRODUCT_CATEGORIES !== 'undefined') {
        const cat = PRODUCT_CATEGORIES.find(c => c.id === catId);
        return cat ? cat.name : catId;
    }
    return catId;
}
