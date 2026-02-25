// ============================================
// PRIETO ALIMENTOS - Produto Detalhe Page  
// Renders individual product detail from Supabase
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initProductDetail();
});

async function initProductDetail() {
    const sku = getUrlParam('sku');
    const legacyId = getUrlParam('id');

    if (!sku && !legacyId) {
        showProductNotFound();
        return;
    }

    showDetailLoading();

    // Try Supabase first (SKU-based)
    if (sku) {
        try {
            const product = await fetchProdutoBySku(sku);
            if (product) {
                renderProductDetail(product);
                await renderRelatedProducts(product);
                return;
            }
        } catch (err) {
            console.error('Erro ao carregar produto do Supabase:', err);
        }
    }

    // Fallback: try legacy static data (ID-based, for Etiqueta Negra etc.)
    if (legacyId) {
        const id = parseInt(legacyId);
        let product = null;
        let isPremium = false;
        if (typeof PRODUCTS !== 'undefined') {
            product = PRODUCTS.find(p => p.id === id);
        }
        if (!product && typeof EN_PRODUCTS !== 'undefined') {
            product = EN_PRODUCTS.find(p => p.id === id);
            if (product) isPremium = true;
        }
        if (product) {
            renderLegacyProductDetail(product, isPremium);
            return;
        }
    }

    showProductNotFound();
}

function showDetailLoading() {
    const emojiBox = document.getElementById('product-emoji');
    if (emojiBox) {
        emojiBox.innerHTML = `<div class="skeleton-pulse" style="width:100%;height:100%;border-radius:var(--radius-lg);"></div>`;
    }
    const infoEl = document.getElementById('product-info');
    if (infoEl) {
        infoEl.innerHTML = `
            <div class="skeleton-line skeleton-pulse" style="width:30%;height:16px;margin-bottom:16px;border-radius:4px;"></div>
            <div class="skeleton-line skeleton-pulse" style="width:70%;height:32px;margin-bottom:12px;border-radius:4px;"></div>
            <div class="skeleton-line skeleton-pulse" style="width:100%;height:14px;margin-bottom:8px;border-radius:4px;"></div>
            <div class="skeleton-line skeleton-pulse" style="width:90%;height:14px;margin-bottom:8px;border-radius:4px;"></div>
            <div class="skeleton-line skeleton-pulse" style="width:60%;height:14px;border-radius:4px;"></div>
        `;
    }
}

function showProductNotFound() {
    const infoEl = document.getElementById('product-info');
    if (infoEl) {
        infoEl.innerHTML = `
            <h1>Produto não encontrado</h1>
            <p>O produto solicitado não foi encontrado em nosso catálogo.</p>
            <a href="produtos.html" class="btn btn-secondary" style="margin-top:16px;">← Voltar para Produtos</a>
        `;
    }
    const emojiBox = document.getElementById('product-emoji');
    if (emojiBox) emojiBox.textContent = '🔍';

    // Hide nutrition and related sections
    const nutrSection = document.getElementById('nutrition-section');
    if (nutrSection) nutrSection.style.display = 'none';
    const relatedSection = document.getElementById('related-products');
    if (relatedSection) relatedSection.style.display = 'none';
}

function renderProductDetail(product) {
    // Page title
    document.title = `${product.name} | Prieto Alimentos`;

    // Update image
    const emojiBox = document.getElementById('product-emoji');
    if (emojiBox) {
        if (product.hasImage) {
            emojiBox.innerHTML = `<img src="${product.image}" alt="${product.name}" style="width:100%;height:100%;object-fit:contain;border-radius:var(--radius-lg);" onerror="this.parentElement.textContent='🥩'">`;
        } else {
            emojiBox.textContent = '🥩';
        }
    }

    // Breadcrumb
    const breadcrumbProduct = document.getElementById('breadcrumb-product');
    if (breadcrumbProduct) breadcrumbProduct.textContent = product.name;

    // Category name
    const catName = getCategoryName(product.category);

    // Product info
    const infoEl = document.getElementById('product-info');
    if (infoEl) {
        infoEl.innerHTML = `
            <span class="product-category-badge">${catName}</span>
            <h1>${product.name}</h1>
            ${product.sku ? `<p class="product-weight">SKU: ${product.sku}</p>` : ''}
            ${product.description ? `<p class="product-description">${product.description}</p>` : ''}
            ${product.tags && product.tags.length > 0 ? `<div class="product-tags">${product.tags.slice(0, 6).map(t => `<span>${t}</span>`).join('')}</div>` : ''}
            <a href="produtos.html" class="btn btn-secondary" style="margin-top:var(--space-lg);">← Voltar para Produtos</a>
        `;
    }

    // Hide nutrition table (Supabase data doesn't have nutrition info)
    const nutrSection = document.getElementById('nutrition-section');
    if (nutrSection) nutrSection.style.display = 'none';
}

function getCategoryName(catId) {
    if (typeof SUPABASE_CATEGORIES !== 'undefined') {
        const cat = SUPABASE_CATEGORIES.find(c => c.id === catId);
        return cat ? cat.name : catId;
    }
    return catId;
}

async function renderRelatedProducts(product) {
    const container = document.getElementById('related-grid');
    const section = document.getElementById('related-products');
    if (!container || !section) return;

    try {
        const allProducts = await fetchAllProdutos();
        const related = allProducts
            .filter(p => p.category === product.category && p.sku !== product.sku)
            .slice(0, 3);

        if (related.length === 0) {
            // Show products from any category
            const anyRelated = allProducts
                .filter(p => p.sku !== product.sku)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);

            if (anyRelated.length === 0) {
                section.style.display = 'none';
                return;
            }

            container.innerHTML = anyRelated.map(p => renderRelatedCard(p)).join('');
        } else {
            container.innerHTML = related.map(p => renderRelatedCard(p)).join('');
        }
    } catch (err) {
        console.error('Erro ao carregar produtos relacionados:', err);
        section.style.display = 'none';
    }
}

function renderRelatedCard(p) {
    const catName = getCategoryName(p.category);
    return `
        <a href="produto-detalhe.html?sku=${p.sku}" class="product-card">
            <div class="product-card-image ${!p.hasImage ? 'product-card-image--placeholder' : ''}">
                ${p.hasImage
                    ? `<img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                       <div class="product-card-placeholder" style="display:none;">
                           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="width:48px;height:48px;opacity:.3">
                               <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
                           </svg>
                       </div>`
                    : `<div class="product-card-placeholder">
                           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="width:48px;height:48px;opacity:.3">
                               <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
                           </svg>
                       </div>`}
            </div>
            <div class="product-card-body">
                <span class="product-card-category">${catName}</span>
                <h3 class="product-card-title">${p.name}</h3>
                <p class="product-card-desc">${p.shortDescription || ''}</p>
            </div>
            <div class="product-card-footer">
                ${p.sku ? `<span class="product-card-weight">SKU: ${p.sku}</span>` : '<span></span>'}
                <span class="product-card-link">Ver produto →</span>
            </div>
        </a>
    `;
}

// ============================================
// LEGACY: Render product from static data
// (for Etiqueta Negra and recipes compatibility)
// ============================================
function renderLegacyProductDetail(product, isPremium) {
    document.title = `${product.name} | Prieto Alimentos`;

    const emojiBox = document.getElementById('product-emoji');
    if (emojiBox) emojiBox.textContent = product.emoji || '🥩';

    const breadcrumbProduct = document.getElementById('breadcrumb-product');
    if (breadcrumbProduct) breadcrumbProduct.textContent = product.name;

    const legacyCatName = getLegacyCategoryName(product.category);

    const infoEl = document.getElementById('product-info');
    if (infoEl) {
        infoEl.innerHTML = `
            <span class="product-category-badge ${isPremium ? 'premium' : ''}">${legacyCatName}</span>
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
            <a href="produtos.html" class="btn btn-secondary" style="margin-top:var(--space-lg);">← Voltar para Produtos</a>
        `;
    }

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
        const nutrSection = document.getElementById('nutrition-section');
        if (nutrSection) nutrSection.style.display = 'none';
    }

    // Related products from static data
    const container = document.getElementById('related-grid');
    const section = document.getElementById('related-products');
    if (container && section && typeof PRODUCTS !== 'undefined') {
        const related = PRODUCTS
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 3);
        if (related.length === 0) {
            section.style.display = 'none';
        } else {
            container.innerHTML = related.map(p => `
                <a href="produto-detalhe.html?id=${p.id}" class="product-card">
                    <div class="product-card-image">${p.emoji}</div>
                    <div class="product-card-body">
                        <span class="product-card-category">${getLegacyCategoryName(p.category)}</span>
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
    }
}

function getLegacyCategoryName(catId) {
    if (typeof PRODUCT_CATEGORIES !== 'undefined') {
        const cat = PRODUCT_CATEGORIES.find(c => c.id === catId);
        return cat ? cat.name : catId;
    }
    return catId;
}
